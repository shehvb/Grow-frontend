# Tasks: Session Management

**Input**: Design documents from `/specs/015-session-management/`  
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅  
**Tests**: Not requested — manual/acceptance-based only (Constitution Principle I)  
**Organization**: Tasks grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on each other)
- **[Story]**: Which user story this task belongs to (US1–US6)
- Exact file paths are included in all task descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the new utility files that all subsequent phases depend on.

- [x] T001 Create `src/utils/authUtils.ts` as an empty module with placeholder exports
- [x] T002 Create `src/utils/tokenUtils.ts` as an empty module with placeholder exports
- [x] T003 [P] Extend `AuthTokens` interface in `src/types/auth.ts` to add optional `role` and `loginFlow` fields

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Implement the shared utility functions that every phase consumes. Must be complete before any user story phase begins.

**⚠️ CRITICAL**: Phase 3–8 all depend on these utilities being complete.

- [x] T004 Implement `getLoginRouteForRole(role)` in `src/utils/authUtils.ts` — maps `teacher → /login/teacher`, `student → /login/student`, `parent → /login/parent`, default → `/login/student`
- [x] T005 [P] Implement `getRefreshConfig(session)` in `src/utils/authUtils.ts` — returns `{ endpoint, body }` using the role/loginFlow matrix: teacher → `teacher/auth/refresh/` + `{ refresh }`, student+otp → `auth/student/token/refresh/` + `{ refresh_token }`, student+standard → `auth/token/refresh/` + `{ refresh }`, parent → `auth/token/refresh/` + `{ refresh }`
- [x] T006 [P] Implement `getTokenExpiryMs(token)` in `src/utils/tokenUtils.ts` — decodes the JWT payload via `atob(token.split('.')[1])`, returns `payload.exp * 1000` or `null` if malformed
- [x] T007 [P] Implement `isTokenExpired(token)` in `src/utils/tokenUtils.ts` — returns `true` if `getTokenExpiryMs(token)` is less than `Date.now()`
- [x] T008 Implement `scheduleProactiveRefresh(tokens, onRefresh)` in `src/utils/tokenUtils.ts` — computes `delay = expiryMs - Date.now() - 5 * 60 * 1000`, only schedules when `delay > 0` and `document.visibilityState === 'visible'`, returns the `setTimeout` handle

**Checkpoint**: `authUtils.ts` and `tokenUtils.ts` are fully implemented. Types in `auth.ts` are extended. All phases can now proceed.

---

## Phase 3: User Story 1 — Role-Specific Token Refresh (Priority: P1) 🎯 MVP

**Goal**: Every API 401 error triggers a refresh call to the correct endpoint for the user's role. Teachers call `teacher/auth/refresh/`, students call the appropriate student endpoint, parents call the standard endpoint.

**Independent Test**: Log in as a teacher, wait for or force a 401 response on any API call, confirm in the Network DevTools that the refresh call goes to `/api/v1/teacher/auth/refresh/` (not the generic endpoint), and that the original request retries successfully.

### Implementation for User Story 1

- [x] T009 [US1] Add module-level refresh lock variables to `src/services/apiClient.ts`: `let isRefreshing = false; let refreshQueue: Array<(token: string) => void> = [];` and implement `processQueue(token: string)` helper that resolves all queued callbacks and resets the array
- [x] T010 [US1] Update `authStore.login()` in `src/store/authStore.ts` to persist `role` and `loginFlow` in the stored `auth_tokens` object — the `loginFlow` is `'otp'` for the student OTP endpoint, `'standard'` for all other logins
- [x] T011 [US1] Replace the 401 handler in `src/services/apiClient.ts` response interceptor: if `isRefreshing` is true, push a new promise to `refreshQueue` and return it; if false, set `isRefreshing = true`, read `auth_tokens` from localStorage, call `getRefreshConfig(session)` from `authUtils.ts`, make the refresh POST, call `processQueue(newToken)`, set `isRefreshing = false`, then return the retried original request
- [x] T012 [US1] Add refresh failure handling in `src/services/apiClient.ts`: on catch during refresh, call `processQueue` with a rejection, remove `auth_tokens` from localStorage, dispatch `auth_refresh_failed` event, and `window.location.replace(getLoginRouteForRole(session?.role))`

