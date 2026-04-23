# Data Model: Grow Learning Platform

**Feature**: 004-platform-features  
**Date**: 2025-03-16  
**Purpose**: Entity definitions and relationships for the platform. Shapes are implementation-agnostic; frontend mocks and backend APIs should align with these.

## Entities

### Course

Represents a structured learning unit assigned to or available to a student.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| title | string | Course or subject title |
| instructor | string \| InstructorRef | Instructor name or reference |
| progress | number | Completion percentage (0–100) |
| status | "not_started" \| "in_progress" \| "completed" | Derived or explicit status |

**Relationships**: Has many lessons/tasks; belongs to catalog; progress is per student.

**Validation**: progress in [0, 100]; title non-empty.

---

### Instructor (ref)

Instructor or teacher associated with a course.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| name | string | Display name |

Used in Course and mock data (`instructors.mock.ts`).

---

### Student

User who studies courses, completes quizzes and tasks, earns XP and streaks, uses AI tutor.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| displayName | string | Display name |
| (other profile fields) | — | Per product (e.g. email, avatar) |

**Relationships**: Has many courses, tasks, quiz attempts, progress; linked to parents.

---

### Parent

User who monitors one or more linked students.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| (profile fields) | — | Per product |

**Relationships**: Has many links (Parent–Student); sees dashboard, analytics, attendance, reports for linked students only.

---

### Task

Assignment or deadline with status and due date.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| title | string | Task title |
| dueDate | date/ISO string | Due date |
| status | "pending" \| "overdue" \| "completed" | Status |
| category | "today" \| "upcoming" \| "overdue" | Display category |

**Relationships**: Belongs to student; may relate to course.

---

### Progress / Engagement

Data representing student activity and achievement (XP, streaks, study hours, engagement rate, completion).

| Field | Type | Description |
|-------|------|-------------|
| courseId | string | Course reference |
| studentId | string | Student reference |
| progressPercent | number | 0–100 |
| xp | number | Experience points |
| streakDays | number | Current streak |
| (other metrics) | — | studyHours, engagementRate, etc. |

Used for student dashboard and parent analytics.

---

### Link (Parent–Student)

Association governing which students’ data a parent can see.

| Field | Type | Description |
|-------|------|-------------|
| parentId | string | Parent id |
| studentId | string | Student id |

**Validation**: Unique (parentId, studentId).

---

### Attendance

Record of sessions (attended, missed, extra credit).

| Field | Type | Description |
|-------|------|-------------|
| studentId | string | Student reference |
| date | date | Session date |
| status | "attended" \| "missed" \| "extra_credit" | |

---

### Report

Snapshot for parent view: overall average, attendance, assignment completion, subject performance.

| Field | Type | Description |
|-------|------|-------------|
| studentId | string | Student reference |
| period | string | e.g. month label |
| overallAverage | number | |
| attendanceSummary | object | |
| assignmentCompletion | number/object | |
| subjectPerformance | array | Per-subject metrics |

---

## First slice (Courses page)

For the current implementation slice, the following are required:

- **Course**: id, title, instructor (name or ref), progress, status. Mock in `courses.mock.ts`.
- **Instructor**: id, name. Mock in `instructors.mock.ts` (or inlined in course).
- **Progress**: At least progressPercent (or progress on Course). Mock in `progress.mock.ts` or on Course.

Filter bar uses **Course.status** (or derived from progress) for All / In Progress / Completed. No backend yet; all from mock files.
