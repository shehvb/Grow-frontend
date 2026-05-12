# Feature Specification: Lessons Management

**Feature Branch**: `009-lessons-management`  
**Created**: 2026-05-09  
**Status**: Draft  

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Teacher Creates and Manages Lessons (Priority: P1)

Teachers need the ability to add new lessons to their existing courses and list all lessons within a course. This allows them to structure the curriculum and provide content to students.

**Why this priority**: Without lessons, a course has no instructional content. This is the foundation of the feature.

**Independent Test**: Can be fully tested by navigating to a course page as a teacher, creating a new lesson with a title and content, and seeing it appear in the course's lesson list.

**Acceptance Scenarios**:

1. **Given** a logged-in teacher viewing their course, **When** they submit the "Create Lesson" form with valid title and content, **Then** the lesson is added to the course list and a success message is displayed.
2. **Given** a logged-in teacher viewing their course, **When** they navigate to the lessons tab, **Then** they see an ordered list of all lessons they have created for that course.

---

### User Story 2 - Student Views and Joins Lessons (Priority: P1)

Students need to be able to view the list of lessons in a course they are enrolled in, access the lesson content, and actively "join" the lesson to register their attendance.

**Why this priority**: Students must be able to consume the content teachers create and have their engagement tracked.

**Independent Test**: Can be fully tested by logging in as a student, accessing an enrolled course, viewing a lesson's details, and clicking a "Join" button to register attendance.

**Acceptance Scenarios**:

1. **Given** a logged-in student viewing an enrolled course, **When** they navigate to the lessons section, **Then** they see a list of available lessons.
2. **Given** a logged-in student viewing a specific lesson, **When** they click "Join Lesson", **Then** their attendance is marked and a success confirmation is shown.
3. **Given** a student trying to join a lesson that hasn't started yet, **When** they click "Join Lesson", **Then** the system displays an error explaining they cannot join before the start time.

---

### User Story 3 - Teacher Views Lesson Attendance (Priority: P2)

Teachers need to monitor student engagement by viewing the attendance summary for any specific lesson within their courses.

**Why this priority**: Important for tracking student participation, but secondary to the core creation and consumption of content.

**Independent Test**: Can be fully tested by logging in as a teacher, selecting a lesson, and viewing a list of enrolled students along with their attendance status (Present, Late, Absent, etc.).

**Acceptance Scenarios**:

1. **Given** a logged-in teacher viewing a specific lesson they own, **When** they access the "Attendance" section, **Then** they see a summary showing total enrolled students and individual attendance records.

### Edge Cases

- What happens when a teacher tries to create a lesson for a course they do not own? (System should deny access - 403 Forbidden).
- How does the system handle a student joining a lesson after it has officially ended? (System should mark them as 'Absent' or 'Late' according to backend logic, but UI should reflect this gracefully).
- What happens if a student tries to join a lesson they are not enrolled in? (System should deny access - 403 Forbidden).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow teachers to create a new lesson for their course by providing a title, content (supporting plain text/markdown), and an optional display order.
- **FR-002**: System MUST display an ordered list of lessons for a given course to both teachers (owners) and students (enrolled).
- **FR-003**: System MUST allow students to explicitly "join" a lesson to mark their attendance.
- **FR-004**: System MUST handle dynamic attendance statuses returned by the backend (e.g., Present, Late, Absent, Rejected) when a student joins a lesson.
- **FR-005**: System MUST allow teachers to view a detailed attendance summary for a specific lesson, displaying the total enrolled count and a list of individual student attendance records.
- **FR-006**: System MUST restrict lesson creation and attendance viewing to the teacher who owns the course.
- **FR-007**: System MUST restrict lesson viewing and joining to students officially enrolled in the course.

### Key Entities

- **Lesson**: Represents instructional content within a course. Key attributes include `id`, `title`, `content`, `order`, and `created_at`.
- **LessonAttendanceSummary**: Represents the attendance overview for a lesson. Includes `lesson_id`, `lesson_title`, `total_enrolled`, and an array of `StudentAttendance` records.
- **AttendanceResult**: The outcome of a student joining a lesson, indicating their calculated status based on server time.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Teachers can create a new lesson within 3 clicks from the course dashboard.
- **SC-002**: Students can successfully join a lesson and see their attendance status update instantly.
- **SC-003**: The attendance summary view accurately reflects real-time student joins without requiring a manual page refresh (or with minimal latency).
- **SC-004**: 100% of unauthorized attempts to create, view, or join lessons (by users with incorrect roles or non-owners/non-enrolled) are gracefully blocked.
