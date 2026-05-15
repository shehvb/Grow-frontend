# Phase 1: Data Model & Contracts

Based on `Grow Educational Platform API.yaml`, these are the relevant data entities we must align our TypeScript interfaces with.

## Key Entities

### TeacherSubmission
```typescript
export interface TeacherSubmission {
  id: number;
  student_id: number;
  student_name: string;
  assignment_id: number;
  file_url?: string;
  submitted_at: string; // date-time
  status: 'missing' | 'submitted' | 'graded'; 
  score?: number;
  xp_reward?: number;
  feedback?: string;
}
```

### GradeSubmissionRequest
```typescript
export interface GradeSubmissionRequest {
  score: number;
  xp_reward: number;
  feedback: string;
}
```

### TeacherNotification
```typescript
export interface TeacherNotification {
  id: number;
  event_type: string; // e.g., 'alert', 'info', 'achievement'
  reference_type?: string;
  reference_id?: number;
  message: string;
  is_read: boolean;
  created_at: string; // date-time
}
```

### QuizResult
```typescript
export interface QuizResult {
  id: number;
  student_id: number;
  student_name: string;
  score: number;
  is_top_performer: boolean;
  status: 'Completed' | 'Pending';
  time_taken_minutes: number;
  xp_earned: number;
}
```

## Contracts / Service Methods to Implement

1. **Assignment Service (`src/services/assignmentService.ts`)**:
   - `getSubmissions(assignmentId: number): Promise<TeacherSubmission[]>`
   - `gradeSubmission(submissionId: number, data: GradeSubmissionRequest): Promise<TeacherSubmission>`

2. **Quiz Service (`src/services/quizService.ts`)**:
   - `getQuizResults(quizId: number): Promise<QuizResult[]>`

3. **Teacher Service (`src/features/teacher/services/teacher.service.ts`)**:
   - `getNotificationsFeed(): Promise<TeacherNotification[]>`
