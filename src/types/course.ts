import type { User } from './auth';

export interface Course {
  id: number;
  title: string;
  description?: string;
  teacher: User;
  created_at: string;
  status?: string;
  lessonsCount?: number;
  studentsCount?: number;
  xpCount?: number;
}

export interface Enrollment {
  id: number;
  student: User;
  enrolled_at: string;
}

export interface CourseWriteRequest {
  title: string;
  description?: string;
}