**Checkpoint**: All three roles (teacher, student, parent) correctly refresh tokens on 401. Multiple simultaneous 401s produce only one refresh request.

---

## Phase 4: User Story 2 — Concurrent Refresh Race Condition Prevention (Priority: P1)

**Goal**: When 5 API calls all fail simultaneously with 401, exactly one refresh request is sent; the other 4 are queued and retried automatically with the new token.

**Independent Test**: Open browser DevTools Network tab, navigate to the teacher dashboard (which fires 5+ simultaneous requests), with the access token expired. Confirm exactly one POST to the refresh endpoint and five retried original requests, all succeeding.

*Note*: This story is satisfied entirely by the refresh lock implemented in T009 and T011. No additional implementation tasks are needed. Verify the race condition prevention is working after completing Phase 3.

**Checkpoint**: Concurrent refresh race condition is eliminated. Users are never unexpectedly logged out due to simultaneous 401s.

---

## Phase 5: User Story 4 — Proactive Token Refresh Before Expiry (Priority: P2)

**Goal**: The access token is silently renewed ~5 minutes before it expires, so no in-flight user request ever hits a 401.

**Independent Test**: Log in, decode the JWT `exp` from the access token (use `atob` in the console). Confirm a silent refresh network call is made ~5 minutes before that timestamp — without any user interaction.

### Implementation for User Story 4

- [x] T013 [P] [US4] Add a `proactiveRefreshTimer` ref variable to `src/store/authStore.ts` state to track the scheduled timer handle so it can be cancelled on logout
- [x] T014 [US4] Implement `silentRefresh()` private async function inside `src/store/authStore.ts` — reads current tokens from localStorage, calls `getRefreshConfig()`, makes the refresh POST directly (via `axios`, not `apiClient`, to avoid interceptor loops), updates localStorage and Zustand state with new tokens, then calls `scheduleProactiveRefresh()` to reschedule the next cycle
- [x] T015 [US4] Update `authStore.initialize()` in `src/store/authStore.ts` to call `scheduleProactiveRefresh(session, silentRefresh)` after restoring tokens and store the returned timer handle in `proactiveRefreshTimer`
- [x] T016 [US4] Update `authStore.login()` in `src/store/authStore.ts` to call `scheduleProactiveRefresh(tokens, silentRefresh)` after successful login and store the timer handle
- [x] T017 [US4] Update `authStore.clearAuth()` in `src/store/authStore.ts` to cancel the proactive refresh timer: `if (proactiveRefreshTimer) clearTimeout(proactiveRefreshTimer)`

**Checkpoint**: After login, a scheduled silent refresh fires ~55 minutes in (5 min before the 60-min expiry). No user sees a 401 during normal continuous use.

---

## Phase 6: User Story 5 — Tab Visibility Session Check (Priority: P2)

**Goal**: When a user returns to a backgrounded browser tab, the system checks whether their access token is still valid and silently refreshes it before any user-triggered action fails.

**Independent Test**: Log in, leave the tab backgrounded for 60+ minutes (or manually edit `exp` in localStorage to a past timestamp), switch back to the tab, and confirm the session is silently restored (or redirected to login) before clicking anything.

### Implementation for User Story 5

- [x] T018 [P] [US5] Add a `visibilityChangeAttached` flag to `src/store/authStore.ts` (module-level boolean) to prevent duplicate listener registration across multiple `initialize()` calls
- [x] T019 [US5] In `authStore.initialize()` in `src/store/authStore.ts`, after the visibility flag check, attach a `document.addEventListener('visibilitychange', handleVisibilityChange)` handler where `handleVisibilityChange` checks `document.visibilityState === 'visible'`, then reads tokens from localStorage and calls `isTokenExpired(tokens.access)` — if expired, calls `silentRefresh()` or `clearAuth()` if the refresh token is also expired

**Checkpoint**: Returning to a backgrounded tab either silently restores the session (if the refresh token is valid) or cleanly redirects to login (if not). No unexplained API errors occur on tab return.

---

## Phase 7: User Story 3 — Inactivity Idle Timeout with Warning (Priority: P2)

**Goal**: Users who leave a tab unattended for 30 minutes see a toast warning. If they remain inactive for 5 more minutes (35 total), they are automatically logged out and redirected to their role's login page.

**Independent Test**: Temporarily set the warn threshold to 10 seconds and logout threshold to 20 seconds in `useIdleTimeout.ts`. Load the app, remain idle, confirm the toast appears at 10s and logout occurs at 20s. Reset thresholds after verifying.

### Implementation for User Story 3

- [x] T020 [US3] Create `src/hooks/useIdleTimeout.ts` — implement the hook with two `useRef` timer handles (`warnTimerRef`, `logoutTimerRef`) and a `toastIdRef` to track the dismissible toast
- [x] T021 [US3] Implement `resetTimers()` inside `src/hooks/useIdleTimeout.ts` — clears both timers, dismisses the active toast (using `toast.dismiss(toastIdRef.current)`), sets warn timer to fire at 30 minutes calling `showWarning()`, sets logout timer to fire at 35 minutes calling `forceLogout()`
- [x] T022 [US3] Implement `showWarning()` inside `src/hooks/useIdleTimeout.ts` — calls `toast('Your session will expire in 5 minutes due to inactivity. Move your mouse or press any key to stay logged in.', { duration: 300000, icon: '⚠️' })` and stores the toast ID in `toastIdRef`
- [x] T023 [US3] Implement `forceLogout()` inside `src/hooks/useIdleTimeout.ts` — calls `logout()` from `useAuthStore`, then `navigate(getLoginRouteForRole(user?.role))` from `useNavigate`, with a `toast.error('You were logged out due to inactivity.')`
- [x] T024 [US3] Add throttled event listener setup in `src/hooks/useIdleTimeout.ts` `useEffect` — attach `mousemove`, `keydown`, `click`, `scroll`, `touchstart` listeners on `window` each calling a throttled `resetTimers` (1000ms throttle using a `lastActivity` ref), call `resetTimers()` on mount, return cleanup function removing all listeners and clearing both timers
- [x] T025 [US3] Add `useIdleTimeout()` call to `src/layouts/TeacherLayout.tsx` — import and call the hook inside the layout component body (above the return statement)
- [x] T026 [P] [US3] Add `useIdleTimeout()` call to `src/layouts/StudentLayout.tsx`
- [x] T027 [P] [US3] Add `useIdleTimeout()` call to `src/layouts/ParentLayout.tsx`

**Checkpoint**: A teacher, student, or parent left idle for 30 minutes sees a visible toast warning. After 35 minutes total idle, they are logged out and redirected to the correct role login page.

---

## Phase 8: User Story 6 — Cross-Tab Session Synchronization (Priority: P3)

**Goal**: Logout or token refresh in one browser tab is reflected in all other open tabs within 2 seconds, without requiring a page refresh.

**Independent Test**: Open the app in two tabs (same browser). Log out in Tab A. Confirm Tab B redirects to login within 2 seconds. Then test token refresh: wait for a proactive refresh in Tab A, confirm Tab B's next API call uses the new access token (check Network tab).

### Implementation for User Story 6

- [x] T028 [P] [US6] Add a `storageListenerAttached` module-level flag to `src/store/authStore.ts` to prevent duplicate `storage` listener registration
- [x] T029 [US6] In `authStore.initialize()` in `src/store/authStore.ts`, after the flag check, attach `window.addEventListener('storage', handleStorageChange)` where `handleStorageChange` checks `event.key === 'auth_tokens'`: if `event.newValue` is null (tokens removed in another tab), call `clearAuth()` + `window.location.replace(getLoginRouteForRole(currentRole))`; if `event.newValue` differs from `event.oldValue` (tokens updated by refresh in another tab), parse and call `useAuthStore.setState({ tokens: JSON.parse(event.newValue) })` to adopt the new token

**Checkpoint**: Logout and token refresh events are propagated across all open tabs. Users cannot remain in an inconsistent authenticated state across tabs.

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Final integration checks and cleanup.

