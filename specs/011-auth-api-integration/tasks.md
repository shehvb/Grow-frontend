# Task Breakdown: Auth API Integration

**Feature**: [spec.md](./spec.md)
**Plan**: [plan.md](./plan.md)
**Status**: Complete

## Implementation Strategy
We will follow an incremental delivery approach, starting with the core API client and state management, then proceeding to connect each user story. All authentication logic will be centralized in services and stores to ensure consistency across different user roles.

## Phase 1: Setup
- [x] T001 [P] Configure environment variables for API base URL in `.env`
- [x] T002 [P] Install missing dependencies: `react-hot-toast`, `react-hook-form`, `zod`
- [x] T003 [P] Initialize directory structure for `src/services` and `src/store` if they don't exist

## Phase 2: Foundational
- [x] T004 [P] Implement base `apiClient.ts` with standard headers in `src/services/apiClient.ts`
- [x] T005 [P] Define TypeScript interfaces for Auth requests and responses in `src/types/auth.ts`
- [x] T006 Implement `authApi.ts` with methods for login, register, refresh, and profile in `src/services/authApi.ts`
- [x] T007 Implement `authStore.ts` using Zustand to manage tokens and user profile in `src/store/authStore.ts`
- [x] T008 [P] Create `useAuth.ts` custom hook for simplified auth state access in `src/hooks/useAuth.ts`

## Phase 3: User Story 1 - User Authentication
**Goal**: Enable Students, Teachers, and Parents to log in securely.
**Independent Test**: Successfully log in as each role and verify redirection to the correct dashboard.

- [x] T009 [US1] Refactor `LoginParent.tsx` to use `authStore.login()` and handle errors in `src/components/auth/LoginParent.tsx`
- [x] T010 [US1] Refactor `LoginStudent.tsx` to use `authStore.login()` and handle errors in `src/components/auth/LoginStudent.tsx`
- [x] T011 [US1] Refactor `LoginTeacher.tsx` to use `authStore.login()` and handle errors in `src/components/auth/LoginTeacher.tsx`
- [x] T012 [US1] Implement centralized redirection logic in `App.tsx` based on user role

## Phase 4: User Story 2 - Account Registration
**Goal**: Allow new users to create accounts.
**Independent Test**: Register a new account and verify the user can immediately log in or is auto-logged in.

- [x] T013 [US2] Update registration forms to use `authApi.register()` in `src/components/auth/`
- [x] T014 [US2] Implement Google/Facebook OAuth buttons and integration logic for Parent accounts in `src/components/auth/LoginParent.tsx`
- [x] T015 [US2] Ensure role-specific data (e.g., student ID, teacher credentials) is handled during registration

## Phase 5: User Story 3 - Session Persistence and Refresh
**Goal**: Seamless session maintenance and automatic token renewal.
**Independent Test**: Wait for token expiration (or simulate) and verify the next request auto-renews without logging out.

- [x] T016 [US3] Implement token loading from `localStorage` on store initialization in `src/store/authStore.ts`
- [x] T017 [US3] Implement Axios interceptor for 401 response to trigger token refresh in `src/services/apiClient.ts`
- [x] T018 [US3] Add logic to handle refresh failure by clearing store and redirecting to login

## Phase 6: User Story 4 - Profile Management
**Goal**: Allow users to view and update their profile details.
**Independent Test**: Change profile information and verify it persists after a page reload.

- [x] T019 [US4] Implement "Get Me" profile fetching in `authStore.ts` using `/api/v1/auth/me/`
- [x] T020 [US4] Create or update Profile page to display and edit user information in `src/features/settings/`
- [x] T021 [US4] Connect profile edit form to `authApi.updateProfile()` using `/api/v1/auth/profile/`

## Phase 7: User Story 5 - Password Recovery
**Goal**: Enable users to reset forgotten passwords.
**Independent Test**: Complete the "Forgot Password" flow and verify the new password works for login.

- [x] T022 [US5] Implement "Forgot Password" request UI and API connection in `src/components/auth/ForgotPassword.tsx`
- [x] T023 [US5] Implement "Reset Password" form and token-based submission logic in `src/components/auth/ForgotPassword.tsx`

## Phase 8: User Story 6 - Secure Logout
**Goal**: Safely terminate the user session.
**Independent Test**: Click logout and verify that protected routes are no longer accessible.

- [x] T024 [US6] Implement `logout()` method in `authStore.ts` that calls `/api/v1/auth/logout/` and clears storage
- [x] T025 [US6] Add logout button to all role-specific sidebars and header components

## Phase 9: Polish & Cross-Cutting
- [x] T026 Implement global `Toaster` from `react-hot-toast` in `src/main.tsx` for consistent feedback
- [x] T027 [P] Verify that no sensitive tokens are logged to the console
- [x] T028 [P] Generate the "Auth Integration Audit Report" documenting all connected endpoints in `specs/011-auth-api-integration/audit-report.md`

## Dependencies
- Foundational (Phase 2) MUST be completed before User Stories.
- User Story 1 (Login) is the primary MVP scope.
- User Story 3 (Refresh) depends on Story 1 being functional.

## Parallel Execution Opportunities
- T001, T002, T003 can be done in parallel.
- T004, T005, T008 can be started together.
- T027, T028 can be done during the final polish phase.
