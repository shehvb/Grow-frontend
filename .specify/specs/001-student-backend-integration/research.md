# Phase 0: Research

## Unknowns Resolved

1. **Dashboard Stats Payload**:
   - **Decision**: Update `studentService.getDashboardData()` to hit `/api/v1/student/dashboard/` (or the exact endpoint defined in the yaml) and map the response properties to `total_xp`, `daily_streak`, `daily_master`, `todays_tasks`, `leaderboard`, `weeklyProgress`, `upcomingSession`.
   - **Rationale**: We must align the frontend interface with the backend response exactly. If `weeklyProgress` or `upcomingSession` are absent from the backend, we will safely default to empty states rather than hardcoded mock data, per the specification edge cases.

2. **Tasks & Notifications Endpoints**:
   - **Decision**: Implement `getTasks()` in `studentService.ts` and `getNotifications()` in `notificationService.ts`. Use standard Axios GET requests.
   - **Rationale**: Centralizing API calls in the `services/` directory keeps components clean and adheres to the separation of concerns.

3. **Quiz Submission Validation**:
   - **Decision**: The `QuizPlayerPage.tsx` must format its submission as `{ answers: { [questionId]: answerIndex } }` or however the OpenAPI schema strictly defines `StudentQuizSubmitRequestRequest`.
   - **Rationale**: Strict schema adherence prevents 400 errors.

## Constitution Verification
- Does not introduce new dependencies.
- Keeps UI logic separated from data fetching logic.
