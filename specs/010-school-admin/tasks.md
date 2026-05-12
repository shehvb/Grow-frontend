---
description: "Task list for School Admin Module implementation"
---

# Tasks: School Admin Module

**Input**: Design documents from `/specs/010-school-admin/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md
**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create admin feature folder structure in `src/features/admin`
- [x] T002 [P] Create empty component files for dashboard in `src/features/admin/components/dashboard`
- [x] T003 [P] Create empty component files for class-details in `src/features/admin/components/class-details`
- [x] T004 [P] Create empty component files for reports in `src/features/admin/components/reports`
- [x] T005 [P] Create empty page files in `src/features/admin/pages`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T006 Create the central mock data store in `src/features/admin/admin.mock.ts` defining SchoolKPIs, Alerts, ClassSummaries, Students, and Teachers according to `data-model.md`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Dashboard Monitoring (Priority: P1) 🎯 MVP

**Goal**: As a School Admin, I want to view a high-level dashboard with KPIs and alerts.

**Independent Test**: Can be tested by loading the `AdminDashboardPage` component and verifying KPI accuracy and alert visibility.

### Implementation for User Story 1

- [x] T007 [P] [US1] Implement `KPIStats` component in `src/features/admin/components/dashboard/KPIStats.tsx` using mock data
- [x] T008 [P] [US1] Implement `ClassGrid` component in `src/features/admin/components/dashboard/ClassGrid.tsx` using mock data
- [x] T009 [P] [US1] Implement `AlertsSidebar` component in `src/features/admin/components/dashboard/AlertsSidebar.tsx` displaying max 10 alerts
- [x] T010 [US1] Assemble `AdminDashboardPage` in `src/features/admin/pages/AdminDashboardPage.tsx` using the above components

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Class Deep Dive (Priority: P2)

**Goal**: As a School Admin, I want to click on a specific class to see its detailed metrics, top performers, student statuses, and assigned teachers.

**Independent Test**: Can be tested by directly navigating to `ClassDetailsPage` with a mock class ID and verifying the data matches.

### Implementation for User Story 2

- [x] T011 [P] [US2] Implement `TopPerformers` component in `src/features/admin/components/class-details/TopPerformers.tsx`
- [x] T012 [P] [US2] Implement `StudentStatusSidebar` component in `src/features/admin/components/class-details/StudentStatusSidebar.tsx`
- [x] T013 [P] [US2] Implement `AssignedTeachersGrid` component in `src/features/admin/components/class-details/AssignedTeachersGrid.tsx`
- [x] T014 [US2] Assemble `ClassDetailsPage` in `src/features/admin/pages/ClassDetailsPage.tsx` using the above components and integrating navigation back to dashboard

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Report Generation (Priority: P3)

**Goal**: As a School Admin, I want to configure and generate detailed reports for students, teachers, or classes across different timeframes.

**Independent Test**: Can be tested by navigating to `ReportsAnalyticsPage`, selecting parameters, and validating the 'Generate Report' button interaction.

### Implementation for User Story 3

- [x] T015 [P] [US3] Implement `ReportConfigurationForm` in `src/features/admin/components/reports/ReportConfigurationForm.tsx` handling internal form state
- [x] T016 [US3] Assemble `ReportsAnalyticsPage` in `src/features/admin/pages/ReportsAnalyticsPage.tsx`
- [x] T017 [US3] Add mock download logic to handle the 'Generate Report' click action

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T018 Integrate the new admin pages into the main application router (e.g., `App.tsx` or main router file)
- [x] T019 Ensure responsive design for sidebars and grids on mobile/tablet views across all pages

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
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - No dependencies on other stories

### Parallel Opportunities

- All Setup directory creation tasks marked [P] can run in parallel
- Component implementations within each User Story phase marked [P] can run in parallel (e.g., `KPIStats`, `ClassGrid`, `AlertsSidebar`)
- Different user stories can be worked on in parallel by different team members

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Verify Dashboard visually
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories
