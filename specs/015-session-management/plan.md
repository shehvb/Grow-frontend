# Implementation Plan: Session Management

**Branch**: `015-session-management` | **Date**: 2026-05-14 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/015-session-management/spec.md`

---

## Summary

Implement a robust, role-aware session management layer for the Grow Educational Platform frontend. The implementation upgrades the existing Axios interceptor and Zustand auth store to: route token refresh requests to the correct role-specific backend endpoint, prevent concurrent refresh race conditions via a promise queue, proactively refresh tokens before expiry, detect inactivity and auto-logout with user warnings, check session validity when browser tabs regain focus, and synchronize auth state across multiple open tabs — all using zero new npm dependencies.

---

## Technical Context

**Language/Version**: TypeScript 5.x (as declared in project)  
**Primary Dependencies**: React ^19.2.0, Zustand 5.0.12, Axios 1.16.0, react-hot-toast (existing)  
**Storage**: `localStorage` (existing — `auth_tokens` key)  
**Testing**: Manual/acceptance-based only (Constitution Principle I)  
**Target Platform**: Modern browsers (Chrome, Firefox, Safari, Edge)  
**Project Type**: Web application (React SPA)  
**Performance Goals**: Refresh lock resolves within 200ms; idle timer accuracy within 10 seconds  
**Constraints**: Zero new npm dependencies; must not break existing teacher/student/parent login flows  
**Scale/Scope**: 3 user roles, ~6 modified/created files

---

## Constitution Check

*GATE: Checked before Phase 0 research. Re-checked after Phase 1 design.*

| Principle | Status | Notes |
|---|---|---|
| I. No Testing | Pass | No test files, no test frameworks |
| II. Stack Versions | Pass | React ^19.2.0, Tailwind ^3.4.0, Vite — unchanged |
| III. Clean Code | Pass | Each concern isolated to its own file/function |
| IV. Simple UX | Pass | Warning uses existing react-hot-toast; no new modal |
| V. Accessibility & Responsive | Pass | No new UI components; toast is accessible |
| VI. Minimal Dependencies | Pass | Zero new npm packages; uses browser native APIs only |
| VII. Component-Based Architecture | Pass | Idle timer is a hook; utilities are pure functions |
| VIII. Design System Consistency | Pass | Warning toast reuses existing toast configuration |
| IX. Feature Isolation | Pass | Session logic isolated in dedicated files |
| X. Clean State Management | Pass | Uses Zustand (existing); no new stores |
| XI. Performance First | Pass | Event listeners are throttled; proactive refresh avoids 401 round-trips |
| XII. Spec-Driven Development | Pass | spec → plan → tasks → implement workflow followed |

**No violations. No complexity justification required.**

---

## Project Structure

### Documentation (this feature)

```text
specs/015-session-management/
├── plan.md          (this file)
├── spec.md
├── research.md
├── data-model.md
└── tasks.md         (created by /speckit-tasks)
```

### Source Code — Files Modified / Created

```text
src/
├── utils/
│   ├── tokenUtils.ts          (NEW)
│   └── authUtils.ts           (NEW)
├── services/
│   └── apiClient.ts           (MODIFIED)
├── store/
│   └── authStore.ts           (MODIFIED)
├── types/
│   └── auth.ts                (MODIFIED - extend AuthTokens)
└── hooks/
    └── useIdleTimeout.ts      (NEW)
