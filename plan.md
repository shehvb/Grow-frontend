# Implementation Plan: Grow Educational Platform Frontend

**Branch**: `main` | **Date**: 2026-05-05 | **Spec**: `Grow Educational Platform API.yaml`
**Input**: OpenAPI 3.0.3 specification from `Grow Educational Platform API.yaml`

## Summary

Build a React + TypeScript frontend for the Grow Educational Platform consuming the REST API. The app supports three roles (student, teacher, parent) with features including course management, assignment submission/grading, attendance tracking, notifications, and analytics dashboards. Authentication uses JWT tokens with refresh token rotation.

## Technical Context

**Language/Version**: TypeScript ~5.9
**Primary Dependencies**: React ^19.2.0, react-router-dom ^7.13.1, Tailwind CSS ^3.4.0, Vite (rolldown-vite)
**Storage**: JWT tokens in memory/localStorage, API responses cached per React Query (if adopted)
**Testing**: npm test (framework TBD based on project setup)
**Target Platform**: Browser (responsive web app)
**Project Type**: web-service frontend (SPA)
**Performance Goals**: <200ms UI response, efficient token refresh, optimistic updates for submissions
**Constraints**: Must handle role-based access (student/teacher/parent), JWT Bearer auth, attendance auto-marking on lesson join
**Scale/Scope**: 3 user roles, ~25 API endpoints, courses/assignments/attendance/grades/notifications/sessions/xp domains

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [ ] Use TypeScript ~5.9 (per package.json)
- [ ] Use React ^19.2.0 with react-router-dom ^7.13.1
- [ ] Use Tailwind CSS ^3.4.0 for styling
- [ ] Follow Minimal Dependencies principle (justify each added lib)
- [ ] Component structure mimics existing codebase conventions

## Project Structure

### Documentation (this feature)

```text
specs/grow-frontend/
├── spec.md              # Feature specification (OpenAPI YAML)
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
└── contracts/           # Phase 1 output (/speckit.plan command)
    ├── auth.md
    ├── courses.md
    ├── assignments.md
    ├── attendance.md
    ├── grades.md
    ├── notifications.md
    ├── sessions.md
    ├── xp.md
    └── parent.md
```

### Source Code (repository root)

```text
frontend/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Route page components
│   ├── services/        # API client & endpoint functions
│   ├── hooks/           # Custom React hooks (useAuth, useRole, etc.)
│   ├── types/           # TypeScript types from OpenAPI schemas
│   ├── utils/           # Helpers (token management, role checks)
│   ├── router/          # react-router-dom route definitions
│   └── App.tsx
├── public/
├── package.json
└── vite.config.ts
```

