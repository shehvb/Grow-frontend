# Tasks: Parent Portal Backend API Integration

**Input**: Design documents from `/specs/024-parent-api-integration/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Tests**: No test tasks are generated. As dictated by the GROW Constitution Principle I, unit, integration, and e2e testing frameworks are strictly prohibited.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Configure base parent store state properties inside `src/store/parentStore.ts`
- [ ] T002 Add TypeScript types for `ParentLinkRequest` and 12-month historical models inside `src/types/parent.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T003 [P] Refactor the fetch helper `fetchWithAuth` in `src/services/parentApi.ts` to handle auth headers and status responses cleanly
- [ ] T004 Create a helper mapping function inside `src/services/parentApi.ts` to cleanly spread and merge mock fallbacks for safe response parsing

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Linking & Verification of Students (Priority: P1) 🎯 MVP

**Goal**: Parents link children via `POST /api/v1/parent/add-student/`

**Independent Test**: Linking triggers a `ParentLinkRequest` payload and handles 400/404 mismatch errors safely with zero application crashes.

### Implementation for User Story 1

- [ ] T005 [P] [US1] Create the POST endpoint integration for `addStudent` inside `src/services/parentApi.ts`
- [ ] T006 [US1] Implement linking submit handlers and dynamic validation messages inside the add student component at `src/features/parent/add-student/AddStudentPage.tsx`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently.

---

## Phase 4: User Story 2 - Real-Time Dashboard Summary & Metrics (Priority: P1)

**Goal**: Selecting active students drives GPA, XP, study hours, AI insights, and Missing Assignments alert widgets.

**Independent Test**: Switching students in the roster updates the dashboard state immediately.

### Implementation for User Story 2

- [ ] T007 [P] [US2] Update `getDashboardSummary` in `src/services/parentApi.ts` to fetch live data from `/api/v1/parent/dashboard/{student_id}/`
- [ ] T008 [US2] Wire the active selection action `selectStudent` in `src/store/parentStore.ts` to load live dashboard summary state

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently.

---

## Phase 5: User Story 3 - Academic Trends & Monthly History (Priority: P2)

**Goal**: Area chart toggles dynamically between weekly progress and 12-month monthly progression history.

**Independent Test**: Monthly view displays all 12 calendar months with accurate percentage scales.

### Implementation for User Story 3

- [ ] T009 [P] [US3] Add 12-month GPA trend mapping arrays to `getDashboardSummary` response in `src/services/parentApi.ts`
- [ ] T010 [US3] Update the trend chart state selection inside `src/features/parent/AnalyticsPage.tsx` to handle the monthly series

**Checkpoint**: At this point, User Stories 1, 2, and 3 should work independently.

---

## Phase 6: User Story 4 - Detailed Attendance Calendar (Priority: P2)

**Goal**: Renders full daily attendance logs and streaks on the grid.

**Independent Test**: Calendar highlights Completed, Missed, or Extra Credit status for each date cell.

### Implementation for User Story 4

- [ ] T011 [P] [US4] Bind the daily calendar record response in `src/services/parentApi.ts`
- [ ] T012 [US4] Update calendar grid rendering in `src/features/parent/AttendancePage.tsx`

**Checkpoint**: All user stories up to 4 should now be independently functional.

---

## Phase 7: User Story 5 - Comprehensive Academic Reports (Priority: P3)

**Goal**: Gradebook breakdown and assignment tracking render accurately.

**Independent Test**: Report metrics render letter grades, overall average, and late submissions.

### Implementation for User Story 5

- [ ] T013 [P] [US5] Update `getReports` integration in `src/services/parentApi.ts` to fetch and map detailed subject data
- [ ] T014 [US5] Wire the gradebook datasets inside `src/features/parent/ParentReportsPage.tsx`

**Checkpoint**: All user stories should now be independently functional.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T015 Perform a full visual review across the dashboard, analytics, attendance, reports, settings, and link pages to verify zero visual layout regression
- [ ] T016 Verify successful production build with zero warnings or unused imports using terminal commands in `c:\Users\shehab\OneDrive\Desktop\GROW before implementation1\GROW before implementation\Grow-frontend`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2)
- **User Story 3 (P3)**: Can start after Foundational (Phase 2)

---

## Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Models/types within a story marked [P] can run in parallel

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories
