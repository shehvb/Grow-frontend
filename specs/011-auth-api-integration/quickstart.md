# Quickstart: Auth API Integration

## Setup
1. Ensure the backend API is running and reachable at the URL defined in your `.env` (e.g., `VITE_API_URL`).
2. Run `npm install` to ensure all dependencies (`axios`, `zustand`, `react-hot-toast`) are available.

## Authentication Flow
1. **Login**: Call `useAuthStore.getState().login(email, password)`. This stores the `access` and `refresh` tokens in `localStorage`.
2. **Authorized Requests**: Use the exported `apiClient` from `src/services/apiClient.ts`. It automatically attaches the Bearer token to every request.
3. **Token Refresh**: If a request fails with a 401, the interceptor in `apiClient.ts` will automatically try to refresh the token using the stored `refresh` token.
4. **Logout**: Call `useAuthStore.getState().logout()`. This clears the store and `localStorage`.

## Development Tasks
- Refactor existing login pages in `src/components/auth/` to use the `authStore`.
- Implement social login buttons for Parent registration.
- Add error boundaries or toast notifications for auth-related failures.

## Verification
- Manual verification: Log in as a Teacher, Student, and Parent. Verify redirection to correct dashboards.
- Verify that closing the browser and reopening maintains the session.
- Verify that "Logout" clears all session data.
