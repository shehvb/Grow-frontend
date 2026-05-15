import type { FC } from "react";
import { useAuthStore } from "../../store/authStore";
import { getDashboardData } from "../../mock/dashboard.mock";
import XPCard from "./XPCard";
import StreakCounter from "./StreakCounter";
import DailyMasteryProgressBar from "./DailyMasteryProgressBar";
import WeeklyGoalWidget from "./WeeklyGoalWidget";
import TodayTasksList from "./TodayTasksList";
import LeaderboardWidget from "./LeaderboardWidget";
import UpcomingSessionWidget from "./UpcomingSessionWidget";

const DashboardPage: FC = () => {
  const data = getDashboardData();
  const { user } = useAuthStore();
  
  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 space-y-8">
      <div className="mt-2 sm:mt-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 mb-2 sm:mb-3 tracking-tight">Welcome back, {user?.first_name || "Student"}</h1>
        <p className="text-slate-500 font-medium text-base sm:text-lg">You've completed <span className="text-[#FF8000] font-bold">{data.dailyMasteryProgress}%</span> of your daily goal. Keep it up!</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          <DailyMasteryProgressBar progress={data.dailyMasteryProgress} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <XPCard totalXp={data.totalXp} xpChange={data.xpChange} />
            <StreakCounter streakDays={data.streakDays} />
          </div>

          <TodayTasksList tasks={data.todayTasks} />
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-1 space-y-6 flex flex-col">
          <LeaderboardWidget leaderboard={data.leaderboard} />
          <WeeklyGoalWidget weeklyProgress={data.weeklyProgress} weeklyTarget={data.weeklyTarget} />
          <UpcomingSessionWidget session={data.upcomingSession} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
