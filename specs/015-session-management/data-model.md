# Data Model: Session Management (015)

## Entity: StoredAuthSession

Replaces the existing bare `AuthTokens` shape stored in `localStorage` under `auth_tokens`.

```ts
interface StoredAuthSession {
  access: string;        // JWT access token (valid 60 min)
  refresh: string;       // JWT refresh token (valid 7 days)
  role: 'student' | 'teacher' | 'parent' | 'school_admin';
  loginFlow: 'standard' | 'otp'; // determines refresh endpoint for students
}
```

**Stored at**: `localStorage.key('auth_tokens')`  
**Set by**: `authStore.login()` — enriched at login time with role + loginFlow  
**Read by**: `apiClient.ts` interceptors, `authStore.initialize()`, `useIdleTimeout.ts`

---

## Entity: AuthTokens (updated type)

Existing TypeScript interface extended to include session metadata:

```ts
// src/types/auth.ts — extend existing AuthTokens
interface AuthTokens {
  access: string;
  refresh: string;
  role?: 'student' | 'teacher' | 'parent' | 'school_admin';
  loginFlow?: 'standard' | 'otp';
}
```

---

## Entity: RefreshLock (runtime only, not persisted)

Module-level state in `apiClient.ts`. Not stored; reset on page load.

```ts
// Module-level in apiClient.ts
let isRefreshing: boolean = false;
let refreshQueue: Array<(newToken: string) => void> = [];
```

---

## Entity: IdleTimerState (runtime only, not persisted)

Managed inside `useIdleTimeout.ts` hook via React `useRef`.

```ts
interface IdleTimerState {
  warnTimer: ReturnType<typeof setTimeout> | null;   // fires at 30 min
  logoutTimer: ReturnType<typeof setTimeout> | null; // fires at 35 min
  warningShown: boolean;                             // true while toast is visible
}
```

---

## Refresh Endpoint Matrix

| Role | loginFlow | Endpoint (relative to baseURL) | Body |
|---|---|---|---|
| `student` | `standard` | `auth/token/refresh/` | `{ refresh }` |
| `student` | `otp` | `auth/student/token/refresh/` | `{ refresh_token }` |
| `teacher` | any | `teacher/auth/refresh/` | `{ refresh }` |
| `parent` | any | `auth/token/refresh/` | `{ refresh }` |
| `school_admin` | any | `auth/token/refresh/` | `{ refresh }` |

---

## State Transitions: Session Lifecycle

```
[Logged Out]
    │
    ▼ login()
[Authenticated]
    │
    ├── access token nearing expiry (−5 min) → [Proactive Refresh] → [Authenticated]
    ├── API call returns 401 → [Reactive Refresh] → [Authenticated] or [Logged Out]
    ├── Tab regains visibility, token expired → [Reactive Refresh] → [Authenticated] or [Logged Out]
    ├── 30 min idle → [Warning Shown]
    │       │
    │       ├── user interacts → [Authenticated] (timer reset)
    │       └── 5 more min idle → [Force Logout]
    └── storage event: auth_tokens removed → [Force Logout]

[Force Logout] → clearAuth() + redirect to role login page
```
