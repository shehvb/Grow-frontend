# Implementation Plan: Grow Learning Platform — Platform Features

**Branch**: `004-platform-features` | **Date**: 2025-03-16 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `specs/004-platform-features/spec.md`

## Summary

Implement the frontend architecture and UI for the Grow Learning Platform: a gamified, AI-powered educational web app with distinct Student and Parent experiences. The plan follows spec-driven development and uses a **first slice** focused on the **Student Courses** experience (course catalog with filter bar, responsive grid, course cards with progress). Foundation includes global layout (sidebar, topbar), mock data strategy, and modular component structure. Tech stack aligns with repository `package.json` (Vite, React 19, Tailwind 3.4); additional dependencies (e.g. component library, state, charts) are added only when justified under the constitution’s Minimal Dependencies principle. Design follows the Figma design system; no automated tests (constitution).

## Technical Context

**Language/Version**: TypeScript ~5.9 (per package.json)  
**Primary Dependencies**: React ^19.2.0, react-router-dom ^7.13.1, Tailwind CSS ^3.4.0, Vite (rolldown-vite). Optional/add as needed: component library (e.g. shadcn/ui), Zustand (state), Recharts (charts)—each must be justified per Minimal Dependencies.  
**Storage**: None for frontend-only slice; mock data in `src/mock/` (e.g. `courses.mock.ts`, `instructors.mock.ts`). Backend integration later.  
**Testing**: None — constitution forbids unit, integration, and e2e tests.  
**Target Platform**: Web (modern browsers); responsive (mobile, tablet, desktop).  
**Project Type**: Single-page web application (frontend).  
**Performance Goals**: Fast initial load; lazy rendering for course cards where beneficial; smooth interactions.  
**Constraints**: UI must follow Figma design system; stack versions from package.json; minimal new dependencies; responsive and accessible.  
**Scale/Scope**: Student and Parent roles; multiple feature areas (dashboard, courses, quiz, tasks, AI tutor, analytics, attendance, reports, settings); first implementation slice = Courses page + global layout + mock data.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **No test frameworks or test tasks** — Plan contains no test tasks or test tooling.
- **Stack matches package.json** — Vite, React ^19.2.0, Tailwind ^3.4.0, react-router-dom; any new deps (e.g. Zustand, shadcn/ui, Recharts) added only when necessary and documented.
- **Clean code, simple UX, responsive/accessible** — Modular components, clear layout, responsive grid and breakpoints; basic a11y support.
- **Component-based, design system, feature isolation** — Features under `src/features/*`; shared UI under `src/components`; layout under `src/layouts`.
- **State management** — Zustand or similar lightweight solution when shared state is needed; local state in components where possible.
- **Performance** — Lazy rendering for course cards considered; animations/UI polish in later phase.
- **Spec-driven workflow** — This plan is derived from spec.md; tasks will be generated via `/speckit.tasks` and implementation follows that list.

**Post–Phase 1**: Re-verify no test tasks introduced; structure and stack remain compliant.

## Project Structure

### Documentation (this feature)

```text
specs/004-platform-features/
├── plan.md              # This file
├── research.md          # Phase 0
├── data-model.md        # Phase 1
├── quickstart.md        # Phase 1
├── contracts/           # Phase 1 (data/UI contracts for backend integration)
└── tasks.md             # Phase 2 (/speckit.tasks — not created by this command)
```

### Source Code (repository root)

```text
src/
├── components/          # Shared layout and UI
│   ├── layout/
│   │   ├── PageContainer.tsx
│   │   ├── Topbar.tsx
│   │   └── Sidebar.tsx
│   └── ui/              # Reusable UI primitives (e.g. ProgressBar, FilterBar, CourseCard)
│       ├── FilterBar.tsx
│       ├── ProgressBar.tsx
│       └── CourseCard.tsx
├── features/
│   ├── dashboard/
│   ├── courses/
│   │   ├── CoursesPage.tsx
│   │   ├── CoursesGrid.tsx
│   │   ├── CourseCard.tsx
│   │   └── courseFilters.ts
│   ├── quiz/
│   ├── tasks/
│   ├── ai/
│   ├── analytics/
│   └── reports/
├── layouts/
│   └── StudentLayout.tsx
├── hooks/
│   └── useCourses.ts
├── services/
│   └── courseService.ts
├── mock/
│   ├── courses.mock.ts
│   ├── instructors.mock.ts
│   └── progress.mock.ts
├── pages/
├── App.tsx
└── main.tsx
```

**Structure Decision**: Single frontend project at repo root. Feature folders under `src/features/` for dashboard, courses, quiz, tasks, ai, analytics, reports. Shared layout and UI in `src/components/layout` and `src/components/ui`. Mock data in `src/mock/` until backend is connected. No `tests/` directory (constitution).

## Implementation Phases (First Slice: Courses + Layout)

| Phase | Focus | Key deliverables |
|-------|--------|-------------------|
| **1** | Setup | Project structure, dependencies (Tailwind, routing), optional component library (e.g. shadcn/ui) and Tailwind config. |
| **2** | Global layout | Sidebar (Dashboard, Courses, Tasks, AI Tutor, Settings), Topbar, StudentLayout. |
| **3** | Courses page layout | Courses page, filter bar (All / In Progress / Completed), responsive courses grid (mobile 1 col, tablet 2, desktop 4). |
| **4** | Course cards + mock data | CourseCard (title, instructor, progress bar, completion %), mock courses/instructors/progress; integrate into grid. |
| **5** | Filter logic | Connect filter bar to course data; filter by status (All, In Progress, Completed). |
| **6** | Polish | Responsiveness verification, animations/UI polish, basic accessibility. |

## Data Strategy

- **Phase 1 (current)**: Mock data in `src/mock/`. Files such as `courses.mock.ts`, `instructors.mock.ts`, `progress.mock.ts` simulate backend shapes so components can be wired to real APIs later without structural change.
- **Phase 2 (later)**: Backend/MCP integration; replace mock reads with service calls; keep contracts in `specs/004-platform-features/contracts/`.

## Design Source

Figma design system and layout specifications. All UI must align with the provided Figma (spacing, typography, colors, components).

## Quality Requirements

- **Maintainability**: Modular component structure; clear separation between layout, features, and shared UI.
- **Performance**: Lazy rendering for course cards where it improves perceived performance.
- **Accessibility**: Basic a11y support (semantic markup, focus, labels).
- **Responsive design**: Required; breakpoints as specified (e.g. 1/2/4 columns for courses grid).

## Complexity Tracking

No constitution violations. Optional additions (Zustand, shadcn/ui, Recharts) will be evaluated per Minimal Dependencies when their features are implemented.
