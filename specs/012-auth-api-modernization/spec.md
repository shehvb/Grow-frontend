# Feature Specification: Modernize and synchronize Auth API integration

**Feature Branch**: `012-auth-api-modernization`  
**Created**: 2026-05-12  
**Status**: Draft  
**Input**: User description: "Update the Feature Specification for the Authentication and Authorization module based on the new Grow Educational Platform API (2).yaml."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Secure Role-Based Authentication (Priority: P1)

As a Student, Teacher, Parent, or School Admin, I want to securely log in to my account so that I can access features specific to my role.

**Why this priority**: Fundamental entry point for all users. Without secure login, the platform is unusable.

**Independent Test**: Can be tested by submitting credentials to `/auth/login/` and receiving a valid JWT access/refresh token pair.

**Acceptance Scenarios**:

1. **Given** a registered user with valid credentials, **When** they submit their email and password, **Then** they receive a JWT access and refresh token, and are redirected to their role-specific dashboard.
2. **Given** a user with incorrect credentials, **When** they attempt to log in, **Then** they see a clear error message "Invalid credentials" (400) and remain on the login page.
3. **Given** an authenticated user, **When** they click "Logout", **Then** their refresh token is blacklisted via `/auth/logout/`, and they are redirected to the landing page.

---

### User Story 2 - Account Registration and Onboarding (Priority: P1)

As a new user, I want to create an account with my specific role so that I can start using the Grow platform.

**Why this priority**: Essential for growing the user base and establishing role-based access.

**Independent Test**: Can be tested by submitting registration data to `/auth/register/` and verifying account creation in the database/profile retrieval.

**Acceptance Scenarios**:

1. **Given** a new Student or Teacher, **When** they provide a unique email, username, and secure password, **Then** an account is created and they are prompted to log in.
2. **Given** a new Parent, **When** they use the quick signup flow, **Then** an account is created and they receive an auth token immediately with `is_first_login` set to `true`.
3. **Given** a user with an existing email, **When** they attempt to register, **Then** they receive a validation error (400).

---

### User Story 3 - Joining a School via Enrollment Code (Priority: P2)

As a Student or Teacher, I want to use an enrollment code provided by my school so that I can access my school's private courses and data.

**Why this priority**: Critical for institutional users to connect to their specific environment.

**Independent Test**: Can be tested by submitting a valid code to `/auth/enrollment-codes/use/` and verifying the user's school membership.

**Acceptance Scenarios**:

1. **Given** an authenticated student/teacher with a valid unused code, **When** they submit the code, **Then** they are successfully enrolled in the associated school.
2. **Given** an invalid or already used code, **When** submitted, **Then** the user receives an error message (400) explaining why the code failed.

---

### User Story 4 - School Administration (Priority: P2)

As a School Admin, I want to create my school profile and manage enrollment codes so that I can onboard my staff and students.

**Why this priority**: Required for school-level management and scaling the platform to new institutions.

**Independent Test**: Can be tested by calling `/auth/school/` to create a school and `/auth/schools/{id}/enrollment-codes/generate/` to create codes.

**Acceptance Scenarios**:

1. **Given** a School Admin who doesn't own a school, **When** they provide a school name, **Then** a new school is created and they are assigned as the owner.
2. **Given** a School Admin, **When** they request a batch of enrollment codes, **Then** a list of unique, single-use codes is generated for their school.
3. **Given** a School Admin, **When** they see an unused code that should no longer be valid, **They** can revoke it permanently.

---

### User Story 5 - Parent-Child Linking (Priority: P3)

As a Parent, I want to link my account to my child's student account so that I can monitor their academic progress.

**Why this priority**: Core value proposition for parents.

**Independent Test**: Can be tested by submitting a valid student ID to `/auth/parent-profile/` and verifying the link.

**Acceptance Scenarios**:

1. **Given** an authenticated Parent, **When** they provide their child's unique Student ID, **Then** their profile is linked to the child.
2. **Given** an invalid Student ID, **When** submitted, **Then** the Parent receives an error (400).

---

### User Story 6 - Social Login Integration (Priority: P3)

As a user, I want to log in using my Google or Facebook account so that I can access the platform quickly without remembering another password.

**Why this priority**: Improves user experience and reduces friction during onboarding.

**Independent Test**: Can be tested by submitting a provider token to `/auth/oauth/` and receiving JWT tokens.

**Acceptance Scenarios**:

1. **Given** a user with a Google/Facebook account, **When** they authenticate via the provider, **Then** they are logged in (or registered as a Parent if the account is new).

---

### User Story 7 - Password Management and Recovery (Priority: P3)

As a user, I want to be able to change my password or recover it if I forget it so that I can maintain access to my account securely.

**Why this priority**: Essential security and recovery feature.

**Independent Test**: Can be tested by the forgot-password/reset-password flow.

**Acceptance Scenarios**:

1. **Given** a user who forgot their password, **When** they submit their email, **Then** they receive a reset link (simulated 200 OK regardless of existence).
2. **Given** a valid reset token, **When** the user submits a new password, **Then** their password is updated.

---

### Edge Cases

- **Rate Limiting**: Users attempting to use enrollment codes or reset passwords too frequently should receive a 429 "Too Many Requests" response.
- **Concurrent Logins**: System should support multiple active sessions per user across different devices.
- **Token Expiry**: When an access token expires (60 min), the frontend MUST transparently use the refresh token to obtain a new access token without interrupting the user.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST support email/password authentication via `/auth/login/`.
- **FR-002**: System MUST support role-based registration for Student, Teacher, Parent, and School Admin via `/auth/register/`.
- **FR-003**: System MUST provide a dedicated Parent signup that returns auth tokens immediately via `/auth/signup/`.
- **FR-004**: System MUST implement JWT token persistence and rotation using access (60m) and refresh (7d) tokens.
- **FR-005**: System MUST allow users to view and update their profile data via `/auth/profile/`.
- **FR-006**: System MUST support social authentication (Google/Facebook) via `/auth/oauth/`.
- **FR-007**: School Admins MUST be able to manage their school identity and enrollment codes.
- **FR-008**: Parents MUST be able to link their profile to exactly one student child (MVP constraint).
- **FR-009**: System MUST enforce role-based access control (RBAC) on all protected endpoints.
- **FR-010**: System MUST handle 500 errors by displaying a generic "Server error" message to the user while logging details internally.

### Key Entities *(include if feature involves data)*

- **User**: Represents any person on the platform. Attributes: email, username, role, first_name, last_name, avatar.
- **School**: An institution on the platform. Attributes: name, school_code, type. Owned by a School Admin.
- **EnrollmentCode**: A single-use alphanumeric code used to link a user to a school.
- **ParentProfile**: Represents the link between a Parent user and a Student user.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of auth endpoints defined in the YAML spec are correctly mapped in the frontend service layer.
- **SC-002**: New users can complete the entire registration and login flow in under 90 seconds.
- **SC-003**: Access token renewal (silent refresh) works without causing UI flicker or session interruption.
- **SC-004**: System correctly handles invalid enrollment codes by providing actionable feedback to the user.
- **SC-005**: Authentication errors (401/403) consistently redirect the user to the appropriate login page.
