# Tasks: Courses Management & Enrollment

**Input**: Design documents from `/specs/008-courses-enrollment/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, Grow Educational Platform API.yaml

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create project structure per implementation plan: `src/services/`, `src/store/`, `src/components/courses/`
- [x] T002 [P] Configure environment variables for `VITE_API_URL` in `.env`
- [x] T003 [P] Configure API interceptor for JWT token injection (if not existing) in `src/services/apiClient.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 [P] Define TypeScript interfaces for Course, Teacher, Student, and Enrollment in `src/types/course.ts` (Referencing Grow Educational Platform API.yaml)
- [x] T005 [P] Implement courseService.ts with basic fetch wrappers in `src/services/courseService.ts`
- [x] T006 Create `useCourseStore` with Zustand in `src/store/useCourseStore.ts` including loading and error states
- [x] T007 [P] Implement base API client with role-aware headers in `src/services/apiClient.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Teacher Course Creation & Management (Priority: P1) 🎯 MVP

**Goal**: Allow teachers to fully manage their courses (Create, Update, Delete)

**Independent Test**: Login as a Teacher and successfully create, edit, and then delete a course.

### Implementation for User Story 1

- [x] T008 [P] [US1] Implement `createCourse` in `src/services/courseService.ts` (POST /api/v1/courses/)
- [x] T009 [P] [US1] Implement `updateCourse` in `src/services/courseService.ts` (PUT /api/v1/courses/{id}/)
- [x] T010 [P] [US1] Implement `deleteCourse` in `src/services/courseService.ts` (DELETE /api/v1/courses/{id}/)
- [x] T011 [US1] Add create/update/delete actions to `useCourseStore.ts`
- [x] T012 [US1] Connect Create/Edit course forms to API in `src/pages/course/CourseManagement.tsx`
- [x] T013 [US1] Implement 400 validation error handling in Course management forms
- [x] T014 [US1] Test Teacher CRUD flow: Create, Update, and Delete a course manually and verify state updates.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Student Enrollment (Priority: P1)

**Goal**: Allow students to enroll in courses and see immediate UI updates

**Independent Test**: Login as a Student, click "Enroll" on a course, and verify status changes to "Enrolled".

### Implementation for User Story 2

- [x] T015 [P] [US2] Implement `enrollInCourse` in `src/services/courseService.ts` (POST /api/v1/courses/{id}/enroll/)
- [x] T016 [US2] Add `enrollInCourse` action to `useCourseStore.ts`
- [x] T017 [US2] Create `EnrollButton` component in `src/components/courses/EnrollButton.tsx`
- [x] T018 [US2] Handle 409 (Already Enrolled) conflict error in `EnrollButton.tsx`
- [x] T019 [US2] Handle 403 (Not Student) permission error in `EnrollButton.tsx`
- [x] T020 [US2] Test Student Enrollment flow: Enroll in a course and verify "Enrolled" status and 409 handling.

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Role-Based Course Listing (Priority: P2)

**Goal**: Filter course lists based on the user's role (Teacher: Own, Student: Enrolled, Parent: Child's)

**Independent Test**: Login with each role and verify the course list content matches the role requirements.

### Implementation for User Story 3

- [x] T021 [P] [US3] Implement `listCourses` in `src/services/courseService.ts` (GET /api/v1/courses/)
- [x] T022 [US3] Add `listCourses` action to `useCourseStore.ts` with global loading/error state
- [x] T023 [US3] Connect `CoursesPage` to `listCourses` API in `src/pages/dashboard/CoursesPage.tsx`
- [x] T024 [US3] Implement role-based filtering logic in `CoursesPage.tsx` using `useAuth` role
- [x] T025 [US3] Test Listing flow: Login with Teacher, Student, and Parent and verify list content.

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: User Story 4 - Course Details & Student Visibility (Priority: P3)

**Goal**: Provide detailed course views and allow teachers to see their enrolled students

**Independent Test**: View course details as a teacher and verify the student list is visible; verify it is hidden for students.

### Implementation for User Story 4

- [x] T026 [P] [US4] Implement `getCourseById` in `src/services/courseService.ts` (GET /api/v1/courses/{id}/)
- [x] T027 [P] [US4] Implement `getCourseStudents` in `src/services/courseService.ts` (GET /api/v1/courses/{id}/students/)
- [x] T028 [US4] Add `selectedCourse` and `courseStudents` state to `useCourseStore.ts`
- [x] T029 [US4] Connect `CourseDetail` page to `getCourseById` in `src/pages/course/CourseDetail.tsx`
- [x] T030 [US4] Connect Enrolled Student list view (Teacher only) to `getCourseStudents` in `CourseDetail.tsx`
- [x] T031 [US4] Test Visibility flow: Teacher views student list; verify Student/Parent cannot access it (403 handling).

**Checkpoint**: All course management and enrollment features are complete.

---

## Phase 7: Polish & Error Handling (Priority: P4)

**Goal**: Ensure robustness and smooth user experience for all edge cases

- [x] T032 [P] Implement global 401/403 session expiry handling in `apiClient.ts`
- [x] T033 [P] Add success/error toast notifications for all course management actions
- [x] T034 [P] Verify loading skeleton or spinners are present during all async requests
- [x] T035 Add empty state UI for "No Courses Yet" for each role

**Checkpoint**: Feature is robust, polished, and ready for end-to-end reviewn.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Setup - BLOCKS all user stories.
- **User Stories (Phase 3+)**: All depend on Foundational phase.
  - US1 (P1) and US2 (P1) can proceed in parallel.
  - US3 (P2) depends on list API logic.
  - US4 (P3) depends on detail API logic.

### Parallel Opportunities

- T002, T003 (Setup)
- T004, T005, T007 (Foundational)
- T008, T009, T010 (US1 Services)
- T015 (US2 Services)
- T021 (US3 Services)
- T026, T027 (US4 Services)

---

## Implementation Strategy

### MVP First (User Story 1 & 2)

1. Complete Phase 1 & 2 (Setup & Foundation).
2. Complete Phase 3 (Teacher CRUD).
3. Complete Phase 4 (Student Enrollment).
4. **STOP and VALIDATE**: Verify core business cycle (Create -> Enroll).

### Incremental Delivery

1. Add Listing logic (Phase 5) to see the courses.
2. Add Detail logic (Phase 6) for deep dives and student management.
3. Final Polish (Phase 7).
