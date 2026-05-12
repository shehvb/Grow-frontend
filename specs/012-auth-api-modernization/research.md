# Research: Auth API Modernization

## Decisions & Rationale

### 1. Parent-Specific Signup Flow
- **Decision**: Implement a separate `signup` method in `authApi` and `authStore` for Parents.
- **Rationale**: The backend `POST /auth/signup/` returns tokens immediately (unlike `/auth/register/`), requiring different handling in the Zustand store to auto-login the parent upon success.

### 2. Enrollment Code Management
- **Decision**: Create a new `AdminEnrollmentService` or extend `authApi` for code generation/revocation.
- **Rationale**: These are school-admin specific actions that shouldn't clutter the generic `authApi` but are part of the auth domain.

### 3. OAuth Integration
- **Decision**: Use `@react-oauth/google` for the frontend SDK and send the resulting `access_token` to `POST /auth/oauth/`.
- **Rationale**: Industry standard for Google login. Backend handles the user creation/retrieval.

### 4. Silent Token Refresh
- **Decision**: Maintain current Axios interceptor logic.
- **Rationale**: Existing implementation in `apiClient.ts` correctly handles 401s and token rotation.

## Alternatives Considered

- **Single Signup Endpoint**: Rejected because the backend specifically provides a high-conversion `/auth/signup/` for parents that bypasses the manual login step.
- **Polling for Codes**: Rejected in favor of direct batch generation as per API spec.

## Open Questions (NEEDS CLARIFICATION)
- **None**: All endpoints and schemas are fully detailed in the provided YAML documentation.
