export interface Course {
  id: number;
  title: string;
  description: string;
  teacher_id: number;
  created_at: string;
  updated_at: string;
}

export interface CourseWriteRequest {
  title: string;
  description: string;
}

export interface Lesson {
  id: number;
  course: number; // Course ID
  title: string;
  content: string;
  order: number;
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
