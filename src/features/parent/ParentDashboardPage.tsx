import type { FC } from "react";

import DashboardMetricsRow from "./components/DashboardMetricsRow";
import UpcomingScheduleList from "./components/UpcomingScheduleList";
import RecentActivityList from "./components/RecentActivityList";
import DashboardSubjectsList from "./components/DashboardSubjectsList";
import { useParentStore } from "../../store/parentStore";
import { useAuthStore } from "../../store/authStore";

const ParentDashboardPage: FC = () => {
  const { students, selectedStudentId, dashboardSummary, loading, error } = useParentStore();
  
  // Find current student based on store selection
  const currentStudent = students.find((s) => s.id === selectedStudentId);
  
  const { user } = useAuthStore();
  const parentName = user?.first_name || "Parent";

  // Show loading if we are fetching OR if the summary doesn't match the selected student yet
  const isDataMismatch = dashboardSummary && selectedStudentId && dashboardSummary.student.id !== selectedStudentId;
  
  if (loading || isDataMismatch) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-slate-500 font-bold animate-pulse">Loading dashboard...</p>
      </div>
    );
  }

  if (error && !dashboardSummary) {
    return <div className="p-12 text-center text-red-500 font-bold">{error}</div>;
  }

  if (students.length === 0) {
    return (
      <div className="p-12 text-center">
        <p className="text-slate-400 text-lg font-bold">No students linked to your account yet.</p>
        <p className="text-slate-500 text-sm mt-2">Please add a student to view their academic progress.</p>
      </div>
    );
  }

  // Use the student from the summary to ensure sync
  const displayedStudent = dashboardSummary?.student || currentStudent || students[0];
  const firstName = displayedStudent?.name?.split(" ")[0] || "Student";
  
  const metrics = dashboardSummary?.metrics || null;
  const upcomingSchedule = dashboardSummary?.upcomingSchedule || [];
  const recentActivities = dashboardSummary?.recentActivities || [];
  const topSubjects = dashboardSummary?.topSubjects || [];

  return (
    <div className="w-full space-y-8 pb-10 mt-6 relative px-4 sm:px-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Welcome back, {parentName}
          </h1>
          <p className="text-slate-500 font-medium mt-2">
            Here is {firstName}'s learning summary for this week.
          </p>
        </div>
      </div>

      <DashboardMetricsRow metrics={metrics} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <UpcomingScheduleList schedule={upcomingSchedule} />
          <RecentActivityList activities={recentActivities} />
        </div>

        <div className="lg:col-span-1">
          <DashboardSubjectsList subjects={topSubjects} />
        </div>
      </div>
    </div>
  );
};

export default ParentDashboardPage;