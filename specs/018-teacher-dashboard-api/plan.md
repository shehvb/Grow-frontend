# Implementation Plan: Teacher Dashboard & Settings API Integration

**Branch**: `018-teacher-dashboard-api` | **Date**: 2026-05-15 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/018-teacher-dashboard-api/spec.md`

## Summary

This plan outlines the technical approach to replace remaining mock data in the Teacher Portal (Dashboard, Students List, Settings) with live API calls. The integration will rely on updates to the existing `teacher.service.ts` to map frontend components to the backend schema defined in `Grow Educational Platform API.yaml`, with strict adherence to preserving the existing UI exactly as it is.

## Technical Context

**Language/Version**: TypeScript / React ^19.2.0
**Primary Dependencies**: Axios (via existing `apiClient.ts`), Zustand (if used for teacher state, otherwise local component state)
**Storage**: N/A
**Testing**: N/A (per Constitution Principle I: No Testing)
**Target Platform**: Web Browser
**Project Type**: Frontend React Web Application
**Performance Goals**: Fast UI updates, immediate re-rendering of charts and lists upon fetch.
**Constraints**: Zero UI changes. The visual layout, CSS classes, and component structures must remain exactly as implemented.
**Scale/Scope**: Integrating 5 primary endpoints (`/dashboard/`, `/students/`, `/settings/profile/` [GET/PATCH], `/settings/notifications/` [GET/PATCH]).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **No Testing**: No unit, integration, or e2e tests are included in the plan.
- [x] **Stack Versions**: Uses React ^19.2.0 and Tailwind ^3.4.0.
- [x] **Clean Code & Simple UX**: State mappings will be isolated within the service layer and hooks to keep components clean. No UI changes ensures UX remains simple.
- [x] **Minimal Dependencies**: Will use the existing `apiClient` without introducing new libraries.
- [x] **Component-Based Architecture**: Maintains existing component structure.
- [x] **Spec-Driven Development**: Plan is derived directly from the generated spec.

## Project Structure

### Documentation (this feature)

```text
specs/018-teacher-dashboard-api/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
└── tasks.md             # Phase 2 output (future)
```

### Source Code (repository root)

```text
src/
└── features/
    └── teacher/
        ├── dashboard/
        │   └── TeacherDashboardPage.tsx
        ├── students/
        │   └── StudentsPage.tsx
        ├── settings/
        │   └── SettingsPage.tsx
        ├── hooks/
        │   └── useTeacherStats.ts
        └── services/
            └── teacher.service.ts
```

**Structure Decision**: The project structure will remain unchanged. Edits will be strictly limited to the `features/teacher/` module, specifically updating the service layer and data bindings in the respective pages and hooks.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

*No violations detected. No complexity tracking needed.*
