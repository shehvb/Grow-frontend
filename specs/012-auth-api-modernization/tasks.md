# Tasks: Auth API Modernization

**Input**: Design documents from `/specs/012-auth-api-modernization/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Manual verification only (Principle I: No Testing).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, etc.)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure updates

- [ ] T001 Update `src/types/auth.ts` with new interfaces from `data-model.md`
- [ ] T002 [P] Synchronize `src/services/apiClient.ts` base URL and default headers
- [ ] T003 Ensure `VITE_API_URL` is correctly configured in `.env` and `.env.example`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [ ] T004 [P] Update `src/services/apiClient.ts` interceptors to handle 429 (Rate Limit) and 500 (Server Error) normalization
- [ ] T005 [P] Implement centralized error notification helper in `src/utils/error-handler.ts` using `react-hot-toast`
- [ ] T006 Update `src/store/authStore.ts` types to support `is_first_login` and new profile fields

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Secure Role-Based Authentication (Priority: P1) 🎯 MVP

**Goal**: Enable secure login, profile retrieval, and logout for all roles.

**Independent Test**: Successfully log in with a student account, see profile data in the UI, and log out to clear tokens.

### Implementation for User Story 1

- [ ] T007 [P] [US1] Update `login` method in `src/services/authApi.ts` to match `contracts/api_contracts.md`
- [ ] T008 [P] [US1] Update `getProfile` method in `src/services/authApi.ts` to use `/auth/me/`
- [ ] T009 [P] [US1] Update `logout` method in `src/services/authApi.ts` to blacklist refresh token
- [ ] T010 [US1] Refactor `login` action in `src/store/authStore.ts` to handle standardized response
- [ ] T011 [US1] Refactor `logout` action in `src/store/authStore.ts` to clear local state and call API
- [ ] T012 [US1] Update `AuthTabs.tsx` and Login components to use the new `authStore` actions

---

## Phase 4: User Story 2 - Account Registration & Onboarding (Priority: P1)

**Goal**: Support role-based registration and the new Parent-specific quick signup.

**Independent Test**: Register a new Parent and verify they are automatically logged in without a second login step.

### Implementation for User Story 2

- [ ] T013 [P] [US2] Update `register` method in `src/services/authApi.ts`
- [ ] T014 [P] [US2] Implement `signup` (Parent specific) in `src/services/authApi.ts`
- [ ] T015 [US2] Implement `signup` action in `src/store/authStore.ts` for auto-login flow
- [ ] T016 [US2] Create Parent Signup page in `src/pages/auth/ParentSignupPage.tsx`
- [ ] T017 [US2] Update registration logic in `src/components/auth/RegisterForm.tsx` to handle role-based paths

---

## Phase 5: User Story 3 - Joining a School (Priority: P2)

**Goal**: Allow students and teachers to join schools using enrollment codes.

**Independent Test**: Use a valid enrollment code and verify the user's school membership via profile refresh.

### Implementation for User Story 3

- [ ] T018 [P] [US3] Implement `useEnrollmentCode` in `src/services/authApi.ts`
- [ ] T019 [US3] Create `EnrollmentCodeInput` component in `src/components/auth/EnrollmentCodeInput.tsx`
- [ ] T020 [US3] Integrate enrollment code check into the Student/Teacher onboarding dashboards

---

## Phase 6: User Story 4 - School Administration (Priority: P2)

**Goal**: Empower School Admins to create schools and manage codes.

**Independent Test**: Create a school and generate 10 enrollment codes in the Admin dashboard.

### Implementation for User Story 4

- [ ] T021 [P] [US4] Implement `createSchool` and `getSchool` in `src/services/authApi.ts`
- [ ] T022 [P] [US4] Create `adminApi.ts` service for code management: `listCodes`, `generateCodes`, `revokeCode`
- [ ] T023 [US4] Create `SchoolSetupPage` in `src/pages/admin/SchoolSetupPage.tsx`
- [ ] T024 [US4] Create `EnrollmentManagement` dashboard in `src/components/admin/EnrollmentManagement.tsx`

---

## Phase 7: User Story 5 - Parent-Child Linking (Priority: P3)

**Goal**: Enable parents to link their account to a student child.

**Independent Test**: Provide a student ID and verify the link is established in the Parent dashboard.

### Implementation for User Story 5

- [ ] T025 [P] [US5] Implement `linkParent` in `src/services/authApi.ts`
- [ ] T026 [US5] Create `ChildLinkingForm` component in `src/components/auth/ChildLinkingForm.tsx`
- [ ] T027 [US5] Integrate linking flow into Parent onboarding

---

## Phase 8: User Story 6 - Social Login Integration (Priority: P3)

**Goal**: Integrate Google/Facebook OAuth for simplified access.

**Independent Test**: Click "Login with Google" and verify successful account creation/login.

### Implementation for User Story 6

- [ ] T028 [P] [US6] Update `oauthLogin` in `src/services/authApi.ts` to match `OAuthRequest` schema
- [ ] T029 [US6] Integrate `@react-oauth/google` provider in `src/App.tsx`
- [ ] T030 [US6] Add "Login with Google" button to `LoginStudent.tsx`, `LoginTeacher.tsx`, and `ParentSignupPage.tsx`

---

## Phase 9: User Story 7 - Password Management & Recovery (Priority: P3)

**Goal**: Support authenticated password changes and unauthenticated recovery.

**Independent Test**: Successfully reset a password using the email token flow.

### Implementation for User Story 7

- [ ] T031 [P] [US7] Update `changePassword`, `forgotPassword`, and `resetPassword` in `src/services/authApi.ts`
- [ ] T032 [US7] Create `ForgotPasswordPage` in `src/pages/auth/ForgotPasswordPage.tsx`
- [ ] T033 [US7] Create `ResetPasswordPage` in `src/pages/auth/ResetPasswordPage.tsx`
- [ ] T034 [US7] Create `ChangePasswordForm` for user settings in `src/components/auth/ChangePasswordForm.tsx`

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Final refinements and verification

- [ ] T035 [P] Update `updateProfile` in `src/services/authApi.ts` to support all new profile fields
- [ ] T036 Refactor all auth-related Toasts to use the centralized error handler from T005
- [ ] T037 Perform final walkthrough using `quickstart.md`
- [ ] T038 Remove any remaining console logs and unused auth mocks

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 & 2**: MUST be completed first to provide types and interceptors.
- **Phase 3 (US1)**: Highest priority. Blocks all other UI-level interactions.
- **Phase 4-9**: Can be worked on in parallel once Phase 3 is stable.
- **Phase 10**: Final cleanup.

### Parallel Opportunities

- All tasks marked [P] can be worked on simultaneously by different agents/developers.
- Services (API layer) can be updated in parallel with the state management (Zustand) and UI components.
- Different role-specific flows (Admin vs. Parent vs. Student) are mostly decoupled.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & 2 (Foundations).
2. Complete Phase 3 (US1 - Core Login).
3. **STOP and VALIDATE**: Verify that existing users can still log in and sessions persist.

### Incremental Delivery

1. Add Phase 4 (US2) to enable Parent onboarding.
2. Add Phase 5 & 6 to enable School/Student connection.
3. Add Social and Security features in the final stretch.
