export interface SchoolKPIs {
  totalStudents: number;
  studentGrowthPercent: number;
  totalTeachers: number;
  newHires: number;
  totalClasses: number;
  gradesSpanned: number;
}

export interface Alert {
  id: string;
  severity: "warning" | "critical";
  message: string;
  context: string;
  targetId?: string;
}

export interface ClassSummary {
  id: string;
  name: string;
  studentCount: number;
  teacherCount: number;
  activeAlerts?: number;
}

export interface Student {
  id: string;
  name: string;
  score: number;
  maxScore: number;
  rank: number;
  alertId?: string;
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  rating: number;
  maxRating: number;
  trend: "improving" | "declining" | "stable";
  avatarInitials: string;
}

export const mockSchoolKPIs: SchoolKPIs = {
  totalStudents: 856,
  studentGrowthPercent: 5.2,
  totalTeachers: 50,
  newHires: 3,
  totalClasses: 30,
  gradesSpanned: 6,
};

export const mockGlobalAlerts: Alert[] = [
  { id: "a1", severity: "warning", message: "", context: "" },
  { id: "a2", severity: "critical", message: "", context: "" },
  { id: "a3", severity: "warning", message: "", context: "" },
];

export const mockClassSummaries: ClassSummary[] = [
  { id: "c1", name: "Class 9A", studentCount: 38, teacherCount: 4, activeAlerts: 2 },
  { id: "c2", name: "Class 9B", studentCount: 35, teacherCount: 4, activeAlerts: 1 },
  { id: "c3", name: "Class 9C", studentCount: 32, teacherCount: 4 },
  { id: "c4", name: "Class 10A", studentCount: 36, teacherCount: 2, activeAlerts: 1 },
  { id: "c5", name: "Class 10B", studentCount: 34, teacherCount: 2 },
  { id: "c6", name: "Class 10C", studentCount: 33, teacherCount: 2 },
];

export const mockClass9AStudents: Student[] = [
  { id: "s1", name: "Emma Johnson", score: 98.5, maxScore: 100, rank: 1 },
  { id: "s2", name: "Liam Smith", score: 96.2, maxScore: 100, rank: 2 },
  { id: "s3", name: "Olivia Williams", score: 94.8, maxScore: 100, rank: 3 },
  { id: "s4", name: "Noah Brown", score: 93.1, maxScore: 100, rank: 4 },
];

export const mockClass9AAlerts: Alert[] = [
  { id: "ca1", severity: "warning", context: "Parent Call", message: "Ethan Martinez", targetId: "s5" },
  { id: "ca2", severity: "critical", context: "Expelled", message: "James Anderson", targetId: "s6" },
  { id: "ca3", severity: "warning", context: "Suspended 7d", message: "Mason Rodriguez", targetId: "s7" },
];

export const mockClass9ATeachers: Teacher[] = [
  { id: "t1", name: "Dr. Sarah Mitchell", subject: "Mathematics", rating: 4.8, maxRating: 5, trend: "improving", avatarInitials: "DSM" },
  { id: "t2", name: "Prof. Michael Chen", subject: "Science", rating: 4.6, maxRating: 5, trend: "stable", avatarInitials: "PMC" },
  { id: "t3", name: "Ms. Jennifer Taylor", subject: "English", rating: 4.9, maxRating: 5, trend: "improving", avatarInitials: "MJT" },
  { id: "t4", name: "Mr. David Kumar", subject: "History", rating: 4.5, maxRating: 5, trend: "declining", avatarInitials: "MDK" },
];
