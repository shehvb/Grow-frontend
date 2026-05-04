import type { Course, Lesson, Submission } from "./index";

export interface ITeacher {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  school?: string;
  subjects?: string[];
  role: "TEACHER";
  createdAt: string;
}

export interface TeacherStats {
  totalStudents: number;
  totalCourses: number;
  activeAssignments: number;
  activeQuizzes: number;
  performanceTrend: {
    date: string;
    avgScore: number;
    engagement: number;
  }[];
  recentActivity: {
    id: string;
    type: "submission" | "course" | "quiz" | "system";
    message: string;
    timestamp: string;
    studentName?: string;
  }[];
  needsReview: {
    id: string;
    studentName: string;
    studentAvatar?: string;
    assignmentTitle: string;
    submittedAt: string;
  }[];
}

export interface ClassroomStudent {
  id: string;
  name: string;
  avatar?: string;
  classId: string;
  className: string;
  totalXp: number;
  averageScore: number;
  attendanceRate: number;
  engagement: number;
  lastActivity: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  status: "present" | "absent" | "late";
  classId: string;
}

export interface SubmissionReview extends Submission {
  studentName: string;
  studentAvatar?: string;
  assignmentTitle: string;
  courseTitle: string;
  content?: string; // Text response if applicable
  feedback?: string;
  grade?: number;
}

export interface TeacherCourse extends Course {
  enrolledStudents: number;
  lastUpdated: string;
  lessons: TeacherLesson[];
}

export interface TeacherLesson extends Lesson {
  resources: {
    id: string;
    name: string;
    type: "pdf" | "doc" | "ppt" | "video";
    url: string;
  }[];
  xpValue: number;
}
