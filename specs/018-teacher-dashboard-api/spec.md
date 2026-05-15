# Feature Specification: Teacher Dashboard & Settings API Integration

**Feature Branch**: `018-teacher-dashboard-api`  
**Created**: 2026-05-15  
**Status**: Draft  
**Input**: User description: "Complete the backend API integration for the Teacher Portal by replacing the remaining mock data in the Dashboard, Students List, and Settings modules with real API calls."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Teacher Dashboard Data Binding (Priority: P1)

Teachers need to view their real-time statistics and classroom performance data immediately upon logging into the dashboard.

**Why this priority**: The dashboard is the landing page for teachers. Displaying accurate, up-to-date information is critical for them to assess classroom health and act accordingly.

**Independent Test**: Can be fully tested by loading the Dashboard page and verifying that the KPI numbers, top performers list, and recent activity reflect the exact data returned by `GET /api/v1/teacher/dashboard/`.

**Acceptance Scenarios**:

1. **Given** the teacher accesses the Dashboard, **When** the page loads, **Then** the KPI cards (Total Students, Courses, Assignments, Quizzes) display values fetched from the API.
2. **Given** the teacher views the performance section, **When** the `useTeacherStats` hook executes, **Then** the chart displays the performance trends and the Top Performers / Needs Review lists are populated from the API.

---

### User Story 2 - Student Classroom Management (Priority: P2)

Teachers need to view the full list of enrolled students, their attendance, and performance metrics.

**Why this priority**: Managing students and tracking individual performance is essential for targeted intervention.

**Independent Test**: Can be tested by navigating to the Students page and verifying the list matches the data from `GET /api/v1/teacher/students/`, and that existing search/filter logic works on the real data.

**Acceptance Scenarios**:

1. **Given** the teacher navigates to the Students page, **When** the data is fetched, **Then** the table populates with the real list of students including their XP, average score, and attendance.
2. **Given** a populated student list, **When** the teacher uses the search bar or class filter, **Then** the list filters correctly based on the real data attributes.

---

### User Story 3 - Settings & Profile Management (Priority: P3)

Teachers need to view and update their personal profile and notification preferences.

**Why this priority**: Allows personalization and controls how teachers receive communications from the platform.

**Independent Test**: Can be tested by changing a profile setting (like Name or School) and saving it, then refreshing the page to see the new values persist via the API.

**Acceptance Scenarios**:

1. **Given** the teacher is on the Settings page, **When** the page loads, **Then** the form fields are pre-populated with data from `GET /api/v1/teacher/settings/profile/` and `GET /api/v1/teacher/settings/notifications/`.
2. **Given** modified profile or notification settings, **When** the teacher clicks "Save Changes", **Then** the updates are sent via `PATCH` requests and the UI confirms the success.

---

### Edge Cases

- What happens when the API requests fail or time out? The system should display a graceful error state or fallback without breaking the page layout.
- How does the system handle an empty student list? The UI should show the existing "No students found" state.
- What happens if the backend returns null for optional fields like `school` or `xp`? The UI should display sensible defaults (e.g., "0" or "Not set").

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST fetch and display teacher dashboard statistics from `/api/v1/teacher/dashboard/`.
- **FR-002**: System MUST fetch and display the student roster from `/api/v1/teacher/students/`.
- **FR-003**: System MUST fetch teacher profile and notification preferences from their respective `/api/v1/teacher/settings/*` endpoints.
- **FR-004**: System MUST allow teachers to update profile details via `PATCH /api/v1/teacher/settings/profile/update/`.
- **FR-005**: System MUST allow teachers to update notification preferences via `PATCH /api/v1/teacher/settings/notifications/update/`.
- **FR-006**: System MUST map all backend fields to the existing React component props without altering any CSS classes, HTML structures, or visual design tokens.
- **FR-007**: System MUST maintain the existing local filtering and search logic on the Students page, adapting it to the real data object structure.

### Key Entities

- **TeacherDashboard**: Contains aggregate metrics, top performers, at-risk students, and recent activity logs.
- **TeacherStudentList**: Represents a student's performance snapshot within the teacher's classroom context (XP, attendance, grades).
- **TeacherProfile**: Contains personal and institutional details (name, email, school).
- **NotificationPreference**: Boolean flags for various alert types (emails, missing assignments).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of mock data in the Dashboard, Students, and Settings pages is replaced with dynamic API data.
- **SC-002**: Zero visual regressions or CSS changes are introduced during the integration.
- **SC-003**: All "Save" operations on the Settings page successfully persist data to the backend with a 2xx HTTP status code.
- **SC-004**: The Student page filters accurately process the fetched API payload, resolving searches in under 100ms.
