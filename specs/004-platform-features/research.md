# Research: Grow Learning Platform — Platform Features

**Feature**: 004-platform-features  
**Date**: 2025-03-16  
**Purpose**: Resolve technical unknowns and document decisions for the implementation plan.

## 1. Frontend stack and dependencies

**Decision**: Use Vite, React 19, Tailwind 3.4, and react-router-dom as declared in `package.json`. Add a component library (e.g. shadcn/ui), Zustand, and Recharts only when a concrete feature needs them; evaluate each against Minimal Dependencies.

**Rationale**: Constitution requires stack versions from package.json and minimal dependencies. The repo already has Bootstrap and react-icons; for the Courses slice, Tailwind + existing deps may suffice for layout and cards. When dashboard widgets, charts, or shared state appear, introduce Zustand and/or Recharts and document justification. shadcn/ui can be added if Figma alignment and consistency are easier with a shared component set.

**Alternatives considered**: Adding all of shadcn/ui, Zustand, and Recharts up front was considered but rejected to avoid unnecessary dependency growth until features require them.

---

## 2. Mock data strategy

**Decision**: Mock data lives in `src/mock/` with files such as `courses.mock.ts`, `instructors.mock.ts`, and `progress.mock.ts`. Shapes mirror expected backend/DTO structures (id, title, instructor, progress, status, etc.) so that swapping to API calls later does not force component redesign.

**Rationale**: Enables development of Courses page, CourseCard, and filters without a backend; keeps data layer replaceable.

**Alternatives considered**: Inline hardcoded data in components was rejected for maintainability and to keep a single place to replace with API calls.

---

## 3. Course list filtering (All / In Progress / Completed)

**Decision**: Filter by course status (or derived completion) on the client. Status or completion percentage determines “In Progress” vs “Completed”; “All” shows every course. Filter state is local to the Courses page or a small store (e.g. Zustand) if needed elsewhere.

**Rationale**: Matches spec and user-provided filter bar design; simple and sufficient for the first slice.

**Alternatives considered**: Server-side filtering deferred until backend integration (Phase 2).

---

## 4. Responsive grid breakpoints

**Decision**: Courses grid uses responsive columns: 1 column on mobile, 2 on tablet, 4 on desktop. Exact breakpoints follow Tailwind defaults or Figma (e.g. sm/md/lg) and are documented in the component/layout that implements the grid.

**Rationale**: Aligns with user plan and constitution (responsive design required).

**Alternatives considered**: Fixed columns rejected for accessibility and multi-device use.

---

## 5. Layout and navigation

**Decision**: Global layout includes a left sidebar (Dashboard, Courses, Tasks, AI Tutor, Settings) and a topbar. Student-facing routes use a `StudentLayout` that composes sidebar + topbar + main content. Routing uses react-router-dom; route list and nav items stay in sync.

**Rationale**: Matches user plan and spec (role-based entry, clear navigation). Single layout component keeps structure consistent and easier to change.

**Alternatives considered**: Separate layouts per feature were rejected for this slice in favor of one student layout to avoid duplication.

---

## 6. Design system (Figma) alignment

**Decision**: Use the provided Figma as the source of truth for spacing, typography, colors, and key components. Implement ProgressBar, CourseCard, and FilterBar to match Figma; use design tokens (Tailwind theme) where possible so updates are centralized.

**Rationale**: Constitution and spec require design system consistency; Figma is the reference.

**Alternatives considered**: Ad-hoc styling rejected to keep the app consistent and maintainable.

---

## 7. Performance (lazy rendering)

**Decision**: Consider lazy rendering or virtualization for the course list only if the number of course cards is large enough to cause jank (e.g. dozens of cards). For the first slice with mock data, a simple grid is acceptable; document “lazy rendering for course cards” as a follow-up if needed.

**Rationale**: Constitution (Performance First) and user plan mention lazy rendering; avoid premature optimization until card count justifies it.

**Alternatives considered**: Adding virtualization from day one was rejected to keep the first slice simple.

---

## Summary

All technical unknowns for the current slice are resolved. Mock data in `src/mock/`, filter logic on the client, responsive grid, single StudentLayout with sidebar + topbar, and Figma-aligned components form the basis for Phase 1 design and implementation. No test frameworks or test tasks are introduced (constitution).
