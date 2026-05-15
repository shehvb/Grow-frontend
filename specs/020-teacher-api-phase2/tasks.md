# Tasks: Teacher API Phase 2

**Input**: Design documents from `/specs/020-teacher-api-phase2/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Tests**: ⚠️ No testing tasks are included per the project Constitution (Principle I: No Testing). All verification will be manual.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Verify project structure for assignments, quizzes, and notifications inside `src/features/teacher/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 Update `src/types/index.ts` (or create `src/types/teacher.ts` if better organized) with the entities from `data-model.md` (`TeacherSubmission`, `GradeSubmissionRequest`, `TeacherNotification`, `QuizResult`).

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Review Assignment Submissions (Priority: P1) 🎯 MVP

**Goal**: Teachers need to view a list of student submissions for a specific assignment and grade them, providing both a score, XP, and feedback.

**Independent Test**: Navigate to `ReviewSubmissionsPage.tsx`, submit a grade via the UI, and verify the PATCH request is sent and updates the UI without a full page reload.

### Implementation for User Story 1

- [x] T003 [US1] Update `src/services/assignmentService.ts` to implement `getSubmissions(assignmentId: number)` using `apiClient.get('/teacher/assignments/{id}/submissions/')`.
- [x] T004 [US1] Update `src/services/assignmentService.ts` to implement `gradeSubmission(submissionId: number, data: GradeSubmissionRequest)` using `apiClient.patch('/teacher/submissions/{id}/grade/')`.
- [x] T005 [US1] Refactor `src/features/teacher/assignments/ReviewSubmissionsPage.tsx` to fetch submissions via `assignmentService.getSubmissions` on mount, mapping to the component state.
- [x] T006 [US1] Refactor `src/features/teacher/assignments/ReviewSubmissionsPage.tsx` to hook up the "Submit Grade" button to `assignmentService.gradeSubmission`, updating local state on success.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - View Quiz Results Detail (Priority: P2)

**Goal**: Teachers need to see the detailed results of a specific quiz, including which students have completed it, their scores, completion times, and XP earned.

**Independent Test**: Navigate to `QuizResultsPage.tsx` and verify the table populates with real student results for that specific quiz ID.

### Implementation for User Story 2

- [x] T007 [US2] Update `src/services/quizService.ts` to implement `getQuizResults(quizId: string | number)` using `apiClient.get('/teacher/quizzes/{id}/results/')`.
- [x] T008 [US2] Refactor `src/features/teacher/quizzes/QuizResultsPage.tsx` to fetch results via `quizService.getQuizResults` and bind the `QuizResult` data to the table without changing UI structure.

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - View Teacher Notifications (Priority: P3)

**Goal**: Teachers need to see a chronological feed of important alerts and updates regarding their students and courses.

**Independent Test**: Open `NotificationsPage.tsx` and verify the feed shows actual backend notifications rather than the static array.

### Implementation for User Story 3

- [x] T009 [US3] Update `src/features/teacher/services/teacher.service.ts` to implement `getNotificationsFeed()` using `apiClient.get('/teacher/notifications/')`.
- [x] T010 [US3] Refactor `src/features/teacher/notifications/NotificationsPage.tsx` to fetch notifications on mount, group them by date dynamically, and pass them into the existing `NotificationCard` components.

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: User Story 4 - View Accurate Assignment Statistics (Priority: P4)

**Goal**: Teachers need to see the correct ratio of submitted vs. total students on the main Assignment List page.

**Independent Test**: View the assignment list and verify the `submissions/total_students` ratio matches the backend `GET /api/v1/teacher/assignments/` response.

### Implementation for User Story 4

- [x] T011 [US4] Review `src/store/useAssignmentStore.ts` and `src/features/teacher/assignments/AssignmentListPage.tsx` to ensure `submissions` and `totalStudents` map correctly to the API response, adding graceful fallbacks (e.g., `0/1`) if fields are missing in the schema.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T012 Review all updated pages (`ReviewSubmissionsPage.tsx`, `QuizResultsPage.tsx`, `NotificationsPage.tsx`, `AssignmentListPage.tsx`) to guarantee zero unintended visual layout or CSS class modifications occurred during integration.

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
- **User Story 4 (P4)**: Can start after Foundational. No dependencies on other stories.

### Parallel Opportunities

- Once Foundational phase completes, all four user stories can be worked on in parallel by different team members because they modify distinct, isolated feature pages.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently on the Review Submissions Page
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
