# Research: Student Dashboard API Integration

## Decision: API Mapping Strategy
The frontend `DashboardPage.tsx` will be refactored to fetch data from `GET /api/v1/student/dashboard/`. We will create a `studentService.ts` to handle the API call and a `useStudentStore.ts` (Zustand) to manage the dashboard state.

### Mapping Table
| UI Field | API Field (StudentDashboard) | Transformation |
|----------|------------------------------|----------------|
| `totalXp` | `total_xp` | None |
| `xpChange` | N/A | Default to 0 or derive from history if available |
| `streakDays` | `daily_streak` | None |
| `dailyMasteryProgress` | `daily_master.completion_percentage` | None |
| `todayTasks` | `todays_tasks` | Map array of `TodaysTask` |
| `leaderboard` | `leaderboard` | Map array of `LeaderboardEntry` |
| `weeklyProgress` | N/A | Default to 0 (Missing in API schema) |
| `weeklyTarget` | N/A | Default to 100 (Missing in API schema) |
| `upcomingSession` | N/A | Default to null (Missing in API schema) |

## Resolved Clarifications
- **Missing API Fields**: `xpChange`, `weeklyProgress`, `weeklyTarget`, and `upcomingSession` are present in the frontend UI but missing from the `GET /api/v1/student/dashboard/` API response schema.
- **Decision**: Option A (Mock Fallback). We will pass hardcoded/mocked values (e.g., 0, null, or static objects) to these components so the UI structure remains visually identical, pending future backend updates.

### API Mapping Strategy
- **Decision**: Directly map backend API JSON schemas to existing frontend React component state.
- **Rationale**: Fulfills the constraint of strictly enforcing "NO UI CHANGES". The frontend components expect specific shapes, and the service layer/hooks will parse the API response into these exact shapes. Missing fields will use the agreed-upon Mock Fallbacks.
- **Alternatives considered**: Rewriting frontend components to match backend schema names exactly. Rejected because it violates the "NO UI CHANGES" constraint and increases regression risk.

### Rationale
- **Single Endpoint**: The `student/dashboard/` endpoint provides most of the required data in a single request, optimizing performance.
- **Zustand for State**: Consistency with existing store patterns in the project.
- **Graceful Degradation**: Fields not provided by the API (like `weeklyProgress`) will use sensible defaults to avoid breaking the UI.

## Alternatives Considered
- **Multiple Fetches**: Fetching XP from `/xp/total/`, tasks from `/tasks/pending/`, etc.
  - *Rejected*: Too many network requests for a single page load.
- **Mock Fallback**: Keeping some mock data for missing fields.
  - *Accepted*: Necessary for fields not yet present in the backend schema (like `weekly_progress`).

## Dependencies & Best Practices
- **Service Layer**: Keep data fetching logic separate from components.
- **Type Safety**: Define strict interfaces for API responses to ensure reliable mapping.
