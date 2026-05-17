# Quickstart: Student Backend Integration

This document outlines how to begin working on the Student Backend Integration feature.

## Overview
The goal is to connect four core areas of the student portal to the backend API:
1. Tasks
2. Notifications
3. Dashboard Stats
4. Quiz Submissions

## Implementation Steps

1. **Update API Services**:
   - Add methods to `src/services/studentService.ts` for `/api/v1/student/tasks/` and dashboard data.
   - Add/verify methods in `src/services/notificationService.ts` for notifications.
   - Verify quiz payload schema in `src/services/quizService.ts`.

2. **Update Global Stores**:
   - Update `useStudentStore.ts` to manage task states and dashboard stats from the real API instead of mocks.
   - Ensure a state manager exists for Notifications (e.g., `useNotificationStore.ts`) to track unread counts across the app.

3. **Update UI Components**:
   - Refactor `TasksPage.tsx` to `const { tasks, fetchTasks } = useStudentStore()`.
   - Refactor `NotificationsPage.tsx` to pull real notifications.
   - Remove `mockFallback` in `DashboardPage.tsx`.

4. **Verify Payload Structures**:
   - Cross-reference the OpenAPI yaml schemas with the TypeScript interfaces in `src/types/`.

## Important Rules
- Do NOT alter any visual UI layouts or Tailwind classes.
- Handle API loading states (`isLoading`) gracefully.
- Handle API error states (`error`) gracefully.
- Test interactions purely by verifying network payloads in the browser dev tools.
