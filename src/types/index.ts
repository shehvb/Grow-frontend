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
  assignments?: StudentAssignment[];
}

export interface StudentAssignment {
  id: string | number;
  title: string;
  deadline?: string; // ISO format
  due_date?: string; // ISO format
  xp_reward: number | null;
  teacher_file_url?: string | null;
  teacher_file?: string | null;
  submission_status: "pending" | "graded" | "missing" | "submitted";
  score?: string | null;
  feedback?: string | null;
  xp_awarded?: number | null;
  late_penalty_xp?: number | null;
  description?: string | null;
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: (string | { text: string; is_correct?: boolean })[];
}

export interface QuizStart {
  quiz_id: number;
  title: string;
  time_limit_seconds: number | null;
  questions: QuizQuestion[];
}

export interface StudentQuizResult {
  score: string;
  percentage: number;
  passed: boolean;
  xp_awarded: number;
}

export interface Submission {
  id: number;
  assignment: number;
  student: number;
  content?: string;
  status: "pending" | "graded";
  score?: number;
  feedback?: string;
  submitted_at: string;
}
