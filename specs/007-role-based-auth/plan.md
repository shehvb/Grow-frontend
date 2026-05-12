# Implementation Plan: Role-Based Authentication

**Branch**: `007-role-based-auth` | **Date**: 2026-05-05 | **Spec**: [spec.md](./spec.md)

## Summary

Implement a secure, role-based authentication system supporting Students, Parents, and Teachers. The frontend will integrate with the backend API using Axios, storing access and refresh tokens locally, and relying on Zustand for reactive, global authentication state and role-based route protection. The system is extended to include comprehensive password management flows (change, forgot, reset), strict API-based logout, profile updates, parent-student linking logic, and school creation/retrieval primarily for Teacher and Admin roles.

## Technical Context

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: React ^19.2.0, Vite, Axios, Zustand, React Router DOM
**Storage**: localStorage for token persistence
**Testing**: Manual acceptance testing only (No automated tests per constitution)
**Target Platform**: Web application
**Project Type**: Frontend application
**Constraints**: Minimal dependencies; clean code; strictly API-driven with secure data handling

## Constitution Check

*GATE: Passed*
- [x] No test frameworks included.
- [x] Tech stack aligns with package.json (React, Vite).
- [x] Zustand chosen for state management.
- [x] No complex redundant dependencies introduced.

## Project Structure

### Documentation (this feature)

```text
specs/007-role-based-auth/
├── plan.md              # This file
├── research.md          # Technical decisions
├── data-model.md        # Interfaces and types
├── quickstart.md        # Setup instructions
└── tasks.md             # Implementation tasks
```

### Source Code

```text
src/
├── services/
│   └── apiClient.ts     # Axios instance and interceptors
│   └── authApi.ts       # API call wrappers (extended with password, profile, school logic)
├── store/
│   └── authStore.ts     # Zustand store (handles core session + profile state)
├── components/
│   └── auth/
│       └── ProtectedRoute.tsx # Route wrapper
```

**Structure Decision**: Integrated directly into the existing React frontend structure (`src/services`, `src/store`, `src/components`), extending existing stores and services cleanly to avoid duplicated API layers.
