# Feature Specification: Lesson Management System

**Feature Branch**: `016-lesson-management`
**Created**: 2026-05-14
**Status**: Draft
**Input**: User description: "Lesson Management System for the Grow Educational Platform. Teacher creates content, student consumes it."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Teacher Creates a Lesson (Priority: P1)

As a teacher, I want to create and edit lessons within a specific course, defining title, content, media links (video/PDF), XP rewards, and ordering, so that students can consume structured educational material.

**Why this priority**: Without the ability to create lessons, the course management system remains an empty shell. This is the foundational content creation step.

**Independent Test**: Can be fully tested by creating a lesson using the teacher interface and verifying the payload sent to `POST /api/v1/teacher/courses/{id}/lessons/` is correct and the UI updates to show the new lesson in the list.

**Acceptance Scenarios**:

1. **Given** I am a teacher viewing a course detail page, **When** I click "Create Lesson" and fill out the form (Title, Video URL, XP) and save, **Then** the new lesson appears in the course's lesson list in the correct order.
2. **Given** I am a teacher viewing a lesson list, **When** I edit an existing lesson and change its XP reward, **Then** the updated lesson data is sent to `PUT/PATCH /api/v1/teacher/lessons/{id}/` and the list reflects the new XP value.

---

### User Story 2 - Student Consumes a Lesson (Priority: P2)

As a student, I want to view the list of lessons for a course in a sidebar, watch the lesson video/content in a main player area, and mark the lesson as complete to earn XP.

**Why this priority**: Once content is created, students must be able to view and interact with it to complete their learning objectives.

**Independent Test**: Can be fully tested by a student opening a course, watching the content, clicking "Mark as Complete", and seeing the optimistic UI update to show the lesson is completed.

**Acceptance Scenarios**:

1. **Given** I am a student viewing a course, **When** I select a lesson from the sidebar, **Then** the main area displays the rich text content and video player.
2. **Given** I have finished reviewing a lesson, **When** I click "Mark as Complete", **Then** the button optimistically shows a completed state, and a request is sent to `POST /api/v1/student/lessons/{lesson_id}/complete/`.

### Edge Cases

- What happens when a teacher tries to create a lesson with an invalid video URL?
- How does the system handle a student marking a lesson as complete multiple times?
- What happens if the `POST /api/v1/student/lessons/{lesson_id}/complete/` API call fails after the optimistic UI update?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow teachers to view all lessons for a specific course in their defined order (`GET /api/v1/teacher/courses/{id}/lessons/`).
- **FR-002**: System MUST allow teachers to create a new lesson with title, content (Rich Text/Markdown), media URL, XP reward, and sequence order (`POST /api/v1/teacher/courses/{id}/lessons/`).
- **FR-003**: System MUST allow teachers to edit existing lessons (`PUT/PATCH /api/v1/teacher/lessons/{id}/`).
- **FR-004**: System MUST allow students to view the course content in a split layout (Sidebar for progress/list, Main area for content) using `GET /api/v1/student/courses/{course_id}/`.
- **FR-005**: System MUST provide a "Mark as Complete" button for students that triggers `POST /api/v1/student/lessons/{lesson_id}/complete/`.
- **FR-006**: System MUST use optimistic UI updates when a student marks a lesson as complete (UI updates immediately, reverts if API fails).
- **FR-007**: System MUST use a high-premium, modern aesthetic (vibrant colors, smooth transitions, glassmorphism) using the existing Tailwind CSS configuration.

### Key Entities

- **TeacherLesson**: Represents a lesson from the teacher's perspective (editable, includes sequence order, XP definition).
- **StudentLesson**: Represents a lesson from the student's perspective (read-only content, includes completion status).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Teachers can successfully create a lesson with video and text content without encountering errors.
- **SC-002**: Students can navigate between lessons in a course seamlessly without full page reloads.
- **SC-003**: The "Mark as Complete" action reflects in the UI instantly (< 50ms) using optimistic state updates.
- **SC-004**: All UI components adhere to the platform's premium design language (glassmorphism, vibrant colors).
