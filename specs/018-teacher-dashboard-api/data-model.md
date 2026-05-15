# Data Models & Contracts: Teacher Dashboard & Settings API Integration

## 1. Teacher Dashboard Data Model

**Endpoint**: `GET /api/v1/teacher/dashboard/`
**Schema**: `TeacherDashboard`

### Fields:
- `total_students` (integer)
- `total_courses` (integer)
- `assignments_created` (integer)
- `active_quizzes` (integer)
- `top_performance` (array of objects) -> Map to `MOCK_TOP_PERFORMERS`
- `need_review` (array of objects) -> Map to `MOCK_NEEDS_REVIEW`
- `recent_student_activity` (array of objects) -> Map to `MOCK_ACTIVITY`

### Internal State Mapping (in `useTeacherStats.ts`):
- `performanceTrend`: Needs to be constructed/mocked if not provided by backend, or extracted from backend data if available, to satisfy `AreaChart` expectations.

---

## 2. Teacher Student List Data Model

**Endpoint**: `GET /api/v1/teacher/students/`
**Schema**: `TeacherStudentList` (List of objects)

### Frontend Expected Shape (`MOCK_STUDENTS`):
- `id`: string
- `name`: string
- `class`: string
- `xp`: number
- `avgScore`: number
- `attendance`: number
- `status`: string ("Excellent", "Average", "Needs Attention")

### API Response Mapping:
The service layer will map the backend `TeacherStudentList` array to match the frontend shape above exactly to ensure zero UI disruption.

---

## 3. Teacher Profile Settings Data Model

**Endpoints**: 
- `GET /api/v1/teacher/settings/profile/`
- `PATCH /api/v1/teacher/settings/profile/update/`
**Schema**: `TeacherProfile`

### Fields:
- `full_name` (string, readOnly)
- `email` (string, readOnly)
- `school_name` (string, readOnly)
- `teacher_id` (integer, readOnly)
- `bio` (string)
- `avatar` (string, uri)
- `preferred_language` (string)

### Frontend Expected Shape (`formData`):
- `fullName`: string (Mapped from `full_name`)
- `email`: string (Mapped from `email`)
- `school`: string (Mapped from `school_name`)
- `id`: string (Mapped from `teacher_id`)
- `language`: string (Mapped from `preferred_language`)

---

## 4. Teacher Notification Settings Data Model

**Endpoints**: 
- `GET /api/v1/teacher/settings/notifications/`
- `PATCH /api/v1/teacher/settings/notifications/update/`
**Schema**: `NotificationPreference`

### Frontend Expected Shape (`preferences`):
- `emailNotifications`: boolean
- `missingAssignments`: boolean
- `newSubmissions`: boolean

### API Response Mapping:
These boolean toggles will be mapped directly to the `NotificationPreference` schema properties provided by the backend.
