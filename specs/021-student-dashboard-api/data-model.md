# Data Model: Student Dashboard

## Entities

### StudentDashboard
Represents the aggregate data shown on the student's main dashboard.
- `total_xp`: `number` - Cumulative XP earned by the student.
- `daily_streak`: `number` - Current consecutive days of activity.
- `todays_tasks`: `array<TodaysTask>` - List of tasks for the current day.
- `daily_master`: `DailyMaster` - Progress towards the daily mastery goal.
- `leaderboard`: `array<LeaderboardEntry>` - Social ranking data.

### TodaysTask
- `title`: `string`
- `subject`: `string | null`
- `type`: `string` (e.g., "Assignment", "Quiz")
- `time_remaining`: `string | null`
- `xp_reward`: `number`
- `status`: `string` (e.g., "pending", "completed")

### DailyMaster
- `tasks_total`: `number`
- `tasks_completed`: `number`
- `completion_percentage`: `number`
- `level`: `number`

### LeaderboardEntry
- `rank`: `number`
- `username`: `string`
- `total_xp`: `number`

## Mapping to UI
- `DashboardPage` -> `StudentDashboard`
- `XPCard` -> `total_xp`
- `StreakCounter` -> `daily_streak`
- `DailyMasteryProgressBar` -> `daily_master.completion_percentage`
- `TodayTasksList` -> `todays_tasks`
- `LeaderboardWidget` -> `leaderboard`
