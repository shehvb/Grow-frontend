import { useEffect, type FC } from "react";
import { useAuthStore } from "../../store/authStore";
import { useStudentStore } from "../../store/useStudentStore";
import XPCard from "./XPCard";
import StreakCounter from "./StreakCounter";
import DailyMasteryProgressBar from "./DailyMasteryProgressBar";
import WeeklyGoalWidget from "./WeeklyGoalWidget";
import TodayTasksList from "./TodayTasksList";
import LeaderboardWidget from "./LeaderboardWidget";
import UpcomingSessionWidget from "./UpcomingSessionWidget";

const DashboardPage: FC = () => {
  const { user } = useAuthStore();
  const { dashboard, isLoading, error, fetchDashboardData } = useStudentStore();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (isLoading && !dashboard) {
    return (
      <div className="flex justify-center items-center h-full min-h-[500px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0098DA]"></div>
      </div>
    );
  }

  if (error && !dashboard) {
    return (
      <div className="flex justify-center items-center h-full min-h-[500px] text-red-500 font-medium">
        {error}
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="flex justify-center items-center h-full min-h-[500px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0098DA]"></div>
      </div>
    );
  }

  // Mock fallbacks for missing backend data
  const mockXpChange = "350";
  const mockWeeklyProgress = 75;
  const mockWeeklyTarget = 100;
  const mockUpcomingSession = {
    id: "1",
    title: "Advanced Mathematics",
    day: "15",
    month: "Jun",
    time: "10:00 AM - 11:30 AM",
    tutor: "Dr. Smith",
    meetingLink: "#"
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 space-y-8">
      <div className="mt-2 sm:mt-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 mb-2 sm:mb-3 tracking-tight">Welcome back, {user?.first_name || "Student"}</h1>
        <p className="text-slate-500 font-medium text-base sm:text-lg">You've completed <span className="text-[#FF8000] font-bold">{dashboard.daily_master?.completion_percentage || 0}%</span> of your daily goal. Keep it up!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          <DailyMasteryProgressBar
            progress={dashboard.daily_master?.completion_percentage || 0}
            level={dashboard.daily_master?.level || 1}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <XPCard totalXp={dashboard.total_xp || 0} xpChange={mockXpChange} />
            <StreakCounter streakDays={dashboard.daily_streak || 0} />
          </div>

          <TodayTasksList tasks={Array.isArray(dashboard.todays_tasks) ? dashboard.todays_tasks : []} />
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-1 space-y-6 flex flex-col">
          <LeaderboardWidget leaderboard={Array.isArray(dashboard.leaderboard) ? dashboard.leaderboard : []} />

          <WeeklyGoalWidget weeklyProgress={mockWeeklyProgress} weeklyTarget={mockWeeklyTarget} />
          <UpcomingSessionWidget session={mockUpcomingSession as any} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
