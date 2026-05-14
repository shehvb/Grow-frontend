# Phase 1: Data Model & Contracts

These TypeScript interfaces map to the schemas defined in `Grow Educational Platform API.yaml`. They will be placed in `src/features/courses/types.ts`.

## Entities

```typescript
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
```

## Validation Rules
- `SubmissionCreateRequest`: Only one submission allowed per student per assignment.
- `SubmissionGradeRequest`: `score` should be validated based on the assignment's max score (if applicable).
- Teacher API actions (`POST`, `PUT`, `DELETE` courses, lessons, assignments) will return 403 if the current user is not a teacher or does not own the course.
