# Feature Specification: Teacher Portal API Integration (Phase 2)

**Feature Branch**: `017-teacher-portal-phase-2`  
**Created**: 2026-05-15  
**Status**: Draft  
**Input**: User description: "Implement remaining Teacher Portal API surfaces including Assignments, Quizzes, Student Management, and Profile/Settings."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Assignment Management & Grading (Priority: P1)

Teachers need to set tasks for students and evaluate their work. This journey covers creating an assignment and later grading the submissions.

**Why this priority**: Core academic loop. Without assignments and grading, the teacher portal only delivers content but doesn't facilitate evaluation.

**Independent Test**: Can be tested by creating an assignment for a course, checking that it appears in the dashboard, and then accessing the grading interface for a (mocked or real) submission.

**Acceptance Scenarios**:

1. **Given** a teacher is on the Course Dashboard, **When** they click "Add Assignment", **Then** they see a form to enter title, description, marks, and upload resource files.
2. **Given** students have submitted work, **When** the teacher reviews the assignment, **Then** they see a list of all submissions with student names and submission status.
3. **Given** a specific student submission, **When** the teacher enters a grade and feedback, **Then** the data is persisted and the student's record is updated.

---

### User Story 2 - Global Student Management & Profile (Priority: P2)

Teachers need a centralized view of all their students and management of their own account.

**Why this priority**: Essential for administrative oversight and account security.

**Independent Test**: Can be tested by navigating to the "My Students" view and verifying all enrolled students across all courses are listed correctly.

**Acceptance Scenarios**:

1. **Given** a teacher has multiple courses, **When** they visit the Students dashboard, **Then** they see a deduplicated list of all students enrolled in any of their courses.
2. **Given** a teacher wants to change their details, **When** they update their profile or notification settings, **Then** the changes are saved and immediately reflected.

---

- **Large File Uploads**: How does the system handle assignment resources that exceed the 50MB limit?
- **Concurrent Grading**: What happens if two teachers (in a multi-teacher course) attempt to grade the same submission at the same time?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a standalone "Assignments" page accessible from the sidebar.
- **FR-002**: Assignment creation form MUST include a dropdown to select from the teacher's existing courses.
- **FR-003**: System MUST support multipart/form-data for uploading assignment resource files.
- **FR-004**: System MUST provide a Submission Review view that lists all students enrolled in a course and their submission status.
- **FR-005**: System MUST allow teachers to either **Download** or **Preview** student submission files.
- **FR-006**: System MUST allow teachers to manually select a student from the list to enter numerical grades and text feedback.
- **FR-007**: System MUST provide a global "My Students" view that lists all students linked to the teacher through course enrollments.
- **FR-008**: System MUST allow teachers to retrieve and update their profile information and notification preferences.

### Key Entities *(include if feature involves data)*

- **Assignment**: Represents a task given to students. Includes title, description, max_marks, and linked files.
- **Submission**: Represents a student's response to an assignment. Linked to a Student and an Assignment.
- **Grade**: Represents the evaluation of a submission. Includes score and feedback.
- **Student Profile**: Basic info of students enrolled in the teacher's courses.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Teachers can create a new assignment and upload resources in under 60 seconds.
- **SC-002**: Grading a single student submission (marking + feedback) requires fewer than 5 UI interactions.
- **SC-003**: Global student list loads in under 800ms for a teacher with up to 500 students.
- **SC-004**: System successfully handles concurrent file uploads for assignments without performance degradation for other users.
