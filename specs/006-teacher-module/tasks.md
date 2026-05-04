# Implementation Tasks: Teacher Module

This document contains atomic tasks for the incremental build of the Teacher module.

---

## PHASE 1: Layout + Routing (Foundation)

### Task 1.1: Define Teacher Module Types
- **File Path**: `src/types/teacher.types.ts`
- **Purpose**: Establish the data contracts for teachers, courses, lessons, and assessments.
- **Dependencies**: None.
- **Reusable Components**: None.
- **API Hooks**: None.
- **Expected Output**: Exported interfaces for `ITeacher`, `ICourse`, `ILesson`, `IAssignment`, `IQuiz`, and `IAttendance`.

### Task 1.2: Create Teacher Sidebar Component
- **File Path**: `src/features/teacher/components/TeacherSidebar.tsx`
- **Purpose**: Specialized navigation sidebar for teacher-specific features.
- **Dependencies**: `react-router-dom`, `react-icons`.
- **Reusable Components**: `SidebarItem`.
- **API Hooks**: None.
- **Expected Output**: A collapsible sidebar with links to Dashboard, Courses, Assignments, Quizzes, Students, and Attendance.

### Task 1.3: Create Teacher Layout
- **File Path**: `src/layouts/TeacherLayout.tsx`
- **Purpose**: Main shell for all teacher-facing pages.
- **Dependencies**: `TeacherSidebar`.
- **Reusable Components**: `Header`, `NotificationBell`.
- **API Hooks**: `useTeacherProfile()`.
- **Expected Output**: A layout component that renders the sidebar, header, and an `<Outlet />` for nested routes.

### Task 1.4: Register Teacher Routes
- **File Path**: `src/App.tsx`
- **Purpose**: Integrate the teacher module into the application's routing system.
- **Dependencies**: `TeacherLayout`, `TeacherDashboardPage` (placeholder).
- **Reusable Components**: None.
- **API Hooks**: None.
- **Expected Output**: New routes under `/dashboard/teacher` using `TeacherLayout`.

---

## PHASE 2: Dashboard Analytics

### Task 2.1: Create KPI Stat Card
- **File Path**: `src/components/ui/KPIStatCard.tsx`
- **Purpose**: Visually represent key metrics on the dashboard.
- **Dependencies**: `lucide-react` or `react-icons`.
- **Reusable Components**: `Card`, `Badge`.
- **API Hooks**: None.
- **Expected Output**: A card component that accepts `label`, `value`, `icon`, and `trend` (up/down).

### Task 2.2: Implement Teacher Dashboard Page
- **File Path**: `src/features/teacher/dashboard/TeacherDashboardPage.tsx`
- **Purpose**: Central hub for teacher metrics and activity.
- **Dependencies**: `KPIStatCard`, `Recharts`.
- **Reusable Components**: `SectionHeader`.
- **API Hooks**: `useTeacherStats()`.
- **Expected Output**: A grid of KPI cards and a performance trend chart (Bar/Area chart).

---

## PHASE 3: Courses + Lessons

### Task 3.1: Course List View
- **File Path**: `src/features/teacher/courses/CourseListPage.tsx`
- **Purpose**: Display all courses managed by the teacher.
- **Dependencies**: `ICourse`.
- **Reusable Components**: `CourseCard`, `Button`.
- **API Hooks**: `useTeacherCourses()`.
- **Expected Output**: A grid of course cards with "Edit" and "Publish" actions.

### Task 3.2: Create Course Form
- **File Path**: `src/features/teacher/courses/CreateCoursePage.tsx`
- **Purpose**: Interface for initiating a new course.
- **Dependencies**: `react-hook-form`, `zod`.
- **Reusable Components**: `Input`, `Textarea`, `FileUpload`.
- **API Hooks**: `useCreateCourse()`.
- **Expected Output**: A form that validates and submits new course data.