```

---

## Phase 0: Research Summary

All decisions resolved. See research.md for full rationale.

| Question | Decision |
|---|---|
| How to prevent concurrent refreshes? | Module-level isRefreshing boolean + refreshQueue array in apiClient.ts |
| How to know which refresh endpoint to call? | Store role + loginFlow in auth_tokens localStorage object at login time |
| How to decode JWT expiry? | atob() on the second JWT segment — no library needed |
| How to implement idle timeout? | useIdleTimeout hook with throttled event listeners + react-hot-toast |
| How to check visibility? | document.visibilitychange listener attached in authStore.initialize() |
| How to sync across tabs? | Native window.storage event listener |
| How to redirect to correct login? | getLoginRouteForRole(role) pure function in authUtils.ts |

---

## Phase 1: Design

### New Utility: src/utils/tokenUtils.ts

Pure functions for JWT token introspection and proactive refresh scheduling.

Functions:
- `getTokenExpiryMs(token)` — Decodes JWT payload, returns exp * 1000 (epoch ms), or null if malformed.
- `isTokenExpired(token)` — Returns true if getTokenExpiryMs() is less than Date.now()
- `scheduleProactiveRefresh(tokens, onRefresh)` — Computes delay = expiryMs - Date.now() - 5 min. If delay > 0 and tab is visible: sets timeout calling onRefresh(). Returns timer handle so callers can cancel it on logout.

---

### New Utility: src/utils/authUtils.ts

Pure mapping functions shared across apiClient.ts, authStore.ts, and useIdleTimeout.ts.

Functions:
- `getLoginRouteForRole(role)` — Maps: teacher → /login/teacher, student → /login/student, parent → /login/parent, default → /login/student
- `getRefreshConfig(session)` — Returns the correct refresh endpoint and request body shape per role/loginFlow using the endpoint matrix from data-model.md

---

### Modified: src/services/apiClient.ts

Changes:

1. Add refresh lock at module level (outside the axios instance):
   - `isRefreshing` boolean flag
   - `refreshQueue` array of resolve callbacks
   - `processQueue(token)` helper that resolves all queued promises

2. Replace the 401 handler:
   - If isRefreshing is true: push a promise to refreshQueue; resolve it when processQueue fires
   - If isRefreshing is false: set isRefreshing = true, call getRefreshConfig(), make the refresh request, call processQueue(newToken), set isRefreshing = false
   - On refresh failure: call processQueue with rejection, clearAuth(), redirect to role login

3. Remove the hardcoded `/auth/token/refresh/` call — replace with getRefreshConfig()

---

### Modified: src/store/authStore.ts

Changes:

1. `login()` — after storing tokens, persist role and loginFlow in the stored object. loginFlow determined by login endpoint used (inferred from which login function calls this).

2. `initialize()` — after restoring tokens:
   - Call scheduleProactiveRefresh(session, silentRefresh) and store the timer handle
   - Attach document.visibilitychange listener (once) that calls initialize() if token is expired on focus
   - Attach window.storage listener (once) for cross-tab sync

3. `logout()` and `clearAuth()` — cancel the proactive refresh timer handle.

4. Add `silentRefresh()` internal function — calls the correct refresh endpoint via getRefreshConfig(), updates localStorage, updates Zustand state, reschedules proactive refresh.

5. Cross-tab storage listener:
   - If auth_tokens key is removed in another tab: call clearAuth() + redirect
   - If auth_tokens key is updated in another tab: adopt new tokens via setState

---

### New Hook: src/hooks/useIdleTimeout.ts

Purpose: Detects user inactivity, shows a toast warning at 30 min, forces logout at 35 min.

Behavior:
- Attaches throttled listeners for: mousemove, keydown, click, scroll, touchstart
- On activity: resets both timers, dismisses warning toast if shown
- At 30 min idle: shows react-hot-toast warning (duration 5 min)
- At 35 min idle: calls logout(), navigate(getLoginRouteForRole(user?.role))
- Cleans up all listeners and timers on unmount

Called from: Added to each role's top-level layout (TeacherLayout, StudentLayout, ParentLayout) with a single line: `useIdleTimeout();`

---

### Updated: src/types/auth.ts

Extend AuthTokens to include optional role and loginFlow fields:

```
interface AuthTokens {
  access: string;
  refresh: string;
  role?: 'student' | 'teacher' | 'parent' | 'school_admin';
  loginFlow?: 'standard' | 'otp';
}
```

---

## Implementation Phases (for /speckit-tasks)

### Phase 1 — Critical Fixes (P1: US1, US2)
Fixes live breakage affecting teachers and concurrent refresh corruption.

Deliverables:
- src/utils/authUtils.ts
- src/services/apiClient.ts (refresh lock + role-specific endpoint)
- src/store/authStore.ts (persist role + loginFlow at login)
- src/types/auth.ts (extend AuthTokens)

### Phase 2 — Proactive Refresh + Visibility (P2: US4, US5)
Eliminates reactive-refresh delays and broken returning-tab experience.

Deliverables:
- src/utils/tokenUtils.ts
- src/store/authStore.ts (proactive refresh scheduling, visibility listener, silentRefresh)

### Phase 3 — Idle Timeout (P2: US3)
Adds security-critical session timeout with user warning.

Deliverables:
- src/hooks/useIdleTimeout.ts
- src/layouts/TeacherLayout.tsx, StudentLayout.tsx, ParentLayout.tsx (call useIdleTimeout)

### Phase 4 — Cross-Tab Sync (P3: US6)
Finalizes multi-tab consistency.

Deliverables:
- src/store/authStore.ts (window.storage listener for logout + token adoption)

---

## Post-Design Constitution Check

All Phase 1 design decisions remain compliant with all 12 constitutional principles. No new violations introduced.
