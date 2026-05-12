# Quickstart: Courses Feature

## Environment Setup
- Ensure `.env` contains `VITE_API_URL`.
- Ensure you have a valid JWT token for a user with the `Teacher` or `Student` role.

## Primary Flow (Teacher)
1. **Create**: Send `POST` to `/api/v1/courses/`.
2. **View**: Navigate to the dashboard to see your course list.
3. **Manage**: Click on a course to view students or update details.

## Primary Flow (Student)
1. **Browse**: View list of available courses (enrolled or public).
2. **Enroll**: Click "Enroll" on a course details page.
3. **Access**: Course appears in your "My Courses" list.

## Development Checklist
- [ ] Implement `courseService.ts` for API calls.
- [ ] Create `useCourseStore` with Zustand.
- [ ] Integrate API calls into Dashboard and Detail pages.
- [ ] Add role-based rendering logic for buttons (Enroll, Edit, Delete).
- [ ] Handle error states with notifications.
