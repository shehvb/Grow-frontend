# Research: Auth API Integration

## Decision: OAuth2 Integration (Google/Facebook)
- **Choice**: Use a client-side OAuth library or direct redirect flow to the backend OAuth endpoint.
- **Rationale**: The backend (`/api/v1/auth/oauth/`) expects a social access token. We will implement the "Implicit Grant" or "Authorization Code" flow (depending on backend requirements) to obtain the social token and then exchange it with our backend.
- **Alternatives Considered**: Using a third-party auth provider like Firebase/Auth0 (Rejected: Backend already has its own auth system).

## Decision: Token Refresh Strategy
- **Choice**: Axios Interceptor with an async refresh queue.
- **Rationale**: When a `401 Unauthorized` is received, the interceptor will pause outgoing requests, attempt to refresh the token via `POST /api/v1/auth/token/refresh/`, and then retry the original requests with the new token. This ensures a seamless user experience.
- **Alternatives Considered**: Refreshing token on timer (Rejected: Inefficient and less reliable).

## Decision: Error Handling Componentry
- **Choice**: `react-hot-toast` for global notifications and `react-hook-form`'s `setError` for inline validation.
- **Rationale**: Provides clear, actionable feedback for both system-level (e.g., network) and user-level (e.g., wrong password) errors, satisfying SC-003.
- **Alternatives Considered**: Simple `window.alert` (Rejected: Poor UX).

## Decision: Role-Based Redirection
- **Choice**: Centralized router guard based on the `user.role` field.
- **Rationale**: Ensures that after login, the user is immediately taken to the environment tailored to their role (Student, Teacher, or Parent).
- **Alternatives Considered**: Hardcoded redirects in login components (Rejected: Harder to maintain).
