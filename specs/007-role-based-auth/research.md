# Technical Research & Decisions: Role-Based Authentication

## 1. State Management (Role & Session Handling)
- **Decision**: Use `Zustand` for global state management (`useAuthStore`).
- **Rationale**: The GROW constitution strictly mandates lightweight state management using Zustand. It will store the current user profile, role, access token, and authentication status. Profile updates will directly mutate the Zustand store so the UI updates instantly.

## 2. API Communication & Interceptors
- **Decision**: Use `Axios` with response interceptors.
- **Rationale**: Axios natively supports interceptors which are critical for catching `401 Unauthorized` responses globally and triggering the refresh token flow automatically before retrying the original request.

## 3. Token Storage Strategy
- **Decision**: Store both `access` and `refresh` tokens in `localStorage`, syncing them to `Zustand` on app initialization.
- **Rationale**: Satisfies the "Persist login session" requirement while allowing immediate synchronous retrieval on application load to prevent auth flickering.

## 4. Route Protection
- **Decision**: Implement a custom `<ProtectedRoute>` wrapper component.
- **Rationale**: Checks `useAuthStore`. Redirects to `/login` if unauthenticated. Redirects to `/unauthorized` if authenticated but missing the `allowedRoles` requirement.

## 5. Token Refresh & API Logout Flow
- **Decision**: Axios intercepts `401`. If a refresh request isn't in flight, it triggers `POST /auth/token/refresh/` and queues failed requests. For explicit logouts, we hit `POST /auth/logout/` with the refresh token to blacklist it on the backend, then clear the frontend state.
- **Rationale**: Standard, robust industry practice. API-level logout guarantees the token is invalidated server-side, securing shared devices.

## 6. Parent-Child Linking & Extended Profile Flow
- **Decision**: Add stateless utility methods to `authApi.ts` for profile mutations (`PUT /api/v1/auth/profile/`), password resets, and school management. Parent-child links (`POST /api/v1/auth/parent-profile/`) are also handled statelessly.
- **Rationale**: Keeps the Zustand store strictly focused on session/auth state while allowing components to handle specific, one-off mutations and loading states locally, maintaining modularity.
