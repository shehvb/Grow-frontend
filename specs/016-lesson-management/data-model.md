# Phase 1: Data Model

Based on the `Grow Educational Platform API.yaml`, these are the relevant data entities.

## 1. TeacherLesson
This represents the lesson object retrieved and managed by a Teacher.

```typescript
export type TeacherLessonStatus = 'draft' | 'published';

export interface TeacherLesson {
  id: number;              // Read-only
  title: string;           // max 255 chars
  content: string;         // HTML or Markdown string
  order: number;           // sequence order
  status: TeacherLessonStatus;
  video_url?: string;      // uri format, max 200 chars
  pdf_file?: string;       // uri format
  resources?: string;      // uri format
  xp_reward: number;       // min 0
  bonus_xp: number;        // min 0
}

// Request payload for creating a lesson
export interface TeacherLessonWriteRequest {
  title: string;
  content: string;
  order: number;
  status?: TeacherLessonStatus;
  video_url?: string;
  pdf_file?: File | null;
  resources?: File | null;
  xp_reward: number;
  bonus_xp: number;
}
```

## 2. StudentLesson
This represents the lesson progress returned to a Student inside the `CourseDetail` endpoint.

```typescript
export interface StudentLesson {
  id: number;
  title: string;
  is_completed: boolean;
  // Note: The actual content (video_url, content) might require a specific lesson detail 
  // endpoint or might be included depending on the backend serializer. For now, we rely 
  // on this brief schema provided in CourseDetail.
}
```