**Structure Decision**: Option 2: Web application (frontend in `frontend/` directory, backend API is separate on https://edugrow.pythonanywhere.com)

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Role-based routing | 3 distinct user journeys (student/teacher/parent) | Single layout insufficient for different dashboards |
| Token refresh interceptor | JWT access tokens expire in 60 min | Manual re-login would degrade UX |

## API Contracts

### Base URL
- Production: `https://edugrow.pythonanywhere.com`
- Local dev: `http://localhost:8000`

### Authentication (`/api/v1/auth/`)

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/auth/register/` | POST | Register new account (role: student/teacher/parent/school_admin) | No |
| `/auth/login/` | POST | Login, returns access + refresh JWT tokens | No |
| `/auth/logout/` | POST | Blacklist refresh token | Yes |
| `/auth/me/` | GET | Get current user profile | Yes |
| `/auth/profile/` | GET/PUT | Get/update user profile | Yes |
| `/auth/change-password/` | POST | Change password (requires old password) | Yes |
| `/auth/forgot-password/` | POST | Request password reset email | No |
| `/auth/reset-password/` | POST | Reset password with token | No |
| `/auth/token/refresh/` | POST | Get new access token using refresh token | No |
| `/auth/parent-profile/` | POST | Link parent to student child | Yes (parent) |
| `/auth/school/` | GET/POST | Get/create school (school_admin only) | Yes (school_admin) |
| `/auth/schools/{id}/enrollment-codes/` | GET | List enrollment codes | Yes (school_admin) |
| `/auth/schools/{id}/enrollment-codes/generate/` | POST | Generate enrollment codes | Yes (school_admin) |
| `/auth/schools/{id}/enrollment-codes/{code_id}/revoke/` | POST | Revoke an enrollment code | Yes (school_admin) |
| `/auth/enrollment-codes/use/` | POST | Use enrollment code to join school | Yes |

### Courses (`/api/v1/courses/`)

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/courses/` | GET | List courses (role-scoped) | Yes |
| `/courses/` | POST | Create course (teacher only) | Yes (teacher) |
| `/courses/{id}/` | GET/PUT/DELETE | Get/update/delete course | Yes (teacher owns) |
| `/courses/{id}/enroll/` | POST | Enroll in course (student only) | Yes (student) |
| `/courses/{id}/students/` | GET | List enrolled students | Yes (teacher) |
| `/courses/{id}/lessons/` | GET/POST | List/create lessons | Yes |
| `/courses/{id}/attendance/` | GET | Get lesson attendance | Yes (teacher) |
| `/courses/{id}/join/` | POST | Join lesson (marks attendance) | Yes (student) |

### Assignments (`/api/v1/courses/{course_pk}/assignments/`)

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/courses/{course_pk}/assignments/` | GET | List assignments for course | Yes |
| `/courses/{course_pk}/assignments/` | POST | Create assignment (teacher only) | Yes (teacher) |
| `/courses/{course_pk}/assignments/{id}/` | GET/PUT/DELETE | Get/update/delete assignment | Yes (teacher owns) |

### Submissions (`/api/v1/courses/{course_pk}/assignments/{assignment_pk}/submissions/`)

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `.../submissions/` | GET | List submissions (teacher only) | Yes (teacher) |
| `.../submissions/{id}/` | GET | Get specific submission | Yes |
| `.../submissions/submit/` | POST | Submit assignment (student only) | Yes (student) |
| `.../submissions/{id}/grade/` | POST | Grade submission (teacher only) | Yes (teacher) |

### Grades (`/api/v1/grades/`)

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/grades/` | GET | List grades (role-scoped) | Yes |
| `/grades/student/{student_id}/gpa/` | GET | Get student GPA | Yes |

### Attendance (`/api/v1/attendance/`)

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/attendance/` | GET | List attendance records (role-scoped) | Yes |
| `/attendance/` | POST | Mark attendance for session (teacher only) | Yes (teacher) |

### Lessons (`/api/v1/lessons/`)

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/lessons/{id}/attendance/` | GET | Get lesson attendance | Yes (teacher) |
| `/lessons/{id}/join/` | POST | Join lesson (marks attendance) | Yes (student) |

### Notifications (`/api/v1/notifications/`)

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/notifications/` | GET | List notifications + unread_count | Yes |
| `/notifications/{id}/read/` | POST | Mark notification as read | Yes |
| `/notifications/read-all/` | POST | Mark all as read | Yes |

### Sessions (`/api/v1/sessions/`)

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/sessions/` | GET | List study sessions | Yes |
| `/sessions/active/` | GET | Get active session | Yes |
| `/sessions/start/` | POST | Start study session | Yes |
| `/sessions/end/` | POST | End study session | Yes |
| `/sessions/total/` | GET | Get total study time | Yes |

### XP (`/api/v1/xp/`)

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/xp/add/` | POST | Add XP to student | Yes |
| `/xp/total/` | GET | Get total XP | Yes |
| `/xp/history/` | GET | Get XP history | Yes |

### Parent Dashboard (`/api/v1/parent/`)

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/parent/dashboard/{student_id}/` | GET | Get child's dashboard analytics | Yes (parent) |

### AI Chat (`/api/v1/ai/`)

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/ai/chat/` | POST | Chat with AI assistant (student context) | Yes |

## Key Data Models (from OpenAPI schemas)

### User
- `id`: integer (read-only)
- `username`: string (unique)
- `email`: string (email format)
- `role`: "student" | "teacher" | "parent" | "school_admin"
- `first_name`, `last_name`: string (optional)
- `phone`: string (optional)
- `avatar`: string (URI, optional)
- `date_joined`: string (date-time, read-only)

### Course
- `id`: integer (read-only)
- `title`: string
- `description`: string
- `teacher`: User (read-only, nested)
- `created_at`: string (date-time, read-only)

### Assignment
- `id`: integer (read-only)
- `course`: integer (read-only)
- `title`: string
- `description`: string
- `due_date`: string (date-time)
- `created_by`: integer (read-only)
- `created_at`: string (date-time, read-only)

### Submission
- `id`: integer (read-only)
- `assignment`: integer (read-only)
- `student`: integer (read-only)
- `content`: string
- `status`: "pending" | "graded" (read-only)
- `submitted_at`: string (date-time, read-only)

### Grade
- `id`: integer (read-only)
- `submission`: integer (read-only)
- `score`: string (decimal, 0.00-100.00)
- `feedback`: string
- `graded_by`: integer (read-only)
- `graded_at`: string (date-time, read-only)

### AttendanceRecord
- `id`: integer (read-only)
- `course`: integer (read-only)
- `student`: integer (read-only)
- `date`: string (date format YYYY-MM-DD)
- `status`: "present" | "absent" | "late"
- `marked_by`: integer (read-only)

### Notification
- `id`: integer (read-only)
- `title`: string
- `body`: string
- `event_type`: "assignment_created" | "submission_created" | "submission_graded" | "attendance_marked" | "enrollment_created"
- `is_read`: boolean
- `created_at`: string (date-time)

### Dashboard (Parent)
- `gpa`: object (GPA data)
- `study_hours`: object
- `engagement`: integer
- `subjects`: array
- `recent_activity`: array

### EnrollmentCode
- `id`: integer (read-only)
- `token`: string (UUID, read-only)
- `status`: "available" | "used" | "revoked" (read-only)
- `used_by`: _BriefUser (read-only)
- `used_at`: string (date-time, nullable)
- `revoked_by`: _BriefUser (read-only)
- `revoked_at`: string (date-time, nullable)

## JWT Auth Flow

1. `POST /auth/login/` → receive `access` (60 min) + `refresh` (7 days)
2. Include `Authorization: Bearer <access>` on all protected requests
3. On 401 response → `POST /auth/token/refresh/` with `refresh` token
4. On refresh failure → redirect to login
5. `POST /auth/logout/` with `refresh` token to blacklist on logout

## Role-Based Access Summary

| Feature | Student | Teacher | Parent | School Admin |
|---------|---------|---------|--------|--------------|
| Enroll in courses | ✅ | ❌ | ❌ | ❌ |
| Create/manage courses | ❌ | ✅ | ❌ | ❌ |
| Submit assignments | ✅ | ❌ | ❌ | ❌ |
| Grade submissions | ❌ | ✅ | ❌ | ❌ |
| View own grades | ✅ | ✅ (filter by student) | ✅ (child only) | ❌ |
| Mark attendance | ❌ | ✅ | ❌ | ❌ |
| Join lessons (auto-attendance) | ✅ | ❌ | ❌ | ❌ |
| View notifications | ✅ | ✅ | ✅ | ❌ |
| Manage enrollment codes | ❌ | ❌ | ❌ | ✅ |
| View child dashboard | ❌ | ❌ | ✅ | ❌ |
| Create school | ❌ | ❌ | ❌ | ✅ |
| Link to child | ❌ | ❌ | ✅ | ❌ |
| Study sessions & XP | ✅ | ❌ | ❌ | ❌ |
| AI chat | ✅ | ❌ | ❌ | ❌ |
