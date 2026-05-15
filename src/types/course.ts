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
  grade?: number;
}

export interface Enrollment {
  id: number;
  student: User;
  enrolled_at: string;
}

export interface CourseWriteRequest {
  title: string;
  description?: string;
  grade?: number | null; // API expects an integer (e.g. 10), not a string ("Grade 10")
  is_published?: boolean;
}

export type TeacherLessonStatus = 'draft' | 'published';

export interface TeacherLesson {
  id: number;
  title: string;
  content: string;
  order: number;
  status: TeacherLessonStatus;
  video_url?: string;
  video_file?: string;
  pdf_file?: string;
  resources?: string;
  xp_reward: number;
  bonus_xp: number;
}

export interface TeacherLessonWriteRequest {
  title: string;
  content: string;
  order: number;
  status?: TeacherLessonStatus;
  video_url?: string;
  video_file?: File | null;
  pdf_file?: File | null;
  resources?: File | null;
  xp_reward: number;
  bonus_xp: number;
}

export interface StudentLesson {
  id: number;
  title: string;
  is_completed: boolean;
}
