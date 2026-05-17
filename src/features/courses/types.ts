export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface Course {
  id: number;
  title: string;
  description: string;
  teacher: number;
  teacher_name?: string;
  school?: number;
  subject?: number;
  subject_name?: string;
  grade?: number;
  grade_name?: string;
  thumbnail?: string;
  created_at?: string;
  updated_at?: string;
  is_enrolled?: boolean;
  lesson_count?: number;
  progress?: number;
}

export interface CourseWriteRequest {
  title: string;
  description: string;
}

export interface Lesson {
  id: number;
  course: number;
  title: string;
  content: string;
  video_url?: string;
  video_file?: string;
  pdf_file?: string;
  order: number;
  status: 'draft' | 'published';
  xp_reward: number;
  bonus_xp: number;
  created_at?: string;
  updated_at?: string;
}

export interface LessonRequest {
  title: string;
  content: string;
  order: number;
}

export interface Assignment {
  id: number;
  course: number; // Course ID
  title: string;
  description: string;
  due_date: string;
}

export interface AssignmentWriteRequest {
  title: string;
  description: string;
  due_date: string;
}

export type SubmissionStatus = 'pending' | 'graded';

export interface Submission {
  id: number;
  assignment: number; // Assignment ID
  student: number; // Student ID
  content: string;
  status: SubmissionStatus;
  score?: number;
  feedback?: string;
  submitted_at: string;
}

export interface SubmissionCreateRequest {
  content: string;
}

export interface SubmissionGradeRequest {
  score: number;
  feedback?: string;
}

export type AttendanceStatus = 'present' | 'late' | 'absent' | 'rejected';

export interface AttendanceRecord {
  id: number;
  student_id: number;
  course_id: number;
  date: string;
  status: AttendanceStatus;
}
