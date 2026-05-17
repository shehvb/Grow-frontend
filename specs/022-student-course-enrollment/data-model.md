# Data Model: Student Course List and Enrollment

## TypeScript Interfaces

### Course Entity
Represents a course available on the platform.

```typescript
export interface Course {
  id: number;
  title: string;
  description: string;
  teacher: number; // ID of the teacher
  teacher_name?: string;
  school?: number;
  subject?: number;
  subject_name?: string;
  grade?: number;
  grade_name?: string;
  thumbnail?: string;
  created_at?: string;
  updated_at?: string;
  is_enrolled?: boolean; // Derived or provided by backend
  lesson_count?: number;
}
```

### Lesson Entity
Represents a lesson inside a course.

```typescript
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
```

### API Responses

```typescript
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
```

## State Transitions
1. **Unenrolled -> Enrolled**: When the student clicks "Enroll", a POST request is sent to `/api/v1/courses/{id}/enroll/`. On success, the frontend state updates the course's `is_enrolled` property to `true` (or adds it to an `enrolledCourses` array) to instantly update the UI.
