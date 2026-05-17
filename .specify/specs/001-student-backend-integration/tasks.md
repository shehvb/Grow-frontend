---
description: "Task list for Student Backend Integration"
---

# Tasks: Student Backend Integration

**Input**: Design documents from `/specs/001-student-backend-integration/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

**Tests**: Tests are EXPLICITLY PROHIBITED by Constitution Principle I (No Testing). Validation will be manual via browser.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify the environment and API client readiness.

- [x] T001 Verify `apiClient.ts` handles Bearer tokens correctly in `src/services/apiClient.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Store and service foundations.

- [x] T002 [P] Verify `useStudentStore` exists and maps correctly in `src/store/useStudentStore.ts`

---

## Phase 3: User Story 1 - View Real-Time Tasks (Priority: P1) 🎯 MVP

**Goal**: Fetch and display real tasks from `/api/v1/student/tasks/`.

**Independent Test**: Navigate to the Tasks page and verify data loading and format.

### Implementation for User Story 1

- [x] T003 [P] [US1] Create or update `studentService.ts` to include `getTasks()` hitting `/api/v1/student/tasks/`
- [x] T004 [US1] Update `src/store/useStudentStore.ts` to include `tasks` state and `fetchTasks` action
- [x] T005 [US1] Refactor `src/features/tasks/TasksPage.tsx` to consume `useStudentStore` tasks instead of hardcoded arrays
- [x] T006 [US1] Map the backend response safely to `Today`, `Upcoming`, and `Overdue` sections in `TasksPage.tsx`

**Checkpoint**: Tasks page accurately displays real task data.

---

## Phase 4: User Story 2 - Receive Real Notifications (Priority: P1)

**Goal**: View actual notifications and alerts fetched from the server.

**Independent Test**: Trigger/view notifications in the Notifications center.

### Implementation for User Story 2

- [x] T007 [P] [US2] Create or update `src/services/notificationService.ts` to fetch `/api/v1/notifications/`
- [x] T008 [US2] Create or update `src/store/useNotificationStore.ts` to manage notification state
- [x] T009 [US2] Refactor `src/features/notifications/NotificationsPage.tsx` to remove `notifications.mock.ts`
- [x] T010 [US2] Map the fetched notifications to the UI components inside `NotificationsPage.tsx`

**Checkpoint**: Notifications are real and `notifications.mock.ts` is unused.

---

## Phase 5: User Story 3 - View Accurate Dashboard Stats (Priority: P2)

**Goal**: Display accurate dashboard statistics and remove `mockFallback`.

**Independent Test**: Load Dashboard and verify all widget data matches the API response.

### Implementation for User Story 3

- [x] T011 [P] [US3] Update `getDashboardData()` in `src/services/studentService.ts` to fetch full metrics
- [x] T012 [US3] Update `src/store/useStudentStore.ts` to store the newly mapped `weeklyProgress` and `leaderboard` data
- [x] T013 [US3] Refactor `src/features/dashboard/DashboardPage.tsx` to completely remove `mockFallback`
- [x] T014 [US3] Add fallback UI logic for any fields the API does not return (e.g., hiding or defaulting safely)

**Checkpoint**: Dashboard uses strictly live data.

---

## Phase 6: User Story 4 - Submit Quizzes Accurately (Priority: P1)

**Goal**: Ensure quiz submissions strictly match `StudentQuizSubmitRequestRequest`.

**Independent Test**: Submit a quiz and verify a 200 OK response.

### Implementation for User Story 4

- [x] T015 [P] [US4] Review schema for `submitQuiz` payload in `src/services/quizService.ts`
- [x] T016 [US4] Update `src/features/quiz/QuizPlayerPage.tsx` `handleSubmit` to format the `answers` object exactly as the backend requires
- [x] T017 [US4] Verify the `QuizResultScreen.tsx` maps the backend `StudentQuizResult` correctly

**Checkpoint**: Quizzes submit successfully without 400 Bad Request errors.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Cleanup unused files and handle missing UI details.

- [x] T018 [P] Delete `src/features/notifications/notifications.mock.ts` entirely
- [x] T019 [P] Delete `src/mock/dashboard.mock.ts` entirely
- [x] T020 Review browser console for any React mapping or unique `key` errors

---

## Dependencies & Execution Order

- **US1, US2, US4** are highly decoupled and can be completed in parallel.
- **US3** shares some store updates with US1, but primarily affects the Dashboard.
- Polish phase happens last.
