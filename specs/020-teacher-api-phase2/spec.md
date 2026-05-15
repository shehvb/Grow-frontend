# Feature Specification: Teacher Portal API Integration (Phase 2)

**Feature Branch**: `020-teacher-api-phase2`  
**Created**: 2026-05-15
**Status**: Draft  
**Input**: User description: "Integrate the remaining Teacher Portal pages with the live backend API as defined in Grow Educational Platform API.yaml."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Review Assignment Submissions (Priority: P1)

Teachers need to view a list of student submissions for a specific assignment and grade them, providing both a score, XP, and feedback.

**Why this priority**: Grading assignments is a core daily task for teachers and blocks students from progressing and seeing their results.

**Independent Test**: Can be tested by navigating to `ReviewSubmissionsPage.tsx` for an assignment with existing submissions, submitting a grade via the UI, and verifying the PATCH request is sent and updates the UI.

**Acceptance Scenarios**:

1. **Given** a teacher is on the assignment review page, **When** the page loads, **Then** it should fetch and display real submissions from `GET /api/v1/teacher/assignments/{id}/submissions/` instead of mock data.
2. **Given** a teacher is reviewing an ungraded submission, **When** they enter a score, XP, and feedback and click "Submit Grade", **Then** the system sends a `PATCH /api/v1/teacher/submissions/{id}/grade/` request.
3. **Given** the grade submission is successful, **Then** the UI updates to show the submission as "Graded" with the new score and feedback without requiring a full page reload.

---

### User Story 2 - View Quiz Results Detail (Priority: P2)

Teachers need to see the detailed results of a specific quiz, including which students have completed it, their scores, completion times, and XP earned.

**Why this priority**: Monitoring student performance on quizzes allows teachers to adjust lesson plans based on class comprehension.

**Independent Test**: Can be tested by navigating to `QuizResultsPage.tsx` and verifying the table populates with real student results for that specific quiz ID.

**Acceptance Scenarios**:

1. **Given** a teacher is on the quiz results page, **When** the page loads, **Then** it fetches data from `GET /api/v1/teacher/quizzes/{id}/results/`.
2. **Given** the quiz results data is received, **Then** the UI correctly maps and displays student names, scores, completion rates, and XP earned without altering any CSS or layout.

---

### User Story 3 - View Teacher Notifications (Priority: P3)

Teachers need to see a chronological feed of important alerts and updates regarding their students and courses.

**Why this priority**: Notifications help teachers stay on top of events like new submissions or missing work, but is slightly lower priority than direct grading workflows.

**Independent Test**: Can be tested by opening `NotificationsPage.tsx` and ensuring the feed shows actual backend notifications rather than the static `NOTIFICATIONS` array.

**Acceptance Scenarios**:

1. **Given** a teacher opens the notifications page, **When** the page loads, **Then** it fetches data from `GET /api/v1/teacher/notifications/`.
2. **Given** the notifications are loaded, **Then** the system maps `TeacherNotification` fields (e.g., message, event_type, created_at) to the existing `NotificationCard` component structure.

---

### User Story 4 - View Accurate Assignment Statistics (Priority: P4)

Teachers need to see the correct ratio of submitted vs. total students on the main Assignment List page.

**Why this priority**: Enhances the dashboard experience by showing accurate progress at a glance.

**Independent Test**: Can be tested by viewing the assignment list and verifying the `submissions/total_students` ratio matches the backend `GET /api/v1/teacher/assignments/` response instead of hardcoded numbers.

**Acceptance Scenarios**:

1. **Given** the assignment list page is loaded, **Then** the submission counts on each assignment card reflect the real data from the API response.

### Edge Cases

- What happens when a teacher tries to grade a submission that has already been graded?
- How does system handle an API failure when fetching submissions or quiz results (e.g., 500 error or network timeout)?
- What happens if the notification feed is empty?
- How does the UI handle very long feedback text during the grading submission?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST fetch assignment submissions from `GET /api/v1/teacher/assignments/{id}/submissions/` and map them to the `ReviewSubmissionsPage.tsx` state.
- **FR-002**: System MUST allow teachers to submit grades via `PATCH /api/v1/teacher/submissions/{id}/grade/` containing score, feedback, and xp_reward.
- **FR-003**: System MUST fetch quiz results from `GET /api/v1/teacher/quizzes/{id}/results/` and map them to the `QuizResultsPage.tsx` state.
- **FR-004**: System MUST fetch notifications from `GET /api/v1/teacher/notifications/` and map the `TeacherNotification` schema to the `NotificationsPage.tsx` state.
- **FR-005**: System MUST use the `submissions` and `total_students` fields from `GET /api/v1/teacher/assignments/` to display accurate progress in `AssignmentListPage.tsx`.
- **FR-006**: System MUST perform all data mapping within the service layer (`teacher.service.ts` or similar) or custom hooks, ensuring that React component props and internal state shapes remain compatible.
- **FR-007**: System MUST NOT modify any existing UI elements, CSS classes, or layout structures in the specified React components.
- **FR-008**: System MUST update TypeScript interfaces in `src/types/` to reflect the backend schemas defined in `Grow Educational Platform API.yaml`.

### Key Entities

- **Submission**: Represents a student's submitted assignment, including file URL, submission time, and grading status.
- **QuizResult**: Represents a student's performance on a quiz, including score, duration, and XP.
- **TeacherNotification**: Represents an alert for the teacher, defined by event type, message, and read status.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All four specified pages (`ReviewSubmissionsPage.tsx`, `QuizResultsPage.tsx`, `NotificationsPage.tsx`, `AssignmentListPage.tsx`) load without hardcoded mock data.
- **SC-002**: Teachers can successfully submit a grade and see the UI update to reflect the new state, confirmed by a successful 200/204 API response.
- **SC-003**: 100% of data transformations occur outside the render lifecycle of the components (in services/hooks).
- **SC-004**: Zero visual regressions occur; the UI appears identical to its mock-data state when populated with equivalent API data.
