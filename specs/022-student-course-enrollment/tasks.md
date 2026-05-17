---
description: "Task list for Student Course List and Enrollment integration"
---

# Tasks: Student Course List and Enrollment

**Input**: Design documents from `/specs/022-student-course-enrollment/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure updates for the data model.

- [x] T001 Update TypeScript interfaces for `Course` and `Lesson` in `src/features/courses/types/index.ts`
- [x] T002 [P] Export `PaginatedResponse` interface (if not already existing) in `src/types/api.ts` or `src/features/courses/types/index.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T003 Implement API endpoints `fetchStudentCourses`, `enrollCourse`, and `fetchCourseLessons` in `src/features/courses/api/courses.ts`
- [x] T004 Setup `useCourseStore` state properties (`studentCourses`, `currentCourseLessons`, `loading`, `error`) and actions in `src/store/useCourseStore.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - View Enrolled Courses (Priority: P1) 🎯 MVP

**Goal**: Fetch and display the list of courses the student is currently enrolled in using the `/api/v1/courses/` endpoint.

**Independent Test**: Can be fully tested by logging in as a student with enrolled courses and verifying the dashboard/course list matches the data returned by the API.

### Implementation for User Story 1

- [x] T005 [US1] Update `src/features/courses/hooks/useCourses.ts` (if used by StudentCourseList) or call Zustand store directly to fetch student courses on mount.
- [x] T006 [US1] Integrate the fetched courses into `src/features/courses/components/StudentCourseList.tsx` to render the grid of course cards.
- [x] T007 [US1] Implement robust Loading states (e.g., spinners) and Empty states ("No courses available") in `src/features/courses/components/StudentCourseList.tsx`.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Discover and Enroll in Courses (Priority: P2)

**Goal**: Implement the flow for students to discover new courses and join them using the `/api/v1/courses/{id}/enroll/` API.

**Independent Test**: Can be tested by selecting an available course and successfully triggering the enrollment flow.

### Implementation for User Story 2

- [x] T008 [US2] Implement the "Enroll" button click handler calling `useCourseStore.enroll` in `src/features/courses/components/StudentCourseList.tsx` (or the course discovery component).
- [x] T009 [US2] Add inline loading state to the Enroll button to prevent double submissions.
- [x] T010 [US2] Ensure successful enrollment updates the local Zustand state and shows a success toast notification.

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - View Course Details and Lessons (Priority: P3)

**Goal**: Allow students to click on a course to view its details and the list of available lessons via the `/api/v1/courses/{id}/lessons/` endpoint.

**Independent Test**: Can be tested by clicking an enrolled course and verifying that the correct lesson data is fetched and displayed.

### Implementation for User Story 3

- [x] T011 [US3] Implement `useEffect` to fetch course details and lessons on mount using the course ID from the URL in `src/features/courses/CourseDetailsPage.tsx`.
- [x] T012 [US3] Render the sequence of lessons, handling both the Empty State (no lessons) and the list of lessons.
- [x] T013 [US3] Implement loading spinners while the course details and lessons are being fetched in `src/features/courses/CourseDetailsPage.tsx`.

**Checkpoint**: All user stories should now be independently functional

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T014 Polish loading skeletons and ensure error toasts display human-readable messages in `src/features/courses/components/StudentCourseList.tsx` and `CourseDetailsPage.tsx`.
- [x] T015 Verify error handling for 401/403 responses gracefully handles token expiration.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2).
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Expands on US1 UI.
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Independent page.

### Parallel Opportunities

- T001 and T002 can run in parallel.
- Once Foundational phase completes, T005 (US1) and T011 (US3) can technically be developed in parallel as they touch different UI components.
