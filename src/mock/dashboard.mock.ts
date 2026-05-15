export interface LeaderboardEntry {
  rank: number;
  name: string;
  xp: string;
  isMe: boolean;
  bgTheme: string;
}

export interface UpcomingSession {
  day: string;
  month: string;
  title: string;
  time: string;
}

export interface DashboardData {
  dailyMasteryProgress: number;
  totalXp: number;
  xpChange: string;
  streakDays: number;
  todayTasks: Task[];
  weeklyTarget: number;
  weeklyProgress: number;
  leaderboard: LeaderboardEntry[];
  upcomingSession: UpcomingSession;
}

export interface Task {
  id: string;
  title: string;
  subject: string;
  time: string;
  status: "pending" | "priority" | "completed";
  badge?: string;
  hasClock?: boolean;
}

export const dashboardMock: DashboardData = {
  dailyMasteryProgress: 72,
  totalXp: 2450,
  xpChange: "+15% from yesterday",
  streakDays: 12,
  todayTasks: [
    { id: "1", title: "Complete Module 4: Ecosystems", subject: "Science", time: "45 mins", status: "completed" },
    { id: "2", title: "Review Flashcards: Linear Algebra", subject: "Mathematics", time: "15 mins", status: "priority", badge: "DOING" },
    { id: "3", title: "Submit Lab: Pyramid builders", subject: "History", time: "60 mins", status: "pending", hasClock: true },
  ],
  weeklyTarget: 25,
  weeklyProgress: 23,
  leaderboard: [
    { rank: 1, name: "Sarah W.", xp: "12,450", isMe: false, bgTheme: "bg-[#2A1BE0]" },
    { rank: 2, name: "Ali A.", xp: "11,200", isMe: false, bgTheme: "bg-[#2A1BE0]" },
    { rank: 7, name: "You", xp: "2,450", isMe: true, bgTheme: "bg-[#4D008D]" },
  ],
  upcomingSession: {
    day: "24",
    month: "OCT",
    title: "Advanced Data Visualization",
    time: "14:00 - 15:30",
  },
};

export const getDashboardData = (): DashboardData => {
  return dashboardMock;
};

export const getUser = (): User => {
  return {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://via.placeholder.com/150",
  };
};
export interface User {
  name: string;
  email: string;
  avatar: string;
}