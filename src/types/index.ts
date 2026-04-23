export type CourseStatus = "not_started" | "in_progress" | "completed";
export type LessonStatus = "completed" | "in_progress" | "locked";

export interface Instructor {
  id: string;
  name: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string; // e.g., "15 min"
  status: LessonStatus;
  videoUrl?: string; // Optional for now
  description?: string;
}

export interface QuizSummary {
  id: string;
  title: string;
  questionCount: number;
  durationMinutes: number;
}

export interface Course {
  id: string;
  title: string;
  instructor: Instructor;
  progress: number;
  status: CourseStatus;
  lessonsCount: number;
}

// Detailed Course with related items
export interface CourseDetails extends Course {
  lessons: Lesson[];
  quizzes: QuizSummary[];
  assignments?: Assignment[];
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  deadline: string; // ISO format
  xpReward: number;
  latePenalty: number;
  fileUrl: string;
  fileName: string;
  instructions: string[];
}

export interface Submission {
  id?: string;
  assignmentId: string;
  fileName: string;
  fileSize?: string;
  submittedAt: string; // ISO format
  xpEarned?: number;
  status: "pending" | "graded" | "late";
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  durationMinutes: number;
  questions: Question[];
}

export interface QuizResult {
  quizId: string;
  scorePercentage: number;
  totalQuestions: number;
  correctAnswers: number;
  passed: boolean;
}
