# Implementation Plan: Parent Portal Backend API Integration

**Branch**: `024-parent-api-integration` | **Date**: 2026-05-18 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/024-parent-api-integration/spec.md`

## Summary

This feature integrates all views, state stores, and service layers of the Parent Portal with the real backend Django APIs defined in `Grow Educational Platform API.yaml`. By shifting state management from static local mock data inside `parentApi.ts` to active network calls driven by authenticated tokens, parents will be able to link children, monitor real-time dashboards, trace 12-month GPA metrics, check attendance histories, and analyze academic grade tables.

The technical approach preserves all high-fidelity premium designs (including the custom "Missing Assignments" alert card and the reports icon layouts) by keeping styling completely unchanged while binding data gracefully with robust fallback mechanisms for missing backend fields.

## Technical Context

**Language/Version**: TypeScript 5.x / JavaScript ES6+  
**Primary Dependencies**: React 19.x, Zustand (State Management), Axios/Fetch API (Network Calls)  
**Storage**: Web storage (localStorage for auth tokens)  
**Testing**: None (Strictly prohibited by Constitution Principle I)  
**Target Platform**: Modern web browsers (Responsive viewport layout)  
**Project Type**: React Web SPA (Vite + React + Tailwind)  
**Performance Goals**: Dynamic state loading under 200ms upon child selection; fast network requests under 1 second.  
**Constraints**: Zero UI layout structural changes; merge live data safely with mock-fallback structures.  
**Scale/Scope**: Covers 5 primary views (Dashboard, Analytics, Attendance, Reports, Settings) plus the Add Student link form.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **No Testing Gate**: Passed. The plan includes absolutely no unit, integration, or e2e tests or testing frameworks.
- **Stack Version Gate**: Passed. Utilizes the declared versions in `package.json` (React 19, Vite, Tailwind).
- **Zustand State Gate**: Passed. Driven entirely through state mapping in `src/store/parentStore.ts` and the unified service in `src/services/parentApi.ts`.
- **Aesthetic Gate**: Passed. Locking UI rendering to current implementation ensures no visual regressions.

## Project Structure

### Documentation (this feature)

```text
specs/024-parent-api-integration/
├── spec.md              # Feature specification
├── plan.md              # This file (Implementation Plan)
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
└── quickstart.md        # Phase 1 output
```

### Source Code Layout

```text
src/
├── features/
│   └── parent/          # Parent Portal views & components
│       ├── components/  # Layout metric widgets and charts
│       ├── AnalyticsPage.tsx
│       ├── AttendancePage.tsx
│       ├── ParentDashboardPage.tsx
│       ├── ParentReportsPage.tsx
│       └── SettingsPage.tsx
├── services/
│   └── parentApi.ts     # Parent Service layer (to be refactored)
├── store/
│   └── parentStore.ts   # Parent Zustand store (to be refactored)
└── mock/
    └── parent.mock.ts   # Fallback mock data
```

**Structure Decision**: Refactor in-place inside `src/services/parentApi.ts` and `src/store/parentStore.ts` to seamlessly swap mock data generation with authenticated endpoint requests.

## Complexity Tracking

*No violations of the GROW Constitution are present.*
