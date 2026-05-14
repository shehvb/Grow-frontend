# Implementation Tasks: Courses API Integration

**Feature**: 014-courses-api-integration

## Phase 1: Setup

- [x] T001 Define Course, Lesson, Assignment, Submission, and AttendanceRecord types in `src/features/courses/types.ts`

## Phase 2: Foundational

- [x] T002 Implement base API functions for general courses in `src/features/courses/api/courses.ts` (List, Get)
- [x] T003 Create custom hooks for basic course fetching in `src/features/courses/hooks/useCourses.ts`

## Phase 3: Teacher Course Management (P1)

**Story Goal**: Teachers need to manage the lifecycle of courses and organize lessons within them.
**Independent Test**: A teacher can create, view, edit, and delete courses and add lessons.

- [x] T004 [P] [US1] Implement teacher-specific API calls (POST, PUT, DELETE courses) in `src/features/courses/api/courses.ts`
- [x] T005 [P] [US1] Implement lesson management API calls (GET, POST lessons) in `src/features/courses/api/lessons.ts`
- [x] T006 [US1] Build Teacher Course List component in `src/features/courses/components/TeacherCourseList.tsx`
- [x] T007 [US1] Build Course Form (Create/Edit) component in `src/features/courses/components/CourseForm.tsx`
- [x] T008 [US1] Build Teacher Course Details component (showing curriculum) in `src/features/courses/components/TeacherCourseDetails.tsx`
- [x] T009 [US1] Build Lesson Creation Form component in `src/features/courses/components/LessonForm.tsx`
- [x] T010 [US1] Integrate US1 components into the Teacher Dashboard layout routing in `src/layouts/TeacherLayout.tsx`

## Phase 4: Student Enrollment & Lesson Participation (P1)

**Story Goal**: Students need to view available courses, enroll (lazy), and join lessons.
**Independent Test**: A student can click on a course to enroll, and join a lesson marking attendance.

- [x] T011 [P] [US2] Implement student enrollment API calls (POST enroll, POST join) in `src/features/courses/api/studentActions.ts`
- [x] T012 [P] [US2] Implement teacher attendance tracking API calls (GET attendance) in `src/features/courses/api/attendance.ts`
- [x] T013 [US2] Build Student Course List/Discovery component in `src/features/courses/components/StudentCourseList.tsx`
- [x] T014 [US2] Build Student Course Details view with lazy enrollment logic in `src/features/courses/components/StudentCourseDetails.tsx`
- [x] T015 [US2] Build 'Join Lesson' interaction component in `src/features/courses/components/JoinLessonButton.tsx`
- [x] T016 [US2] Build Teacher Attendance Viewer component in `src/features/courses/components/AttendanceViewer.tsx`
- [x] T017 [US2] Integrate US2 components into Student Dashboard routing in `src/App.tsx`

## Phase 5: Assignments, Submissions & Grading (P2)

**Story Goal**: Teachers create assignments; students submit them; teachers grade them.
**Independent Test**: Teacher creates assignment, student submits it, teacher grades it.

- [x] T018 [P] [US3] Implement assignment API calls (GET, POST, PUT, DELETE) in `src/features/courses/api/assignments.ts`
- [x] T019 [P] [US3] Implement submission & grading API calls (POST submit, GET submissions, POST grade) in `src/features/courses/api/submissions.ts`
- [x] T020 [US3] Build Teacher Assignment Management component in `src/features/courses/components/AssignmentManager.tsx`
- [x] T021 [US3] Build Student Assignment View & Submission Form in `src/features/courses/components/StudentAssignmentView.tsx`
- [x] T022 [US3] Build Teacher Grading View component in `src/features/courses/components/GradingView.tsx`

## Phase 6: Parent Course Overview (P2)

**Story Goal**: Parents have read-only access to their child's courses.
**Independent Test**: Parent logs in and sees a read-only list of courses.

- [x] T023 [US4] Build Parent Read-Only Course List component in `src/features/courses/components/ParentCourseList.tsx`
- [x] T024 [US4] Integrate Parent Course List into Parent Dashboard routing in `src/layouts/ParentLayout.tsx`

## Phase 7: Course Analytics & Progress (P3)

**Story Goal**: Teachers view task summaries and student progress.
**Independent Test**: Teacher views analytics dashboard for a course.

- [x] T025 [P] [US5] Implement analytics API calls (GET task-summary, GET progress) in `src/features/courses/api/analytics.ts`
- [x] T026 [US5] Build Teacher Course Analytics Dashboard component in `src/features/courses/components/CourseAnalytics.tsx`

## Final Phase: Polish & Cross-Cutting Concerns

- [x] T027 Standardize error handling and toast notifications across all new course API integrations.
- [x] T028 Ensure responsive design (Tailwind) is consistent for all new course management views.
- [x] T029 Implement pagination controls for large lists (Students, Submissions, Courses) where applicable.

---

## Dependencies

- **US1** requires Foundational Tasks (T002-T003)
- **US2** can be developed partially in parallel with US1, but requires US1's Course/Lesson creation to fully test the student flow manually.
- **US3** depends on US1 and US2 (needs a course, a lesson, and an enrolled student).
- **US4** depends on US2 (needs enrolled students).
- **US5** depends on US3 (needs submissions to show progress).

## Parallel Execution Examples

- While Developer A builds **US1** (Teacher Course Management), Developer B can start setting up the API layers for **US2**, **US3**, and **US5** (T011, T012, T018, T019, T025).

## Implementation Strategy

We will follow an MVP-first strategy:
1. Complete T001 to T010 first (US1: Teacher Course Management) so there is content.
2. Complete US2 (Student Enrollment) so students can consume the content.
3. Only then proceed to US3 (Assignments/Grading) as the secondary educational loop.
