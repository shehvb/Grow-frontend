# Phase 1: Data Models

Based on the OpenAPI specification and frontend requirements.

## Entities

### `Task`
Represents an assignment or learning milestone.
- **Fields**: `id` (string), `title` (string), `context` (string/course name + due date), `xp` (number), `critical` (boolean), `checked` (boolean), `isBlue` (boolean).
- **Mapping**: The backend may return slightly different keys (e.g., `due_date`, `course_name`). The service layer will map backend fields to the frontend `Task` interface.

### `Notification`
Represents a system or course alert.
- **Fields**: `id` (string), `type` ('alert' | 'message' | etc.), `title` (string), `message` (string), `isUnread` (boolean), `timestamp` (string/Date).

### `DashboardStats`
Represents aggregated metrics for the dashboard.
- **Fields**: `total_xp`, `daily_streak`, `daily_master` (with `completion_percentage`), `todays_tasks`, `leaderboard` (array of users), `weeklyProgress` (optional), `upcomingSession` (optional).

### `StudentQuizSubmitRequestRequest`
Represents the payload for quiz submission.
- **Fields**: Depends on schema, typically `answers` array or object mapping question IDs to selected options.

## Validation Rules
- All API interactions use standard JWT Bearer token authentication via the existing `apiClient`.
- State updates in components must handle `loading` and `error` states gracefully without breaking the layout.
