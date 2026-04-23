export interface DashboardData {
  dailyMasteryProgress: number;
  totalXp: number;
  streakDays: number;
  todayTasks: Task[];
  weeklyTarget: number;
  weeklyProgress: number;
}

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  status: "pending" | "overdue" | "completed";
  category: "today" | "upcoming" | "overdue";
}

export const dashboardMock: DashboardData = {
  dailyMasteryProgress: 72,
  totalXp: 2450,
  streakDays: 12,
  todayTasks: [
    { id: "1", title: "Complete Math Quiz", dueDate: "2025-03-16", status: "pending", category: "today" },
    { id: "2", title: "Read Science Chapter 5", dueDate: "2025-03-16", status: "pending", category: "today" },
    { id: "3", title: "Practice Spanish Vocabulary", dueDate: "2025-03-16", status: "completed", category: "today" },
  ],
  weeklyTarget: 25,
  weeklyProgress: 23,
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