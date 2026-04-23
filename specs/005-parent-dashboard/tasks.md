# Tasks: Parent Dashboard System

**Input**: Design documents from `/specs/005-parent-dashboard/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create `ParentDashboard` folder structure in `src/components/`, `src/pages/`, `src/store/`, `src/services/`
- [ ] T002 [P] Install `zustand` if not already installed via package.json
- [ ] T003 [P] Add mock data file `src/mockData/parentDashboard.ts` based on `quickstart.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T004 Setup `parentDashboardStore.ts` in `src/store/` with Zustand (global dropdown selector state)
- [ ] T005 [P] Setup base API service `parentApi.ts` in `src/services/` with mock responses
- [ ] T006 [P] Create `StudentSelector.tsx` component in `src/components/ParentDashboard/`
- [ ] T007 Create `ParentDashboard.tsx` page in `src/pages/` orchestrating the selector

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Track Academic Progress and Analytics (Priority: P1) 🎯 MVP

**Goal**: View child's academic progress, performance analytics, and attendance

**Independent Test**: Parent logs in, sees summary of overall grades, attendance, and analytics trends.

### Implementation for User Story 1

- [ ] T008 [P] [US1] Create frontend types for `Student`, `CourseGrade`, `QuizScore`, `AttendanceRecord` in `src/types/parentDashboard.ts`
- [ ] T009 [US1] Implement `/api/parents/{parentId}/students` in `src/services/parentApi.ts`
- [ ] T010 [US1] Implement `/api/students/{studentId}/dashboard-summary` core fields (grades, quizzes, attendance) in `src/services/parentApi.ts`
- [ ] T011 [P] [US1] Create `AcademicProgressWidget.tsx` in `src/components/ParentDashboard/`
- [ ] T012 [P] [US1] Create `AttendanceWidget.tsx` in `src/components/ParentDashboard/`
- [ ] T013 [US1] Integrate widgets into `src/pages/ParentDashboard.tsx` layout and connect to `parentDashboardStore`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Automated Reporting (Priority: P2)

**Goal**: Access and download structured weekly and monthly reports.

**Independent Test**: Parent triggers report generation and verifies downloaded report.

### Implementation for User Story 2

- [ ] T014 [US2] Implement `/api/students/{studentId}/reports` endpoint in `src/services/parentApi.ts`
- [ ] T015 [P] [US2] Add UI button and logic for triggering report generation in `src/pages/ParentDashboard.tsx`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - AI-Generated Insights (Priority: P3)

**Goal**: Receive AI-generated insights about child's performance.

**Independent Test**: Verify text-based insights appear in dashboard based on student data.

### Implementation for User Story 3

- [ ] T016 [P] [US3] Create frontend type for `AIInsight` in `src/types/parentDashboard.ts`
- [ ] T017 [US3] Extend `/api/students/{studentId}/dashboard-summary` mock response with `latestInsight` in `src/services/parentApi.ts`
- [ ] T018 [P] [US3] Create `AIInsightsWidget.tsx` in `src/components/ParentDashboard/`
- [ ] T019 [US3] Integrate `AIInsightsWidget.tsx` into `src/pages/ParentDashboard.tsx` layout

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T020 [P] Ensure Tailwind CSS styling matches design system across all widgets
- [ ] T021 [P] Verify responsive design on mobile for the dashboard layout
- [ ] T022 Manual acceptance testing of overall dashboard performance

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2)
- **User Story 2 (P2)**: Integrates into US1 Dashboard layout
- **User Story 3 (P3)**: Integrates into US1 Dashboard layout

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Models and Services within a story marked [P] can run in parallel
- Widget UI components (`AcademicProgressWidget`, `AttendanceWidget`, `AIInsightsWidget`) can be built in parallel.

---

## Parallel Example: User Story 1

```bash
# Launch building independent UI widgets together
Task: "Create AcademicProgressWidget.tsx in src/components/ParentDashboard/"
Task: "Create AttendanceWidget.tsx in src/components/ParentDashboard/"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
