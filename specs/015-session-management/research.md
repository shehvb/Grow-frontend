# Research: Session Management (015)

## Decision 1: Refresh Lock Pattern

**Decision**: Use a module-level `isRefreshing` boolean + `refreshQueue` array inside `apiClient.ts`.

**Rationale**: This is the simplest pattern that satisfies FR-002 and FR-003 with zero dependencies. A promise-based queue ensures all 401-failed requests receive the new token once refresh completes. No external library needed.

**Alternatives considered**:
- `p-queue` library — unnecessary dependency for a single queue
- Zustand-based lock — introduces component coupling to infrastructure code
- `axios-auth-refresh` library — adds a dependency; the manual pattern is 15 lines and fully transparent

---

## Decision 2: Role-Specific Refresh Endpoint Resolution

**Decision**: Read `user.role` and `loginFlow` from `localStorage` (stored alongside tokens at login time) to determine which refresh endpoint and body format to call.

**Rationale**: The `User` type already has a `role` field (`student | teacher | parent | school_admin`). Login responses include the user object. We store tokens in `auth_tokens`; we will also persist the role and login flow in the same key. This avoids any additional storage keys.

**Token storage shape (updated)**:
```ts
interface StoredAuthSession {
  access: string;
  refresh: string;
  role: 'student' | 'teacher' | 'parent' | 'school_admin';
  loginFlow: 'standard' | 'otp'; // only relevant for students
}
```

**Refresh endpoint matrix**:
| Role | loginFlow | Endpoint | Body key |
|---|---|---|---|
| student | standard | `auth/token/refresh/` | `refresh` |
| student | otp | `auth/student/token/refresh/` | `refresh_token` |
| teacher | any | `teacher/auth/refresh/` | `refresh` |
| parent | any | `auth/token/refresh/` | `refresh` |
| school_admin | any | `auth/token/refresh/` | `refresh` |

---

## Decision 3: JWT Expiry Decoding

**Decision**: Decode the JWT `exp` claim from the access token's base64 payload using `atob()` — no library needed.

**Rationale**: All modern browsers support `atob()`. The JWT payload is the second `.`-delimited segment. The `exp` claim is a Unix timestamp in seconds. Converting to milliseconds gives us an exact expiry time we can `setTimeout` against.

**Utilities file**: `src/utils/tokenUtils.ts` — two pure functions: `getTokenExpiryMs(token)` and `scheduleProactiveRefresh(tokens, refreshFn)`.

---

## Decision 4: Idle Timeout Implementation

**Decision**: Implement as a singleton React hook `src/hooks/useIdleTimeout.ts` that attaches throttled `addEventListener` listeners for `mousemove`, `keydown`, `click`, `scroll`, `touchstart`.

**Rationale**: A hook is the natural React primitive for side effects. Using a singleton (called once in the root layout) ensures only one set of timers runs. Events are throttled to avoid excessive timer resets (debounce: 1000ms).

**Warning UI**: Use `react-hot-toast` (already in the project) for the 5-minute warning notification. This avoids creating a new modal component and stays consistent with existing UX patterns.

---

## Decision 5: Tab Visibility Check

**Decision**: Attach a `visibilitychange` listener in `authStore.initialize()` that fires on every `visibilityState === 'visible'` event. Check if the stored access token is expired using `getTokenExpiryMs()`. If expired, call `initialize()` to attempt re-authentication.

**Rationale**: `document.addEventListener('visibilitychange', ...)` is universally supported. Attaching it in `initialize()` ensures it's set up once per page load alongside other auth setup. No additional file needed.

---

## Decision 6: Cross-Tab Synchronization

**Decision**: Use the native `window.addEventListener('storage', ...)` event. This fires in all tabs except the one that made the `localStorage` change.

**Rationale**: Zero dependencies. Fires reliably for `localStorage` writes. The existing `auth_refresh_failed` custom event pattern is already used in the codebase, so this extends the same approach.

**Behavior**:
- If `auth_tokens` is removed → other tabs call `clearAuth()` and redirect
- If `auth_tokens` is updated (refresh in another tab) → other tabs adopt new tokens via `setState`

---

## Decision 7: Role-Specific Login Redirect

**Decision**: Add a `getLoginRouteForRole(role)` pure function to `src/utils/authUtils.ts` that returns the correct login path per role. Used by both `apiClient.ts` (refresh failure redirect) and `useIdleTimeout.ts` (idle logout redirect).

**Rationale**: Centralizes the role → login path mapping in one place, avoiding duplication across files.

**Mapping**:
```ts
teacher  → /login/teacher
student  → /login/student
parent   → /login/parent
default  → /login/student
```

---

## Existing Files — No New Dependencies Required

All 6 decisions use only:
- Browser native APIs (`localStorage`, `atob`, `setTimeout`, `addEventListener`)
- Existing project packages: Axios, Zustand, `react-hot-toast`, React Router
- No new npm packages needed (✅ Constitution Principle VI: Minimal Dependencies)
