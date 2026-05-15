# Tasks: Teacher Dashboard & Settings API Integration

**Input**: Design documents from `/specs/018-teacher-dashboard-api/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

**Tests**: ⚠️ No testing tasks are included per the project Constitution (Principle I: No Testing). All verification will be manual.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Verify existing project structure for dashboard, students, and settings inside `src/features/teacher/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 Update `src/features/teacher/services/teacher.service.ts` to implement real API calls via `apiClient.ts` for dashboard (`GET /api/v1/teacher/dashboard/`), students (`GET /api/v1/teacher/students/`), and settings (`GET/PATCH` for profile and notifications) replacing existing mock timeouts.

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Teacher Dashboard Data Binding (Priority: P1) 🎯 MVP

**Goal**: Bind real-time statistics and classroom performance data to the dashboard.

**Independent Test**: Load the Dashboard page and verify that KPI numbers, top performers list, and recent activity reflect backend API data without visual regressions.

### Implementation for User Story 1

- [x] T003 [US1] Update `src/features/teacher/hooks/useTeacherStats.ts` to properly call the updated service and map the backend `TeacherDashboard` response to the `TeacherStats` interface.
- [x] T004 [US1] Refactor `src/features/teacher/dashboard/TeacherDashboardPage.tsx` to safely render the mapped statistics (KPI cards, top performers, needs review, recent activity) without modifying any UI components or CSS classes.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Student Classroom Management (Priority: P2)

**Goal**: View the full list of enrolled students, their attendance, and performance metrics from the live backend.

**Independent Test**: Navigate to the Students page and verify the list matches the live data, and that existing search/filter logic works seamlessly.

### Implementation for User Story 2

- [x] T005 [US2] Update `src/features/teacher/students/StudentsPage.tsx` to fetch the student roster via `teacherService.getStudents()`, replacing `MOCK_STUDENTS`, while keeping all existing filtering/search logic intact.

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Settings & Profile Management (Priority: P3)

**Goal**: Allow teachers to view and update their personal profile and notification preferences.

**Independent Test**: Change a profile setting (e.g., Name or School) and save it, then refresh the page to see the new values persist via the API.

### Implementation for User Story 3

- [x] T006 [P] [US3] Refactor `src/features/teacher/settings/SettingsPage.tsx` to fetch `TeacherProfile` and `NotificationPreference` data on mount, pre-populating the `formData` and `preferences` state.
- [x] T007 [US3] Implement the "Save Changes" and toggle button logic in `src/features/teacher/settings/SettingsPage.tsx` to call the `PATCH` endpoints via `teacherService.ts`, ensuring read-only fields (like email/school) are excluded from the payload if necessary to prevent 400 errors.

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T008 Review `TeacherDashboardPage.tsx`, `StudentsPage.tsx`, and `SettingsPage.tsx` to guarantee zero unintended visual layout or CSS class modifications occurred during integration.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion.
- **User Stories (Phase 3+)**: All depend on Foundational phase completion. User stories can proceed in parallel or sequentially.
- **Polish (Final Phase)**: Depends on all user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational. No dependencies on other stories.
- **User Story 2 (P2)**: Can start after Foundational. No dependencies on other stories.
- **User Story 3 (P3)**: Can start after Foundational. No dependencies on other stories.

### Parallel Opportunities

- Once Foundational phase completes, all three user stories can be worked on in parallel by different team members because they modify distinct, isolated feature pages (`TeacherDashboardPage.tsx`, `StudentsPage.tsx`, and `SettingsPage.tsx`).

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently on the Teacher Dashboard
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories
