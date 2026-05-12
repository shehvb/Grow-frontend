# Implementation Plan: Modernize and synchronize Auth API integration

**Branch**: `012-auth-api-modernization` | **Date**: 2026-05-12 | **Spec**: [spec.md](file:///c:/Users/shehab/OneDrive/Desktop/GROW%20before%20implementation1/GROW%20before%20implementation/Grow-frontend/specs/012-auth-api-modernization/spec.md)
**Input**: Feature specification from `/specs/012-auth-api-modernization/spec.md`

## Summary

The goal is to modernize the Grow platform's authentication system by synchronizing the frontend with the latest OpenAPI documentation. This includes implementing missing endpoints (Parent Signup, School Admin code management), enhancing security (password reset flows), and ensuring robust role-based access control (RBAC) across Student, Teacher, Parent, and Admin portals.

## Technical Context

**Language/Version**: TypeScript 5+, React 19.2.0  
**Primary Dependencies**: Axios, Zustand, React Router, React Hot Toast  
**Storage**: Browser LocalStorage (JWT persistence)  
**Testing**: Manual Acceptance (Principle I: No Testing)  
**Target Platform**: Responsive Web  
**Project Type**: Web application frontend  
**Performance Goals**: Silent token refresh < 500ms, Auth flows < 2s  
**Constraints**: 60m access token expiry, 7d refresh token expiry  
**Target URL**: https://ahmeddali.pythonanywhere.com/api/v1
**Environment Variables**: Ensure `VITE_API_URL` is set to `https://ahmeddali.pythonanywhere.com/api/v1`.
**Scale/Scope**: Auth services, Login/Signup components, Admin tools

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

1. **No Testing**: ✅ No unit/integration/e2e tests planned.
2. **Stack Versions**: ✅ React 19.2.0, Vite, Tailwind.
3. **Clean State**: ✅ Using Zustand (`authStore.ts`).
4. **Component-Based**: ✅ Self-contained auth components.
5. **Spec-Driven**: ✅ Following `/specify` -> `/plan`.

## Project Structure

### Documentation (this feature)

```text
specs/012-auth-api-modernization/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
src/
├── components/
│   └── auth/            # Auth UI components (Login, Signup, ForgotPass)
├── services/
│   ├── authApi.ts       # API service layer (Endpoints)
│   └── apiClient.ts     # Axios instance & interceptors (JWT logic)
├── store/
│   └── authStore.ts     # Zustand auth state (user, tokens)
├── types/
│   └── auth.ts          # TypeScript interfaces for API schemas
└── features/
    └── admin/           # Admin-specific auth management (Codes)
```

**Structure Decision**: Single project structure (Default) using existing feature-based organization.

## Complexity Tracking

*No violations identified.*
