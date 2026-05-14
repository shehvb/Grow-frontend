---
description: "Task list for Lesson Management System"
---

# Tasks: Lesson Management System

**Input**: Design documents from `/specs/016-lesson-management/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Tests**: Tests are explicitly FORBIDDEN per Constitution Principle I.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 [P] Define `TeacherLesson` and `StudentLesson` types in `src/types/course.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 Extend API client methods in `src/services/courseService.ts` for lesson endpoints
- [x] T003 Create Zustand store in `src/store/useLessonStore.ts` for active lesson state and optimistic updates

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Teacher Creates a Lesson (Priority: P1) 🎯 MVP

**Goal**: Teachers can create, edit, and order lessons within a specific course.

**Independent Test**: Can be fully tested by creating a lesson using the teacher interface and verifying the payload sent to `POST /api/v1/teacher/courses/{id}/lessons/` is correct and the UI updates.

### Implementation for User Story 1

- [x] T004 [P] [US1] Create `LessonItem.tsx` component in `src/features/teacher/courses/components/LessonItem.tsx`
- [x] T005 [P] [US1] Create `CreateLessonModal.tsx` component in `src/features/teacher/courses/components/CreateLessonModal.tsx`
- [x] T006 [US1] Create `LessonList.tsx` component in `src/features/teacher/courses/components/LessonList.tsx` (Depends on T004, T005)
- [x] T007 [US1] Integrate `LessonList` into the teacher's Course detail view.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently.

---

## Phase 4: User Story 2 - Student Consumes a Lesson (Priority: P2)

**Goal**: Students can view lessons, watch content, and mark them as complete for XP.

**Independent Test**: Can be fully tested by a student opening a course, watching the content, clicking "Mark as Complete", and seeing the optimistic UI update.

### Implementation for User Story 2

- [x] T008 [P] [US2] Create `CourseSidebar.tsx` component in `src/features/student/courses/components/CourseSidebar.tsx`
- [x] T009 [P] [US2] Create `LessonPlayer.tsx` component in `src/features/student/courses/components/LessonPlayer.tsx`
- [x] T010 [P] [US2] Create `CompletionButton.tsx` component in `src/features/student/courses/components/CompletionButton.tsx`
- [x] T011 [US2] Assemble the split-view layout in the student's Course detail view combining Sidebar and Player.

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently.

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T012 Polish UI elements to ensure glassmorphism, vibrant colors, and smooth transitions are consistently applied.
- [x] T013 Verify that optimistic UI updates correctly revert if an API call fails.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2)
- **User Story 2 (P2)**: Can start after Foundational (Phase 2)

### Within Each User Story

- Components marked [P] can be created in parallel.
- Assembly components depend on their children.

### Parallel Opportunities

- T004, T005 can run in parallel.
- T008, T009, T010 can run in parallel.

---

## Parallel Example: User Story 2

```bash
# Launch all isolated components for User Story 2 together:
Task: "Create CourseSidebar.tsx component"
Task: "Create LessonPlayer.tsx component"
Task: "Create CompletionButton.tsx component"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → MVP!
3. Add User Story 2 → Test independently → Student Consumption ready
