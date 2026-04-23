# Contract: Courses (frontend–backend)

**Feature**: 004-platform-features  
**Date**: 2025-03-16  
**Purpose**: Target shape for course list and course detail when backend is integrated. Mock data in `src/mock/` should match these shapes so replacement is a drop-in.

## Course list (student)

**Intent**: Return the list of courses for the current student for the Courses page.

**Request**: `GET /api/students/me/courses` (or equivalent). Optional query: `?status=all|in_progress|completed` for filtering.

**Response**: Array of course summary objects.

```json
[
  {
    "id": "string",
    "title": "string",
    "instructor": { "id": "string", "name": "string" },
    "progress": 0,
    "status": "not_started | in_progress | completed"
  }
]
```

- `progress`: 0–100.
- `status`: Drives filter bar (All / In Progress / Completed). If backend does not send it, frontend derives from `progress` (e.g. 0 = not_started, 1–99 = in_progress, 100 = completed).

## Course detail (future)

**Intent**: Full course with lessons for the course page (Phase 2).

**Request**: `GET /api/courses/:id` (or equivalent).

**Response**: Course with lessons, lecture content, video URLs, download links. Structure to be defined when course page is implemented.

## Mock alignment

- `courses.mock.ts`: Export an array of objects matching the course list response shape.
- `instructors.mock.ts`: Export instructor id/name; courses may reference by id or inline name for the slice.
