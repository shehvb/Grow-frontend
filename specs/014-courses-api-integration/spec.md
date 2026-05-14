# Feature Specification: Courses API Integration

**Feature Branch**: `014-courses-api-integration`  
**Created**: 2026-05-14  
**Status**: Draft  
**Input**: User description: "Please use the speckit-specify skill to start a new specification for integrating the Courses API endpoints into the frontend..."

## Clarifications

### Session 2026-05-14

- Q: What happens if a teacher deletes a course that has active students and submissions? → A: Soft delete (mark as archived, hiding from active views but preserving data)
- Q: How do we handle pagination or large data sets when a course has hundreds of enrolled students? → A: Traditional offset pagination (explicit Page 1, 2, 3 navigation with a fixed page size)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Teacher Course Management (Priority: P1)

Teachers need to manage the lifecycle of courses (create, list, update, delete) and organize lessons within them so they can provide structured educational content.

**Why this priority**: Without courses and lessons, the platform has no content. This is the foundational capability that enables all other features.

**Independent Test**: Can be fully tested by a teacher logging in, navigating to their dashboard, creating a new course, adding a lesson to it, editing its details, and then deleting the course.

**Acceptance Scenarios**:

1. **Given** a teacher is logged in, **When** they navigate to the courses section, **Then** they see only the courses they own.
2. **Given** a teacher is on their dashboard, **When** they submit the "Create Course" form with valid details, **Then** the new course is created and appears in their list.
3. **Given** a teacher is viewing their course, **When** they add a new lesson, **Then** the lesson is successfully appended to the course curriculum.
4. **Given** a teacher is managing their course, **When** they select "Delete", **Then** the course and all associated lessons/assignments are removed after confirmation.

---

### User Story 2 - Student Enrollment & Lesson Participation (Priority: P1)

Students need to view available courses, enroll in them (lazy enrollment), and join active lessons to track their attendance automatically.

**Why this priority**: The core value proposition for students is accessing and participating in course content.

**Independent Test**: Can be tested by a student viewing a teacher's course, clicking "Enroll Now", and then subsequently joining a lesson to trigger attendance marking.

**Acceptance Scenarios**:

1. **Given** a student is viewing course details, **When** they interact with the course for the first time, **Then** they are automatically enrolled (lazy enrollment).
2. **Given** a student is enrolled in a course, **When** they click "Join Lesson" during an active lesson time, **Then** their attendance is marked automatically based on the time they joined (Present, Late).
3. **Given** a teacher is viewing lesson details, **When** they check the attendance tab, **Then** they see the real-time attendance status of all enrolled students.

---

### User Story 3 - Assignments, Submissions & Grading (Priority: P2)

Teachers need to create assignments, students need to submit them, and teachers need to grade those submissions to evaluate student progress.

**Why this priority**: Testing knowledge and providing feedback is the secondary loop of education, following content delivery.

**Independent Test**: Can be tested by a teacher creating an assignment, a student submitting work for it, and the teacher subsequently grading that submission.

**Acceptance Scenarios**:

1. **Given** a teacher is managing a course, **When** they create an assignment with a due date, **Then** it becomes visible to all enrolled students.
2. **Given** a student is viewing an assignment, **When** they submit their work, **Then** the submission is recorded and the teacher receives a notification.
3. **Given** a student has submitted an assignment, **When** they attempt to submit again, **Then** they are prevented from doing so (only one submission allowed).
4. **Given** a teacher is viewing student submissions, **When** they enter a grade and feedback, **Then** the student's submission status is updated to 'graded'.

---

### User Story 4 - Parent Course Overview (Priority: P2)

Parents need read-only access to view the courses their linked children are enrolled in to monitor their educational progress.

**Why this priority**: Parents are key stakeholders but they only need read-only visibility, making this slightly lower priority than core student/teacher actions.

**Independent Test**: Can be tested by logging in as a parent and verifying they can see a read-only list of courses and grades for their linked child.

**Acceptance Scenarios**:

1. **Given** a parent is logged in, **When** they view the courses section, **Then** they see a read-only overview of courses their child is enrolled in.

---

### User Story 5 - Course Analytics & Progress (Priority: P3)

Teachers need to view task summaries and overall progress for enrolled students to identify who needs help.

**Why this priority**: Analytics provide value but are not required for the initial functional loop of teaching and learning.

**Independent Test**: Can be tested by a teacher viewing the analytics dashboard for a course with active student submissions.

**Acceptance Scenarios**:

1. **Given** a teacher is viewing a course dashboard, **When** they check the progress section, **Then** they see aggregated task completion counts for enrolled students.

---

### Edge Cases

- What happens when a student tries to join a lesson that hasn't started yet? (Should receive an error/rejected status).
- How does the system handle a teacher trying to grade an assignment for a student who is not enrolled?
- **Resolved Deletion Strategy**: If a teacher deletes a course, the system performs a soft delete (marking it as archived) to preserve historical grade and attendance data for enrolled students.
- **Resolved Pagination Strategy**: For large lists (e.g. students in a course, submissions), the system uses traditional offset pagination (explicit Page 1, 2, 3) to allow precise navigation.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow teachers to perform CRUD operations on courses they own via `/api/v1/courses/`.
- **FR-002**: System MUST allow teachers to add lessons to a course with specific ordering.
- **FR-003**: System MUST implement lazy enrollment for students upon their first interaction with a course via `/api/v1/courses/{id}/enroll/`.
- **FR-004**: System MUST automatically record student attendance when they join a lesson via `/api/v1/courses/{id}/join/`.
- **FR-005**: System MUST allow teachers to view attendance summaries for a lesson.
- **FR-006**: System MUST allow teachers to create assignments and students to submit work (one submission per student per assignment).
- **FR-007**: System MUST allow teachers to grade pending submissions with a score and feedback.
- **FR-008**: System MUST provide a read-only overview of courses for parent accounts.
- **FR-009**: System MUST fetch and display course analytics (task summaries and progress) for teachers.
- **FR-010**: System MUST properly handle role-based UI rendering (e.g., hiding "Create Course" for students, hiding "Submit" for teachers).

### Key Entities *(include if feature involves data)*

- **Course**: Represents an educational unit with a title, description, and owner (teacher).
- **Lesson**: A specific module within a course, containing content and an order index.
- **Assignment**: A task assigned to students with a specific due date.
- **Submission**: A student's answer to an assignment, which can be pending or graded.
- **AttendanceRecord**: Tracks a student's presence in a lesson (Present, Late, Absent).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Teachers can create a course, add a lesson, and create an assignment without any API errors.
- **SC-002**: Students can successfully enroll in a course and submit an assignment, with the UI correctly reflecting their enrolled and submitted states.
- **SC-003**: 100% of API endpoints under `/api/v1/courses/` are successfully connected to the frontend with proper request/response typing.
- **SC-004**: Role-based access control works perfectly; students cannot see teacher actions, and parents only have read-only access.
- **SC-005**: Error states (e.g., 403 Forbidden, 404 Not Found) are gracefully handled in the UI with informative messages.
