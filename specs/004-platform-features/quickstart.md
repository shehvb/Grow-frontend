# Quickstart: 004-platform-features

**Branch**: `004-platform-features`  
**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

## Prerequisites

- Node.js (version that supports the project’s engines)
- Repository root: `package.json` has React 19, Vite, Tailwind, react-router-dom

## Run the app

From repository root:

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (e.g. http://localhost:5173).

## First slice: Student Courses

1. **Layout**: Ensure global layout exists—sidebar (Dashboard, Courses, Tasks, AI Tutor, Settings) and topbar. Student routes render inside this layout.
2. **Courses page**: Route for the student courses list (e.g. `/courses`). Page shows filter bar (All / In Progress / Completed) and a responsive grid of course cards.
3. **Mock data**: Add or extend `src/mock/courses.mock.ts` and `src/mock/instructors.mock.ts` (and optionally `progress.mock.ts`) so each course has id, title, instructor, progress, and status. Use shapes from [data-model.md](./data-model.md) and [contracts/courses-api.md](./contracts/courses-api.md).
4. **CourseCard**: Each card shows subject title, instructor name, progress bar, and completion percentage; click navigates to course detail (or placeholder). Style per Figma.
5. **Filter**: Wire filter bar to course list so “All” / “In Progress” / “Completed” filter the displayed cards.

## Key paths (from plan)

| Area | Path |
|------|------|
| Courses feature | `src/features/courses/` |
| Shared layout | `src/components/layout/` (Sidebar, Topbar, PageContainer) |
| Shared UI | `src/components/ui/` (ProgressBar, FilterBar, CourseCard) |
| Mock data | `src/mock/` |
| Student layout | `src/layouts/StudentLayout.tsx` |

## Design

Follow the Figma design system for spacing, typography, colors, and components. Progress bar and course cards should match the design.

## No tests

Per project constitution, do not add unit, integration, or e2e tests. Verify manually.

## Next

After the Courses slice is done: dashboard (US1), then course detail page, quiz, tasks, AI tutor, and parent flows per [spec.md](./spec.md) and [plan.md](./plan.md). Generate tasks with `/speckit.tasks` when ready.
