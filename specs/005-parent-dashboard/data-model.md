# Data Models

This document outlines the key entities and data structures required for the Parent Dashboard System.

## Entities

### `Parent`
Represents the parent user accessing the dashboard.
- `id` (String, UUID)
- `name` (String)
- `email` (String)
- `studentIds` (Array of Strings) - References to associated students.

### `Student`
Represents a student enrolled in the platform.
- `id` (String, UUID)
- `name` (String)
- `gradeLevel` (Number)

### `CourseGrade`
Represents the student's current standing in a specific course.
- `id` (String, UUID)
- `studentId` (String, UUID)
- `courseName` (String)
- `currentGrade` (Number, percentage)
- `letterGrade` (String)
- `lastUpdated` (Date)

### `QuizScore`
Represents a specific assessment result.
- `id` (String, UUID)
- `studentId` (String, UUID)
- `courseName` (String)
- `quizName` (String)
- `score` (Number)
- `maxScore` (Number)
- `date` (Date)

### `AttendanceRecord`
Represents daily attendance status.
- `id` (String, UUID)
- `studentId` (String, UUID)
- `date` (Date)
- `status` (Enum: 'Present', 'Absent', 'Late', 'Excused')

### `AIInsight`
Represents a generated text insight.
- `id` (String, UUID)
- `studentId` (String, UUID)
- `insightText` (String)
- `type` (Enum: 'Positive', 'NeedsAttention', 'Neutral')
- `dateGenerated` (Date)

## State Transitions
- **AIInsight Generation**: Triggered periodically (e.g., weekly) or on-demand when significant new data (e.g., a huge drop in quiz scores) is detected.
- **Reporting**: Report generation aggregates `CourseGrade`, `QuizScore`, and `AttendanceRecord` into a static view.