### Task 3.3: Lesson Management Accordion
- **File Path**: `src/features/teacher/courses/components/LessonManager.tsx`
- **Purpose**: Add, edit, and reorder lessons within a course.
- **Dependencies**: `dnd-kit` or `react-beautiful-dnd`.
- **Reusable Components**: `Accordion`, `LessonItem`.
- **API Hooks**: `useUpdateLessons()`.
- **Expected Output**: A drag-and-drop list of lessons with "Add Lesson" functionality.

---

## PHASE 4: Assignments

### Task 4.1: Assignment Creation Builder
- **File Path**: `src/features/teacher/assignments/AssignmentBuilder.tsx`
- **Purpose**: Define assignment tasks, deadlines, and rewards.
- **Dependencies**: `react-datepicker`, `IAssignment`.
- **Reusable Components**: `RichTextEditor`, `FileUploader`.
- **API Hooks**: `useCreateAssignment()`.
- **Expected Output**: A builder interface for configuring classroom assignments.

### Task 4.2: Submission Review Interface
- **File Path**: `src/features/teacher/assignments/SubmissionReview.tsx`
- **Purpose**: Interface for teachers to grade student work.
- **Dependencies**: `ISubmission`.
- **Reusable Components**: `FeedbackInput`, `GradeSelector`.
- **API Hooks**: `useGradeSubmission()`.
- **Expected Output**: A split-pane view showing the student's file/text and the teacher's grading panel.

---

## PHASE 5: Quizzes

### Task 5.1: Quiz Question Builder
- **File Path**: `src/features/teacher/quizzes/QuizBuilder.tsx`
- **Purpose**: Create multiple-choice questions for quizzes.
- **Dependencies**: `IQuiz`, `IQuestion`.
- **Reusable Components**: `RadioGroup`, `QuestionInput`.
- **API Hooks**: `useCreateQuiz()`.
- **Expected Output**: A dynamic form where teachers can add/remove questions and mark correct answers.

---

## PHASE 6: Students

### Task 6.1: Student Directory Table
- **File Path**: `src/features/teacher/students/StudentDirectoryPage.tsx`
- **Purpose**: Monitor all students in the teacher's classes.
- **Dependencies**: `IStudentSummary`.
- **Reusable Components**: `DataTable`, `SearchBar`.
- **API Hooks**: `useClassroomStudents()`.
- **Expected Output**: A sortable table showing student name, XP, engagement, and last activity.

---

## PHASE 7: Attendance

### Task 7.1: Daily Attendance Marker
- **File Path**: `src/features/teacher/attendance/AttendanceTracker.tsx`
- **Purpose**: Quick marking of student presence.
- **Dependencies**: `IAttendance`.
- **Reusable Components**: `StatusToggleGroup`.
- **API Hooks**: `useMarkAttendance()`.
- **Expected Output**: A checklist of students with Present/Absent/Late status buttons.

---

## PHASE 8: Settings

### Task 8.1: Teacher Profile Settings
- **File Path**: `src/features/teacher/settings/TeacherSettingsPage.tsx`
- **Purpose**: Manage personal and notification preferences.
- **Dependencies**: `ITeacher`.
- **Reusable Components**: `ProfileForm`, `NotificationToggles`.
- **API Hooks**: `useUpdateTeacherSettings()`.
- **Expected Output**: A multi-tab settings page for profile, security, and alerts.

---

## PHASE 9: API Integration Readiness

### Task 9.1: Mock Service Implementation
- **File Path**: `src/services/teacher.mock.ts`
- **Purpose**: Provide high-fidelity mock responses for all teacher endpoints.
- **Dependencies**: All Teacher Types.
- **Reusable Components**: None.
- **API Hooks**: None.
- **Expected Output**: A complete service file that simulates API latency and returns realistic data structures.

### Task 9.2: Create Teacher API Service
- **File Path**: `src/services/teacher.service.ts`
- **Purpose**: Axios/Fetch client for live backend integration.
- **Dependencies**: `axios`.
- **Reusable Components**: None.
- **API Hooks**: None.
- **Expected Output**: A production-ready service class with methods matching the implementation plan.
