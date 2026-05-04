# Technical Implementation Plan: Teacher Module

This document outlines the technical architecture and implementation roadmap for the Teacher module in the **Grow** platform.

---

## 1. Route Structure
All teacher routes are isolated under the `/dashboard/teacher` prefix to ensure module encapsulation.

| Route | Component | Description |
| :--- | :--- | :--- |
| `/dashboard/teacher` | `Navigate` | Redirects to `/dashboard/teacher/home` |
| `/dashboard/teacher/home` | `TeacherDashboardPage` | KPI cards, performance charts, and activity feed. |
| `/dashboard/teacher/courses` | `CourseListPage` | List of managed courses with publish toggles. |
| `/dashboard/teacher/courses/new` | `CreateCoursePage` | Multi-step form for new course creation. |
| `/dashboard/teacher/courses/:id` | `CourseEditorPage` | Edit course details and manage lesson hierarchy. |
| `/dashboard/teacher/assignments` | `AssignmentManagerPage` | Create assignments and review submissions. |
| `/dashboard/teacher/quizzes` | `QuizManagerPage` | Quiz builder and results analytics. |
| `/dashboard/teacher/students` | `StudentDirectoryPage` | Searchable student list with performance deep-dives. |
| `/dashboard/teacher/attendance` | `AttendanceTrackerPage` | Daily marking and historical attendance trends. |
| `/dashboard/teacher/settings` | `TeacherSettingsPage` | Profile, notifications, and security settings. |

---

## 2. Reusable Components
*   **`KPIStatCard`**: Displays numeric stats (e.g., "Active Quizzes") with optional trend icons.
*   **`ResourceUploader`**: Drag-and-drop zone with progress bars for PDF, DOC, and Video files.
*   **`LessonAccordion`**: Collapsible list for reordering and editing lessons within a course.
*   **`AssessmentReviewCard`**: Summary card for pending submissions needing teacher review.
*   **`AttendanceGrid`**: Interactive table for marking multiple students (Present/Absent/Late).
*   **`RichContentEditor`**: Tiptap or Quill-based editor for lesson descriptions.

---

## 3. Page-Level Containers
*   **`DashboardContainer`**: Fetches KPI data and analytics snapshots; handles "Quick Actions" logic.
*   **`CourseBuilderContainer`**: Manages state for multi-step course creation and lesson serialization.
*   **`GradingContainer`**: Orchestrates the workflow for reviewing, scoring, and providing feedback on submissions.
*   **`StudentMonitorContainer`**: Handles filtering and sorting logic for the classroom directory.

---

## 4. Shared Layouts
*   **`TeacherLayout`**: 
    *   **Sidebar**: Contains Teacher-specific navigation (Dashboard, Courses, Students, etc.).
    *   **Header**: Global search, Notification bell (Teacher context), and User profile dropdown.
    *   **Breadcrumbs**: Dynamic navigation path tracking.

---

## 5. API Service Layer
`src/services/teacher.service.ts`:
*   `fetchTeacherStats()`: KPI and chart data.
*   `courses`: `getAll()`, `getById()`, `create()`, `update()`, `publish()`.
*   `assessments`: `createAssignment()`, `createQuiz()`, `gradeSubmission()`.
*   `students`: `getStudentList()`, `getStudentPerformance()`.
*   `attendance`: `markDaily()`, `getTrends()`.

---

## 6. State Management
*   **`teacherStore` (Zustand)**:
    *   `teacherData`: Current teacher profile.
    *   `activeCourses`: List of courses managed by the teacher.
    *   `pendingReviews`: Count of submissions awaiting grading.
*   **`contentDraftStore`**: Temporary storage for unsaved course or assignment edits.

---

## 7. Entity Interfaces / Types
`src/types/teacher.types.ts`:
*   `ITeacher`: Extends `IUser` with bio and school-specific metadata.
*   `ICourse`: Title, lessons, resources, and publishing metadata.
*   `IAssignment`: Instructions, deadlines, XP rewards, and attachments.
*   `IQuiz`: Time limits, question arrays, and grading logic.
*   `IStudentSummary`: Condensed view of student progress for teacher monitoring.

---

## 8. Backend Integration Points
*   **Base URL**: `/api/v1/teacher`
*   **Security**: All endpoints require `Role: TEACHER` JWT validation.
*   **Websockets**: `notifications` namespace for real-time submission alerts.

---

## 9. Validation Schemas (Zod)
*   **`CourseCreateSchema`**: Required title (5-100 chars), non-empty description.
*   **`AssignmentSchema`**: Deadline must be in the future; XP reward > 0.
*   **`QuizQuestionSchema`**: Exactly one correct answer; minimum 2 options.

---

## 10. File Upload Flow
1. User selects file in `ResourceUploader`.
2. Service generates a **Presigned URL** from the backend.
3. Frontend uploads directly to **S3/Cloudinary**.
4. Frontend sends the resulting URL and metadata back to the Grow API to link it to the Lesson/Assignment.

---

## 11. Chart Analytics Flow
*   **Data Structure**: API returns `Array<{ date: string, value: number, category: string }>`.
*   **Processing**: Transformation layer groups data by subject or class.
*   **Visualization**: `Recharts` using `<ResponsiveContainer>`, `<AreaChart>`, and `<BarChart>` for engagement and grade trends.

---

## Dependency Order for Implementation
1.  **Shared Types & Mock Data**: Establish the data contract.
2.  **TeacherLayout & Routing**: Build the shell and navigation.
3.  **API Service Skeleton**: Define the methods (starting with mocks).
4.  **Teacher Dashboard**: KPI cards and initial chart integration.
5.  **Course Management**: Course list and "New Course" wizard.
6.  **Lesson Editor**: Rich text and file upload integration.
7.  **Assessment Management**: Assignment and Quiz builders.
8.  **Grading & Feedback**: Reviewing student submissions.
9.  **Student Monitoring & Attendance**: Directory and attendance marking.
10. **Refinement**: Notifications and performance optimization.
