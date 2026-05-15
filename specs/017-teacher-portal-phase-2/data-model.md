# Data Model: Teacher Portal API Integration (Phase 2)

This document defines the entities and data structures for the upcoming implementation.

## Entities

### Assignment
Represents a task for students.
- `id`: number (Primary Key)
- `course_id`: number (Foreign Key to Course)
- `title`: string (Required)
- `description`: string
- `max_marks`: number (Default: 100)
- `due_date`: string (ISO Date)
- `attachment_url`: string (Optional, file path)
- `created_at`: string (ISO Date)

### Submission
A student's response to an assignment.
- `id`: number (Primary Key)
- `assignment_id`: number (Foreign Key)
- `student_id`: number (Foreign Key)
- `student_name`: string
- `file_url`: string
- `submitted_at`: string (ISO Date)
- `status`: "submitted" | "graded" | "late"

### Grade
Evaluation of a submission.
- `id`: number (Primary Key)
- `submission_id`: number (Foreign Key)
- `score`: number
- `feedback`: string
- `graded_at`: string (ISO Date)

### Teacher Profile
Account details.
- `first_name`: string
- `last_name`: string
- `email`: string
- `bio`: string
- `avatar_url`: string
- `notification_settings`: object

## State Transitions (Submission)
1. `pending` (Assignment created, no submission)
2. `submitted` (Student uploads file)
3. `graded` (Teacher submits score and feedback)
