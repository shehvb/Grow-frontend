# Tasks: Teacher Portal API Integration (Phase 2)

**Input**: Design documents from `/specs/017-teacher-portal-phase-2/`
**Prerequisites**: plan.md (required), spec.md (required), data-model.md, research.md, quickstart.md

**Tests**: Verification is manual per the **No Testing** principle in the project constitution.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create feature directory structure in `src/features/teacher/`
- [x] T002 [P] Initialize new service files in `src/services/`
- [x] T003 [P] Initialize new store files in `src/store/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T004 Implement base `assignmentService.ts` with Axios client configuration
- [x] T005 Implement base `studentService.ts` with Axios client configuration
- [x] T006 [P] Define TypeScript interfaces for Assignments, Submissions, and Grades in `src/types/assignment.ts`
- [x] T007 Setup `useAssignmentStore.ts` using Zustand for state management
- [x] T008 Setup `useStudentStore.ts` using Zustand for state management

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Assignment Management & Grading (Priority: P1) 🎯 MVP

**Goal**: Enable teachers to create assignments, link them to courses, and grade student submissions with file previews.

**Independent Test**: Create an assignment for an existing course, verify it appears in the list, and then open the grading modal for a student submission to successfully post a grade.

### Implementation for User Story 1

- [x] T009 [P] [US1] Implement Assignment CRUD methods in `src/services/assignmentService.ts` (List, Create, Update, Delete)
- [x] T010 [US1] Implement `useAssignmentStore` actions for fetching and managing assignments
- [x] T011 [US1] Create the standalone Assignments List page in `src/features/teacher/assignments/pages/AssignmentsPage.tsx`
- [x] T012 [US1] Create the Assignment Editor page in `src/features/teacher/assignments/pages/AssignmentEditorPage.tsx`
- [x] T013 [US1] Implement course selection dropdown in `AssignmentEditorPage` fetching from `courseService.listCourses()`
- [x] T014 [US1] Implement Submission Review list component in `src/features/teacher/assignments/components/SubmissionList.tsx`
- [x] T015 [US1] Add file **Download** and **Preview** (iframe/img modal) logic to the submission list
- [x] T016 [US1] Create the manual Grading interface in `src/features/teacher/assignments/components/GradingInterface.tsx`
- [x] T017 [US1] Integrate grading submission API (`/submissions/{id}/grade/`) in `assignmentService.ts`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently.

---

## Phase 4: User Story 2 - Global Student Management & Profile (Priority: P2)

**Goal**: Provide a global view of all enrolled students and management of teacher profile/settings.

**Independent Test**: Navigate to the Students page and verify all unique students are listed. Update profile info and confirm changes persist on refresh.

### Implementation for User Story 2

- [x] T018 [P] [US2] Implement `getTeacherStudents` in `src/services/studentService.ts` using `/api/v1/teacher/students/`
- [x] T019 [P] [US2] Implement profile and notification endpoints in `src/services/teacherService.ts`
- [x] T020 [US2] Implement `useStudentStore` actions for the global student list
- [x] T021 [US2] Create the Global Student Dashboard page in `src/features/teacher/students/pages/StudentDashboard.tsx`
- [x] T022 [US2] Create the Profile Settings page in `src/features/teacher/settings/pages/ProfilePage.tsx`
- [x] T023 [US2] Create the Notification Settings page in `src/features/teacher/settings/pages/NotificationSettingsPage.tsx`

**Checkpoint**: All user stories should now be independently functional.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T024 Update sidebar navigation in `src/components/layout/Sidebar.tsx` (or equivalent) to link to new pages
- [x] T025 [P] Audit all new pages for UI consistency with the premium "Grow" design system
- [x] T026 Implement skeleton loaders for student and assignment lists for better performance perception
- [x] T027 Final manual verification of the end-to-end "Assignment -> Submission -> Grade" flow

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Setup - BLOCKS all user stories.
- **User Stories (Phase 3+)**: All depend on Phase 2 completion.
  - US1 (Assignments) is the priority MVP.
- **Polish (Final Phase)**: Depends on US1 and US2 completion.

### Parallel Opportunities

- T002, T003 can run in parallel.
- T006, T007, T008 can run in parallel once services are initialized.
- T018, T019 can be implemented independently of US1 tasks.
- UI components (T014, T016) can be built in parallel with service/store logic.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & 2.
2. Complete Phase 3 (US1).
3. **STOP and VALIDATE**: Test assignment creation and grading.
4. Add User Story 2 (Students & Profile).
5. Final Polish.
