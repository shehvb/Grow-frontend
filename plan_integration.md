# Integration Plan: Grow Educational Platform API → Frontend

**Date**: 2026-05-05
**API Spec**: `Grow Educational Platform API.yaml` (OpenAPI 3.0.3)
**Frontend Stack**: React ^19.2.0, TypeScript ~5.9, Vite, Tailwind CSS ^3.4.0, react-router-dom ^7.13.1
**Minimal Dependencies Rule**: All added libs must be justified per project guidelines.

---

## Overview
Actionable plan to integrate the Grow REST API into the existing React frontend, covering auth, type generation, service layer, role-based routing, and per-domain feature implementation.

---

## Prerequisites
- API base URLs (from OpenAPI spec):
  - Production: `https://edugrow.pythonanywhere.com`
  - Local dev: `http://localhost:8000`
- Existing project structure: `frontend/` directory for all client code (per CLAUDE.md)

---

## Phase 1: Foundation Setup
### Step 1.1: Environment Configuration
Create Vite env files to switch API targets without code changes:
```env
# frontend/.env.development
VITE_API_BASE_URL=http://localhost:8000

# frontend/.env.production
VITE_API_BASE_URL=https://edugrow.pythonanywhere.com
```
Add type support in `frontend/src/env.d.ts`:
```typescript
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

### Step 1.2: Base API Client
**Decision**: Use native `fetch` (no extra dependency) wrapped with JWT and error handling logic.
Create `frontend/src/services/apiClient.ts`:
- Reads base URL from `import.meta.env.VITE_API_BASE_URL`
- Stores JWT access/refresh tokens in `localStorage` (MVP tradeoff: vulnerable to XSS but simpler to implement; flag for future security review)
- Request interceptor: Appends `Authorization: Bearer <access_token>` header to all protected requests
- Response interceptor: Handles 401 errors → triggers token refresh flow:
  1. On 401, call `POST /api/v1/auth/token/refresh/` with stored refresh token
  2. If refresh succeeds: retry original request with new access token
  3. If refresh fails: Clear tokens, redirect to `/login`

### Step 1.3: TypeScript Type Generation
**Tool**: `openapi-typescript` (justification: auto-generates types from OpenAPI spec, eliminates manual sync errors)
```bash
npm install -D openapi-typescript
npx openapi-typescript "Grow Educational Platform API.yaml" --output frontend/src/types/api.d.ts
```
Verify generated types match API schemas (User, Course, Assignment, AttendanceRecord, etc. from OpenAPI lines 1885-2860).

---

## Phase 2: Auth Integration
### Step 2.1: Auth State Management
Create `frontend/src/hooks/useAuth.ts`:
- State: `user`, `role`, `isAuthenticated`, `isLoading`
- Methods: `login()`, `logout()`, `register()`, `refreshToken()`
- Persists auth state via `AuthContext` in `frontend/src/context/AuthContext.tsx`

### Step 2.2: Auth Service
Create `frontend/src/services/authService.ts` with typed methods mapping to API endpoints:
| API Endpoint | Service Method | Description |
|--------------|----------------|-------------|
| `POST /auth/login/` | `login(email, password)` | Returns `{ access, refresh, user }` |
| `POST /auth/register/` | `register(credentials)` | Register new user by role |
| `POST /auth/logout/` | `logout(refreshToken)` | Blacklists refresh token |
| `POST /auth/token/refresh/` | `refreshToken(refresh)` | Get new access token |
| `GET /auth/me/` | `getProfile()` | Get current user |
| `PUT /auth/profile/` | `updateProfile(data)` | Update user profile |
| `POST /auth/change-password/` | `changePassword(old, new)` | Change password |
| `POST /auth/forgot-password/` | `forgotPassword(email)` | Trigger reset email |
| `POST /auth/reset-password/` | `resetPassword(token, new)` | Reset password with token |
| `POST /auth/parent-profile/` | `linkToChild(childId)` | Parent-only: link to student |
| `POST /auth/school/` | `createSchool(name)` | School admin-only |
| Enrollment code endpoints | `generateCodes()`, `revokeCode()`, `useCode()` | School admin enrollment management |

### Step 2.3: Protected Route Component
Create `frontend/src/components/ProtectedRoute.tsx`:
- Checks if user is authenticated
- Validates user role against required roles (student/teacher/parent/school_admin)
- Redirects to `/login` if unauthenticated, `/403` if unauthorized

---

## Phase 3: Role-Based Routing
Configure `react-router-dom` routes in `frontend/src/router/index.tsx`:
```typescript
// Public routes (no auth)
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password" element={<ResetPassword />} />

// Protected student routes
<Route element={<ProtectedRoute allowedRoles={["student"]} />}>
  <Route path="/dashboard" element={<StudentDashboard />} />
  <Route path="/courses" element={<EnrolledCourses />} />
  <Route path="/assignments" element={<MyAssignments />} />
  <Route path="/grades" element={<MyGrades />} />
  <Route path="/sessions" element={<StudySessions />} />
  <Route path="/xp" element={<XPDashboard />} />
  <Route path="/ai-chat" element={<AIChat />} />
