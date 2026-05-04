import type { TeacherStats, ClassroomStudent } from "../../../types/teacher";

export const MOCK_TEACHER_STATS: TeacherStats = {
  totalStudents: 124,
  totalCourses: 8,
  activeAssignments: 12,
  activeQuizzes: 5,
  performanceTrend: [
    { date: "Mon", avgScore: 78, engagement: 82 },
    { date: "Tue", avgScore: 82, engagement: 85 },
    { date: "Wed", avgScore: 75, engagement: 80 },
    { date: "Thu", avgScore: 88, engagement: 92 },
    { date: "Fri", avgScore: 84, engagement: 88 },
    { date: "Sat", avgScore: 80, engagement: 70 },
    { date: "Sun", avgScore: 82, engagement: 75 },
  ],
  recentActivity: [
    { id: "1", type: "submission", message: "Youssef Ahmed submitted 'Math Assignment 1'", timestamp: "10 mins ago", studentName: "Youssef Ahmed" },
    { id: "2", type: "system", message: "New course 'Advanced Physics' published successfully", timestamp: "2 hours ago" },
    { id: "3", type: "quiz", message: "5 students completed 'Weekly Bio Quiz'", timestamp: "3 hours ago" },
    { id: "4", type: "submission", message: "Lila Aly submitted 'Chemistry Lab Report'", timestamp: "5 hours ago", studentName: "Lila Aly" },
  ],
  needsReview: [
    { id: "1", studentName: "Youssef Ahmed", assignmentTitle: "Calculus Homework", submittedAt: "2 hours ago" },
    { id: "2", studentName: "Mariam Ali", assignmentTitle: "Physics Essay", submittedAt: "4 hours ago" },
    { id: "3", studentName: "Omar Hassan", assignmentTitle: "History Quiz", submittedAt: "1 day ago" },
  ]
};

export const MOCK_STUDENTS: ClassroomStudent[] = [
  {
    id: "s1",
    name: "Youssef Ahmed",
    classId: "c1",
    className: "Grade 10 - A",
    totalXp: 1240,
    averageScore: 88,
    attendanceRate: 95,
    engagement: 92,
    lastActivity: "2 mins ago"
  },
  {
    id: "s2",
    name: "Lila Aly",
    classId: "c1",
    className: "Grade 10 - A",
    totalXp: 980,
    averageScore: 82,
    attendanceRate: 88,
    engagement: 85,
    lastActivity: "1 hour ago"
  }
];
