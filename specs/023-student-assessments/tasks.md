---
description: "Task list for integrating student assignments and quizzes"
---

# Tasks: Student Assessments Integration

**Input**: Design documents from `/specs/023-student-assessments/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Tests**: None. (Per Constitution Principle I, no tests are included).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure.
*(No specific initialization tasks required for this feature as the repository and feature directories are already established.)*

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented.

- [x] T001 Update data models for `StudentAssignment`, `QuizStart`, and `StudentQuizResult` in `src/types/index.ts`.
- [x] T002 Update assignment endpoints (e.g. `submitStudentAssignment`) to handle `multipart/form-data` natively in `src/services/assignmentService.ts`.
- [x] T003 Update quiz endpoints (`startQuiz` and `submitQuiz`) to map the new API payload contracts in `src/services/quizService.ts`.

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Viewing and Submitting Assignments (Priority: P1) 🎯 MVP

**Goal**: Allow students to view their assignments, instructions, deadlines, and directly upload files for grading.

**Independent Test**: Can be verified by a student clicking the "Assignments" tab in a course, viewing an assignment, and successfully uploading a file without errors.

### Implementation for User Story 1

- [x] T004 [US1] Update assignment rendering inside the "Assignments" tab in `src/features/courses/CourseDetailsPage.tsx` to map API values like `xp_reward` and `deadline`.
- [x] T005 [US1] Add a file upload UI/Modal in `src/features/courses/CourseDetailsPage.tsx` and connect it to `assignmentService.submitStudentAssignment`.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently.

---

## Phase 4: User Story 2 - Taking and Submitting Quizzes (Priority: P1)

**Goal**: Allow students to take an active quiz with a ticking timer, submit their responses (literal text, not index), and view the graded results.

**Independent Test**: Can be verified by a student launching a quiz, confirming the timer matches the backend limit, answering questions, and successfully reaching the result screen showing valid XP and percentage metrics.

### Implementation for User Story 2

- [x] T006 [P] [US2] Update timer initialization logic to use `time_limit_seconds` instead of minutes in `src/features/quiz/QuizPlayerPage.tsx`.
- [x] T007 [P] [US2] Update `handleSubmit` logic to submit literal answer strings instead of option indices in `src/features/quiz/QuizPlayerPage.tsx`.
- [x] T008 [US2] Update result rendering to properly map `percentage`, `score`, `passed`, and `xp_awarded` in `src/features/quiz/QuizResultScreen.tsx`.

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories.

- [x] T009 [P] Clean up any unused mock data or obsolete typings in `src/services/quizService.ts` and `src/services/assignmentService.ts`.
- [x] T010 [P] Ensure error states (e.g., file too large, network drop during quiz submission) surface user-friendly alerts across components.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: N/A
- **Foundational (Phase 2)**: Core data models and services MUST be updated first.
- **User Stories (Phase 3 & 4)**: Depend on the foundation being updated. They can be executed sequentially or in parallel.
- **Polish (Final Phase)**: Depends on all user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: No dependencies other than Foundation.
- **User Story 2 (P1)**: No dependencies other than Foundation.

### Parallel Opportunities

- All Foundational endpoint service changes (T002, T003) can be worked on in parallel after types (T001) are updated.
- Updates in `QuizPlayerPage.tsx` (T006, T007) and `QuizResultScreen.tsx` (T008) can theoretically be tackled in parallel as they touch different parts of the UI.

---

## Implementation Strategy

### Incremental Delivery

1. Complete Foundational (Types + Services updates).
2. Add User Story 1 (Assignments) → Test independently.
3. Add User Story 2 (Quizzes) → Test independently.
4. Execute Polish phase for cleanliness and UX robustness.
