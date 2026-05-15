import type { FC } from "react";
import { useAuthStore } from "../../../store/authStore";
import { 
  FiUsers, 
  FiBookOpen, 
  FiCheckSquare, 
  FiAward
} from "react-icons/fi";
import KPIStatCard from "../components/KPIStatCard";
import { useTeacherStats } from "../hooks/useTeacherStats";
import PerformanceChart from "./components/PerformanceChart";
import StudentPerformers from "./components/StudentPerformers";
import RecentActivityTable from "./components/RecentActivityTable";
import NewFeatureBanner from "./components/NewFeatureBanner";

// Mocks removed since they are now mapped in the hook

const TeacherDashboardPage: FC = () => {
  const { stats, loading } = useTeacherStats();
  const { user } = useAuthStore();

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Welcome back, {user?.first_name ? `${user.first_name} ${user.last_name || ''}` : "Teacher"}</h1>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPIStatCard 
          label="Total Students" 
          value={stats.totalStudents.toString()} 
          icon={<FiUsers className="text-xl" />} 
          trend={{ value: "+2% from Last month", isUp: true }}
          iconBgColor="bg-indigo-100"
          iconTextColor="text-indigo-600"
        />
        <KPIStatCard 
          label="Total Courses" 
          value={stats.totalCourses.toString()} 
          icon={<FiBookOpen className="text-xl" />} 
          iconBgColor="bg-orange-100"
          iconTextColor="text-orange-500"
        />
        <KPIStatCard 
          label="Assignments Created" 
          value={stats.activeAssignments.toString()} 
          icon={<FiCheckSquare className="text-xl" />} 
          trend={{ value: "+12% this week", isUp: true }}
          iconBgColor="bg-pink-100"
          iconTextColor="text-pink-500"
        />
        <KPIStatCard 
          label="Active Quizzes" 
          value={stats.activeQuizzes.toString()} 
          icon={<FiAward className="text-xl" />} 
          trend={{ value: "-1% vs yesterday", isUp: false }}
          iconBgColor="bg-red-100"
          iconTextColor="text-red-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PerformanceChart data={stats.performanceTrend} />
        <StudentPerformers 
          topPerformance={stats.topPerformance} 
          needReview={stats.needReview} 
        />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentActivityTable recentActivity={stats.recentActivity} />
        <NewFeatureBanner />
      </div>
    </div>
  );
};

export default TeacherDashboardPage;