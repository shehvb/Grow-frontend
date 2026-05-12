import type { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import LandingPage from "./pages/landingPage";

// Auth
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LoginParent from "./components/auth/LoginParent";
import LoginStudent from "./components/auth/LoginStudent";
import LoginTeacher from "./components/auth/LoginTeacher";
import Signup from "./components/auth/Signup";
import ForgotPassword from "./components/auth/ForgotPassword";

// Layouts
import StudentLayout from "./layouts/StudentLayout";
import ParentLayout from "./layouts/ParentLayout";
import AITutorLayout from "./layouts/AITutorLayout";
import CourseLayout from "./layouts/CourseLayout";

// Features
import DashboardPage from "./features/dashboard/DashboardPage";
import CoursesPage from "./features/courses/CoursesPage";
import CourseDetailsPage from "./features/courses/CourseDetailsPage";
import QuizPlayerPage from "./features/quiz/QuizPlayerPage";
import TasksPage from "./features/tasks/TasksPage";
import AITutorPage from "./features/ai/AITutorPage";
import CommunicationLayout from "./features/communication/CommunicationLayout";
import ChatPage from "./features/communication/ChatPage";
import ChannelsPage from "./features/communication/ChannelsPage";
import SettingsPage from "./features/settings/SettingsPage";
import ParentDashboardPage from "./features/parent/ParentDashboardPage";
import ParentReportsPage from "./features/parent/ParentReportsPage";
import AttendancePage from "./features/parent/AttendancePage";
import AnalyticsPage from "./features/parent/AnalyticsPage";
import AddStudentPage from "./features/parent/add-student/AddStudentPage";
import ParentSettingsPage from "./features/parent/SettingsPage";

import NotificationsPage from "./features/notifications/NotificationsPage";
import ParentCommunicationLayout from "./features/parent/communication/ParentCommunicationLayout";
import ParentChatPage from "./features/parent/communication/ParentChatPage";

// Teacher Module
import TeacherLayout from "./layouts/TeacherLayout";
import TeacherDashboardPage from "./features/teacher/dashboard/TeacherDashboardPage";
import CourseListPage from "./features/teacher/courses/CourseListPage";
import CourseEditorPage from "./features/teacher/courses/CourseEditorPage";
import LessonEditorPage from "./features/teacher/courses/LessonEditorPage";
import AssignmentListPage from "./features/teacher/assignments/AssignmentListPage";
import CreateAssignmentPage from "./features/teacher/assignments/CreateAssignmentPage";
import ReviewSubmissionsPage from "./features/teacher/assignments/ReviewSubmissionsPage";
import QuizListPage from "./features/teacher/quizzes/QuizListPage";
import QuizBuilderPage from "./features/teacher/quizzes/QuizBuilderPage";
import QuizResultsPage from "./features/teacher/quizzes/QuizResultsPage";
// import TeacherAttendancePage from "./features/teacher/attendance/AttendancePage";
import TeacherNotificationsPage from "./features/teacher/notifications/NotificationsPage";
import TeacherSettingsPage from "./features/teacher/settings/SettingsPage";
import TeacherStudentsPage from "./features/teacher/students/StudentsPage";

// Admin Module
import AdminLayout from "./layouts/AdminLayout";
import { AdminDashboardPage } from "./features/admin/pages/AdminDashboardPage";
import { ClassDetailsPage } from "./features/admin/pages/ClassDetailsPage";
import { ReportsAnalyticsPage } from "./features/admin/pages/ReportsAnalyticsPage";

const App: FC = () => {
  return (
    <Routes>
      {/* Landing Page - الصفحة الرئيسية */}
      <Route path="/" element={<LandingPage />} />

      {/* Auth Routes */}
      <Route path="/login" element={<Navigate to="/login/student" replace />} />
      <Route path="/signup" element={<Navigate to="/signup/student" replace />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/signup/:role" element={<Signup />} />

      <Route path="/login/parent" element={<LoginParent />} />
      <Route path="/login/student" element={<LoginStudent />} />
      <Route path="/login/teacher" element={<LoginTeacher />} />

      {/* Student Routes */}
      <Route path="/student" element={<ProtectedRoute allowedRoles={['student']}><StudentLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
      </Route>

      {/* Courses Dedicated Route */}
      <Route path="/student/courses" element={<ProtectedRoute allowedRoles={['student']}><CourseLayout /></ProtectedRoute>}>
        <Route path=":id" element={<CourseDetailsPage />} />
        <Route path=":courseId/quiz/:quizId" element={<QuizPlayerPage />} />
      </Route>

      {/* AI Tutor Dedicated Route */}
      <Route path="/student/ai-tutor" element={<ProtectedRoute allowedRoles={['student']}><AITutorLayout /></ProtectedRoute>}>
        <Route index element={<AITutorPage />} />
      </Route>

      {/* Communication Dedicated Route */}
      <Route path="/student/communication" element={<ProtectedRoute allowedRoles={['student']}><CommunicationLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="chat" replace />} />
        <Route path="chat" element={<ChatPage />} />
        <Route path="channels" element={<ChannelsPage />} />
      </Route>

      {/* Parent Routes */}
      <Route path="/parent" element={<ProtectedRoute allowedRoles={['parent']}><ParentLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<ParentDashboardPage />} />
        <Route path="reports" element={<ParentReportsPage />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="add-student" element={<AddStudentPage />} />
        <Route path="settings" element={<ParentSettingsPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
      </Route>

      {/* Parent Communication Dedicated Route */}
      <Route path="/parent/communication" element={<ProtectedRoute allowedRoles={['parent']}><ParentCommunicationLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="chat" replace />} />
        <Route path="chat" element={<ParentChatPage />} />
      </Route>

      {/* Teacher Routes */}
      <Route path="/teacher" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<TeacherDashboardPage />} />
        <Route path="courses" element={<CourseListPage />} />
        <Route path="courses/:id" element={<CourseEditorPage />} />
        <Route path="courses/:id/lessons/new" element={<LessonEditorPage />} />
        <Route path="courses/:id/lessons/:lessonId" element={<LessonEditorPage />} />
        <Route path="assignments" element={<AssignmentListPage />} />
        <Route path="assignments/new" element={<CreateAssignmentPage />} />
        <Route path="assignments/:id/review" element={<ReviewSubmissionsPage />} />
        <Route path="quizzes" element={<QuizListPage />} />
        <Route path="quizzes/new" element={<QuizBuilderPage />} />
        <Route path="quizzes/:id/edit" element={<QuizBuilderPage />} />
        <Route path="quizzes/:id/results" element={<QuizResultsPage />} />
        <Route path="students" element={<TeacherStudentsPage />} />
        {/* <Route path="attendance" element={<TeacherAttendancePage />} /> */}
        <Route path="settings" element={<TeacherSettingsPage />} />
        <Route path="notifications" element={<TeacherNotificationsPage />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="class/:id" element={<ClassDetailsPage />} />
        <Route path="reports" element={<ReportsAnalyticsPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;