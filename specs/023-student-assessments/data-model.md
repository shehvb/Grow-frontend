# Data Model: Student Assessments Integration

## Entities and Types

This details the models that will be updated in `src/types/index.ts` to reflect the OpenAPI definitions.

### `Assignment` (Student View)
```typescript
export interface StudentAssignment {
  id: string | number;
  title: string;
  deadline: string; // ISO format
  xp_reward: number | null;
  teacher_file_url: string | null;
  submission_status: "pending" | "graded" | "missing" | "submitted";
}
```

### `QuizStart` / `Quiz` (Student View)
```typescript
export interface QuizQuestion {
  id: number;
  text: string;
  options: string[];
}

export interface QuizStart {
  quiz_id: number;
  title: string;
  time_limit_seconds: number | null;
  questions: QuizQuestion[];
  // question_map can be typed if needed, but questions array is primary
}
```

### `StudentQuizResult`
```typescript
export interface StudentQuizResult {
  score: string; // e.g., "8.00"
  percentage: number;
  passed: boolean;
  xp_awarded: number;
}
```

## State Requirements

- `quizId`: number or string
- `currentQuestionIndex`: number
- `timeLeft`: number (seconds)
- `answers`: `Record<number, number>` (mapping questionId -> selectedOptionIndex)

## API Service Contracts

### `quizService.ts`
- `startQuiz(quizId: string): Promise<QuizStart>`
- `submitQuiz(quizId: string, answers: { question_id: number, answer: string }[]): Promise<StudentQuizResult>`

### `assignmentService.ts`
- `submitStudentAssignment(assignmentId: string, file: File): Promise<void>`
- *(Fetching assignment details is likely handled via course context or direct GET assignment detail)*
