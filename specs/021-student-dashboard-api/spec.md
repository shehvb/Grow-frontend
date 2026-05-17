# Feature Specification: Student Dashboard API Integration

**Feature Branch**: `021-student-dashboard-api`
**Created**: 2026-05-15
**Status**: Draft
**Input**: User description: "Integrate the Student Dashboard with the live backend API to replace mock data for XP, streaks, tasks, and leaderboard."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Dashboard Core Stats (Priority: P1)
As a student, I want to see my real-time XP, current streak, and daily mastery progress so that I stay motivated and track my immediate goals.

**Why this priority**: These are the primary motivational hooks of the platform. Accurate data here is essential for student engagement.

**Independent Test**: Login as a student, navigate to the dashboard, and verify that the XP total, streak count, and progress percentage match the values from `GET /api/v1/student/dashboard/`.

**Acceptance Scenarios**:
1. **Given** a student is logged in, **When** they view the dashboard, **Then** the `XPCard`, `StreakCounter`, and `DailyMasteryProgressBar` display data from the API.
2. **Given** an API failure, **When** the dashboard loads, **Then** a graceful loading/error state is shown instead of broken layout.

---

### User Story 2 - Daily Tasks & Missions (Priority: P2)
As a student, I want to see a list of my tasks and missions for today so that I know exactly what I need to complete.

**Why this priority**: Directs the student to their learning activities for the day.

**Independent Test**: Verify that the "Today's Tasks" list reflects the items returned in the `today_tasks` array from the dashboard API.

**Acceptance Scenarios**:
1. **Given** the student has pending tasks, **When** the dashboard loads, **Then** the `TodayTasksList` displays the correct task titles and statuses.
2. **Given** no tasks for today, **When** the dashboard loads, **Then** the "No tasks found" state is displayed.

---

### User Story 3 - Social Motivation (Leaderboard) (Priority: P3)
As a student, I want to see my standing on the leaderboard compared to my peers.

**Why this priority**: Encourages healthy competition and social engagement.

**Independent Test**: Compare the leaderboard list in the UI with the `leaderboard` data from the API response.

**Acceptance Scenarios**:
1. **Given** a populated leaderboard in the API, **When** the dashboard loads, **Then** the `LeaderboardWidget` displays the top students and the current user's relative position.

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: System MUST fetch student dashboard data from `GET /api/v1/student/dashboard/`.
- **FR-002**: System MUST map API fields to `XPCard` (total_xp, xp_change), `StreakCounter` (streak_days), and `DailyMasteryProgressBar` (mastery_percentage).
- **FR-003**: System MUST populate `TodayTasksList` using the `today_tasks` array from the API response.
- **FR-004**: System MUST populate `LeaderboardWidget` using the `leaderboard` array from the API response.
- **FR-005**: System MUST populate `UpcomingSessionWidget` if `upcoming_session` is present in the API response.
- **FR-006**: System MUST maintain the exact current visual design, including all Tailwind classes, animations, and component structures.

### Key Entities
- **StudentDashboardResponse**: Aggregate object containing stats, tasks, leaderboard, and upcoming sessions.
- **StudentTask**: Represents a single learning task or mission.
- **LeaderboardEntry**: Represents a student's ranking and XP for the social widget.

## Success Criteria *(mandatory)*

### Measurable Outcomes
- **SC-001**: 100% of mock data in `DashboardPage.tsx` is replaced with dynamic data from the backend.
- **SC-002**: Zero visual regressions or CSS changes are introduced during the integration.
- **SC-003**: Initial data load completes in under 500ms under normal network conditions.
- **SC-004**: Graceful handling of empty states (e.g., no tasks, no upcoming sessions) without layout shifts.
