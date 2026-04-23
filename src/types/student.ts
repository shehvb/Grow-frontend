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
