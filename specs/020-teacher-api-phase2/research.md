# Phase 0: Outline & Research

## Missing Integrations

1. **Assignment Reviews (`ReviewSubmissionsPage.tsx`)**:
   - Needs to fetch `GET /api/v1/teacher/assignments/{id}/submissions/`
   - Needs to post grades to `PATCH /api/v1/teacher/submissions/{id}/grade/`

2. **Quiz Results Detail (`QuizResultsPage.tsx`)**:
   - Needs to fetch `GET /api/v1/teacher/quizzes/{id}/results/`
   
3. **Teacher Notification Feed (`NotificationsPage.tsx`)**:
   - Needs to fetch `GET /api/v1/teacher/notifications/`

4. **Assignment List Statistics (`AssignmentListPage.tsx`)**:
   - Needs to use `submissions` and `total_students` from `GET /api/v1/teacher/assignments/`. Note: The current `TeacherAssignment` schema might not include `submissions`/`total_students`.

## Research & Clarifications

### Clarification 1: Schema alignment for Assignment Progress
**Decision**: We will update `TeacherAssignment` in our frontend types. If the backend does not return `submissions` or `total_students`, we will gracefully default to `0` or calculate if a nested array is provided, avoiding UI errors.
**Rationale**: Ensures UI safety and adheres to the NO UI CHANGES rule.

### Clarification 2: Grading Request Payload
**Decision**: The `PATCH /api/v1/teacher/submissions/{id}/grade/` payload must exactly match the expected schema (score, xp_reward, feedback). We will create a robust `gradeSubmission` method in `assignmentService.ts`.
**Rationale**: Direct service-layer mapping simplifies the component logic.

### Clarification 3: Notification Read Status
**Decision**: The feed should render based on the `is_read` flag. `TeacherNotification` schema defines `event_type`, `message`, `is_read`, and `created_at`.
**Rationale**: Connects directly to the existing `NotificationCard` props.