- [x] T030 [P] Verify `authStore.ts` does not register duplicate event listeners (visibilitychange, storage) if `initialize()` is called more than once — confirm the `attached` flags prevent double-registration
- [ ] T031 Manually test the full session lifecycle: login as teacher → idle 30 min → see warning → interact → confirm timer resets → idle 35 min → confirm auto-logout to `/login/teacher`
- [ ] T032 [P] Manually test multi-tab: open two tabs → log out in Tab A → confirm Tab B redirects within 2 seconds
- [ ] T033 [P] Manually test concurrent 401: open teacher dashboard (multiple simultaneous API calls) with an expired access token → confirm exactly one refresh call in Network DevTools → confirm all calls succeed
- [x] T034 Remove any hardcoded refresh endpoint strings from `src/services/apiClient.ts` — all refresh config must route through `getRefreshConfig()` from `authUtils.ts`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 — **BLOCKS all user stories**
- **Phase 3 (US1 — Role Refresh)**: Depends on Phase 2 (needs `getRefreshConfig`, `getLoginRouteForRole`)
- **Phase 4 (US2 — Race Condition)**: Satisfied by Phase 3 — no additional tasks
- **Phase 5 (US4 — Proactive Refresh)**: Depends on Phase 2 (needs `scheduleProactiveRefresh`, `isTokenExpired`)
- **Phase 6 (US5 — Tab Visibility)**: Depends on Phase 5 (needs `silentRefresh`)
- **Phase 7 (US3 — Idle Timeout)**: Depends on Phase 2 (needs `getLoginRouteForRole`)
- **Phase 8 (US6 — Cross-Tab Sync)**: Depends on Phase 3 (needs `clearAuth`, tokens state)
- **Phase 9 (Polish)**: Depends on all phases complete

### User Story Dependencies

- **US1 (P1)**: After Phase 2 — no user story dependencies
- **US2 (P1)**: Satisfied by US1 — no additional implementation
- **US4 (P2)**: After Phase 2 — no user story dependencies, can parallel with US1
- **US5 (P2)**: After US4 (needs `silentRefresh`)
- **US3 (P2)**: After Phase 2 — no user story dependencies, can parallel with US1 and US4
- **US6 (P3)**: After US1 (needs `clearAuth` and auth state)

### Parallel Opportunities

- T001, T002, T003 can all run in parallel (different files)
- T004, T005, T006, T007 can all run in parallel (different functions in different files)
- T013, T018, T028 can run in parallel (different variables/flags)
- T025, T026, T027 can run in parallel (different layout files)
- T030, T031, T032, T033 can run in parallel (manual tests, different scenarios)

---

## Parallel Example: Phase 2

```text
# Run all foundational utility tasks in parallel:
Task T004: getLoginRouteForRole() in src/utils/authUtils.ts
Task T005: getRefreshConfig() in src/utils/authUtils.ts
Task T006: getTokenExpiryMs() in src/utils/tokenUtils.ts
Task T007: isTokenExpired() in src/utils/tokenUtils.ts
Task T008: scheduleProactiveRefresh() in src/utils/tokenUtils.ts
```

---

## Implementation Strategy

### MVP First (US1 + US2 — Critical Fixes Only)

1. Complete Phase 1: Setup (T001–T003)
2. Complete Phase 2: Foundational (T004–T008)
3. Complete Phase 3: US1 Role-Specific Refresh (T009–T012)
4. **STOP and VALIDATE**: Test teacher refresh in Network DevTools
5. Deploy — the most critical breakage (teacher session failures) is fixed

### Incremental Delivery

1. Setup + Foundational → utilities ready
2. Phase 3 (US1/US2) → teacher sessions fixed — **Deploy**
3. Phase 5 (US4) + Phase 6 (US5) → no more 401 delays, tab returns work — **Deploy**
4. Phase 7 (US3) → idle security enforced — **Deploy**
5. Phase 8 (US6) → cross-tab sync added — **Deploy**
6. Phase 9 → final polish — **Deploy**

---

## Notes

- No test files are generated (Constitution Principle I — manual verification only)
- [P] tasks touch different files and have no blocking inter-dependencies
- Each user story phase is independently completable and verifiable
- The proactive refresh timer must use raw `axios` (not `apiClient`) to avoid triggering the 401 interceptor in a loop
- The `visibilitychange` and `storage` listeners must use module-level flags to prevent duplicate registration if `initialize()` is called multiple times (e.g., after ProtectedRoute re-renders)
- Idle timeout thresholds are constants at the top of `useIdleTimeout.ts` for easy future configuration
