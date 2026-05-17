# Quickstart: Student Dashboard Integration

## Prerequisites
- Authenticated as a user with the `student` role.
- Backend API reachable at `https://ahmeddali.pythonanywhere.com/api/v1` (or local equivalent).

## Implementation Steps

1. **Define Types**: Update `src/types/student.ts` with the `StudentDashboard` response structure.
2. **Create Service**: Implement `studentService.getDashboardData()` in `src/features/student/services/student.service.ts`.
3. **Create Store**: Implement `useStudentStore.ts` to manage dashboard data and loading state.
4. **Refactor Page**: Update `src/features/dashboard/DashboardPage.tsx` to:
   - Call `fetchDashboardData()` on mount.
   - Show a loading spinner during fetch.
   - Pass real data from the store to child widgets.
   - Handle empty states gracefully.

## Verification
- Load Dashboard: Verify KPI numbers and lists populate from the API.
- Error Case: Simulate API failure and verify "Something went wrong" message.
- Empty Case: Verify "No tasks found" when `todays_tasks` is empty.
