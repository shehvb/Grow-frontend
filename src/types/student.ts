export interface StudentTask {
  id: string;
  title: string;
  context: string; // e.g., "AI Foundations • Due 2 days ago"
  xp: number;
  critical?: boolean;
  checked: boolean;
  isBlue?: boolean;
  category: "Past Due" | "Today" | "Upcoming";
}

export interface DashboardStats {
  dailyMasteryProgress: number;
  totalXp: number;
  streakDays: number;
  weeklyTarget: number;
  weeklyProgress: number;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  level: number;
  xpToNextLevel: number;
  currentLevelProgress: number;
}

export interface TodaysTask {
  title: string;
  subject: string | null;
  type: string;
  time_remaining: string | null;
  xp_reward: number;
  status: string;
}

export interface DailyMaster {
  tasks_total: number;
  tasks_completed: number;
  completion_percentage: number;
  level: number;
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  total_xp: number;
}

export interface StudentDashboard {
  total_xp: number;
  daily_streak: number;
  todays_tasks: TodaysTask[];
  daily_master: DailyMaster;
  leaderboard: LeaderboardEntry[];
}
