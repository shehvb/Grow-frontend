# Implementation Tasks: Role-Based Authentication

**Feature Branch**: `007-role-based-auth`
**Based on**: [plan.md](./plan.md)

## Task Breakdown

### Phase 1: Core API Layer & Axios Setup
- [x] 1.1 Create `src/types/auth.ts` and define all interfaces for `User`, `AuthTokens`, `LoginRequest`, etc. based on `data-model.md`.
- [x] 1.2 Create `src/services/apiClient.ts` as an Axios instance with base URL configured.
- [x] 1.3 Implement Axios request interceptor in `apiClient.ts` to attach the `Authorization: Bearer <token>` header.
- [x] 1.4 Create `src/services/authApi.ts` containing the core API call wrappers (`login`, `register`, `getProfile`).

### Phase 2: Core State Management (Zustand)
- [x] 2.1 Create `src/store/authStore.ts` using Zustand.
- [x] 2.2 Define initial state: `user`, `tokens`, `isAuthenticated`, `isLoading`, `error`.
- [x] 2.3 Implement the `login` and `register` actions to update the store and `localStorage`.

### Phase 3: Token Refresh Interceptor & Logout
- [x] 3.1 Implement Axios response interceptor in `apiClient.ts` to catch `401 Unauthorized`.
- [x] 3.2 Inside the interceptor, if `401`, call `POST /api/v1/auth/token/refresh/` to fetch a new token.
- [x] 3.3 If refresh is successful, update `localStorage` and retry the original request.
- [x] 3.4 Implement logout API call (`POST /api/v1/auth/logout/`) in `authApi.ts` to invalidate the refresh token on the backend.
- [x] 3.5 Implement `logout` action in `authStore.ts` that triggers the API call, clears session state, and redirects to `/login`.

### Phase 4: Route Protection & Roles
- [x] 4.1 Create `src/components/auth/ProtectedRoute.tsx`.
- [x] 4.2 In `ProtectedRoute.tsx`, consume `useAuthStore` and handle unauthenticated logic.
- [x] 4.3 Add role-checking logic against the `allowedRoles` prop.
- [x] 4.4 Wrap existing App.tsx routes with `<ProtectedRoute>`.

### Phase 5: Advanced Auth Flows (API Integration)
- [x] 5.1 Implement change password API integration (`POST /api/v1/auth/change-password/`) in `authApi.ts`.
- [x] 5.2 Implement forgot password request flow (`POST /api/v1/auth/forgot-password/`) in `authApi.ts`.
- [x] 5.3 Implement reset password with token (`POST /api/v1/auth/reset-password/`) in `authApi.ts`.
- [x] 5.4 Implement profile update API (`PUT /api/v1/auth/profile/`) in `authApi.ts` and add `updateUserProfile` action to `authStore.ts`.
- [x] 5.5 Implement parent-student linking API (`POST /api/v1/auth/parent-profile/`) in `authApi.ts`.
- [x] 5.6 Implement school fetch (`GET /api/v1/auth/school/`) and create APIs (`POST /api/v1/auth/school/`) in `authApi.ts`.

### Phase 6: UI Integration & Verification
- [x] 6.1 Update Login & Registration pages to use `useAuthStore`.
- [ ] 6.2 Test core auth flow (Register -> Login -> Access Dashboard) manually for each role.
- [ ] 6.3 Test Token Refresh and Logout API flows explicitly.
- [ ] 6.4 (If UI exists) Connect the Advanced Auth flows (Password Reset, Update Profile, School APIs, Parent Linking) to their respective components and verify manually.
