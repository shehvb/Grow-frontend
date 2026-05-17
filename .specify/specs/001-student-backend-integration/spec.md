# Feature Specification: Student Backend Integration

**Feature Branch**: `001-student-backend-integration`  
**Created**: 2026-05-16  
**Status**: Draft  
**Input**: User description: "Integrate and connect all missing backend endpoints for the Student portal based on the Grow Educational Platform API.yaml specifications. The goal is to replace all remaining hardcoded mock data in the frontend with real data from the backend without altering any existing UI layouts or designs. Specifically, address the following areas: 1. Tasks Page: Connect `/api/v1/student/tasks/` to replace the hardcoded tasks. 2. Notifications Page: Connect the notifications endpoint to replace mock alerts. 3. Dashboard Page: Connect missing stats (Weekly Goal, Leaderboard) to remove the `mockFallback`. 4. Quiz Player: Ensure submission flow matches the OpenAPI schemas exactly."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Real-Time Tasks (Priority: P1)

As a student, I want to see my actual tasks, upcoming challenges, and overdue items pulled from the backend, so that my task management reflects my real progress and assignments without relying on hardcoded mock data.

**Why this priority**: Task tracking is a core daily activity for students; having accurate data is crucial for their educational workflow.

**Independent Test**: Can be fully tested by navigating to the Tasks page and verifying that the lists (Today, Upcoming, Overdue) exactly match the payload returned from the `/api/v1/student/tasks/` endpoint.

**Acceptance Scenarios**:

1. **Given** I am a logged-in student navigating to the Tasks page, **When** the page loads, **Then** the UI displays tasks fetched from `/api/v1/student/tasks/` instead of local mock arrays.
2. **Given** I interact with a task (e.g., mark as completed), **When** I click the checkbox, **Then** an appropriate backend update occurs (if applicable) and the UI updates based on the server response.

---

### User Story 2 - Receive Real Notifications (Priority: P1)

As a student, I want to view my actual notifications and alerts fetched from the server, so I stay informed about real updates related to my account and courses.

**Why this priority**: Essential for timely communication regarding assignments, grading, and system alerts.

**Independent Test**: Can be fully tested by triggering a notification on the backend and observing it appear in the Notifications page for the student.

**Acceptance Scenarios**:

1. **Given** I am a logged-in student, **When** I open the Notifications center, **Then** the list of notifications is populated from the backend endpoint.
2. **Given** I have unread notifications, **When** I view the notifications, **Then** the unread count and styles correctly reflect the backend data state.

---

### User Story 3 - View Accurate Dashboard Stats (Priority: P2)

As a student, I want my Dashboard to display accurate statistics (Weekly Goal, Leaderboard, etc.) pulled directly from the backend, so I have a true picture of my academic performance.

**Why this priority**: Important for motivation, but slightly secondary to actual task completion (P1).

**Independent Test**: Can be fully tested by verifying that the data in the Dashboard matches the response from the student dashboard API, and no `mockFallback` data is used.

**Acceptance Scenarios**:

1. **Given** I am on the Dashboard, **When** the stats load, **Then** the Weekly Goal and Leaderboard widgets display data from the API.

---

### User Story 4 - Submit Quizzes Accurately (Priority: P1)

As a student taking a quiz, I want my quiz submissions to format correctly and match the backend API schema, so that my grades are accurately calculated and recorded.

**Why this priority**: Core assessment functionality. If submissions fail schema validation, grades are lost.

**Independent Test**: Can be fully tested by completing a quiz and verifying a `200 OK` response with the `StudentQuizResult` payload.

**Acceptance Scenarios**:

1. **Given** I have completed a quiz, **When** I click Submit, **Then** the payload matches `StudentQuizSubmitRequestRequest`.
2. **Given** a successful submission, **When** the server responds, **Then** the QuizResultScreen correctly displays the returned `StudentQuizResult`.

### Edge Cases

- What happens when an endpoint fails or returns a 4xx/5xx error? (Should display graceful error states in UI).
- How does the system handle an empty response (e.g., no tasks or no notifications)?
- What happens if the dashboard API does not yet supply Weekly Goal or Leaderboard data? (Must handle gracefully without crashing, perhaps hiding the widget or showing "Data unavailable" instead of false mock data).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST fetch student tasks from `/api/v1/student/tasks/` and map the response to the Tasks UI.
- **FR-002**: System MUST fetch notifications from the appropriate backend endpoint and populate the Notifications UI.
- **FR-003**: System MUST fetch full dashboard statistics from the backend and remove the `mockFallback` implementation in `DashboardPage.tsx`.
- **FR-004**: System MUST format quiz submission payloads to strictly match `StudentQuizSubmitRequestRequest`.
- **FR-005**: System MUST preserve all existing UI layouts, styling, and interactions during the data integration.
- **FR-006**: System MUST handle loading and error states for all newly connected API endpoints.

### Key Entities

- **Task**: Represents a learning milestone or assignment (Overdue, Today, Upcoming).
- **Notification**: Represents system or course alerts for the student.
- **DashboardStats**: Aggregated metrics including XP, streak, leaderboard rank, and goals.
- **QuizSubmission**: The mapping of question IDs to selected answer indices.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of the mock data arrays in `TasksPage.tsx` and `NotificationsPage.tsx` are removed and replaced with dynamic API fetching.
- **SC-002**: `mockFallback` is completely removed from `DashboardPage.tsx`.
- **SC-003**: Quiz submissions succeed without 400 Bad Request (schema mismatch) errors.
- **SC-004**: Zero regressions or unintended changes to the UI layout or design aesthetics.