</Route>

// Protected teacher routes
<Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
  <Route path="/dashboard" element={<TeacherDashboard />} />
  <Route path="/courses/manage" element={<ManageCourses />} />
  <Route path="/assignments/grade" element={<GradeSubmissions />} />
  <Route path="/attendance" element={<MarkAttendance />} />
</Route>

// Protected parent routes
<Route element={<ProtectedRoute allowedRoles={["parent"]} />}>
  <Route path="/dashboard" element={<ParentDashboard />} />
  <Route path="/child/:studentId" element={<ChildAnalytics />} />
</Route>
```

---

## Phase 4: Per-Domain Integration
Create one service file per API domain in `frontend/src/services/`, plus corresponding pages in `frontend/src/pages/`:

### 4.1 Courses
- Service: `courseService.ts`
  - Methods: `listCourses()`, `createCourse()`, `getCourse()`, `updateCourse()`, `deleteCourse()`, `enroll()`, `listLessons()`, `createLesson()`, `joinLesson()`
- Pages: `CourseList.tsx`, `CourseDetail.tsx`, `CreateCourse.tsx` (teacher), `MyCourses.tsx` (student)

### 4.2 Assignments & Submissions
- Service: `assignmentService.ts`
  - Methods: `listAssignments()`, `createAssignment()`, `getAssignment()`, `submitAssignment()`, `listSubmissions()`, `gradeSubmission()`
- Pages: `AssignmentList.tsx`, `AssignmentDetail.tsx`, `SubmitAssignment.tsx` (student), `GradeSubmission.tsx` (teacher)

### 4.3 Attendance
- Service: `attendanceService.ts`
  - Methods: `listRecords()`, `markAttendance()`, `getLessonAttendance()`
- Pages: `AttendanceDashboard.tsx` (teacher), `MyAttendance.tsx` (student)

### 4.4 Grades & GPA
- Service: `gradeService.ts`
  - Methods: `listGrades()`, `getGPA()`
- Pages: `GradesList.tsx`, `GPAView.tsx`

### 4.5 Notifications
- Service: `notificationService.ts`
  - Methods: `listNotifications()`, `markAsRead()`, `markAllAsRead()`
- Components: `NotificationBell.tsx` (header), `NotificationList.tsx`

### 4.6 Sessions & XP (Student Only)
- Services: `sessionService.ts`, `xpService.ts`
  - Methods: `startSession()`, `endSession()`, `getTotalStudyTime()`, `getTotalXP()`, `getXPHistory()`
- Pages: `StudyDashboard.tsx`, `XPDashboard.tsx`

### 4.7 Parent Dashboard
- Service: `parentService.ts`
  - Methods: `getChildDashboard()`
- Pages: `ParentDashboard.tsx`, `ChildAnalytics.tsx`

### 4.8 AI Chat (Student Only)
- Service: `aiService.ts`
  - Methods: `chat(message)`
- Pages: `AIChat.tsx`

---

## Phase 5: UX & Error Handling
- Add loading states (spinners) for all API calls
- Add error toasts: Use `react-hot-toast` (justification: lightweight, minimal config; alternative: native Notification API for simple cases)
- Handle token expiration: Auto-redirect to login with "Session expired" message
- Form validation: Match API schema rules (e.g., password min 8 chars, email format, required fields)
- Optimistic updates for low-risk actions (e.g., marking notifications as read)

---

## Phase 6: Testing
- Unit tests: Mock API calls in service layer tests (`npm test`)
- Integration tests: Validate auth flow, token refresh, role-based route access
- Run `npm run lint` after all changes per CLAUDE.md guidelines

---

## Appendix
### JWT Auth Flow Recap
1. Login → receive `access` (60min) + `refresh` (7d) tokens
2. Attach `Bearer <access>` to all protected requests
3. On 401 → refresh token → retry request
4. Logout → blacklist refresh token via `POST /auth/logout/`

### Role Permissions Matrix
| Feature | Student | Teacher | Parent | School Admin |
|---------|---------|---------|--------|--------------|
| Enroll in courses | ✅ | ❌ | ❌ | ❌ |
| Create/manage courses | ❌ | ✅ | ❌ | ❌ |
| Submit assignments | ✅ | ❌ | ❌ | ❌ |
| Grade submissions | ❌ | ✅ | ❌ | ❌ |
| Mark attendance | ❌ | ✅ | ❌ | ❌ |
| Join lessons (auto-attendance) | ✅ | ❌ | ❌ | ❌ |
| Manage enrollment codes | ❌ | ❌ | ❌ | ✅ |
| View child dashboard | ❌ | ❌ | ✅ | ❌ |

### Reference
- Full API endpoint list: `Grow Educational Platform API.yaml` lines 24-1874
- OpenAPI schemas: `Grow Educational Platform API.yaml` lines 1885-2860
