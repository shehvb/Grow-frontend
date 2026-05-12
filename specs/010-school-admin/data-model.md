# Data Model: School Admin Module

This document outlines the shape of the mock data required to drive the frontend UI components.

## Entities

### `SchoolKPIs`
Used on the Dashboard to display high-level metrics.
- `totalStudents`: number
- `studentGrowthPercent`: number (e.g., 5.2)
- `totalTeachers`: number
- `newHires`: number
- `totalClasses`: number
- `gradesSpanned`: number

### `Alert`
Used in the global sidebar and class-specific status sections.
- `id`: string
- `severity`: "warning" | "critical"
- `message`: string
- `context`: string (e.g., "Parent Call", "Expelled", "Suspended 7d")
- `targetId`: string (reference to Student or System event)

### `ClassSummary`
Used for the cards on the Dashboard 'All Classes' section.
- `id`: string
- `name`: string (e.g., "Class 9A")
- `studentCount`: number
- `teacherCount`: number
- `activeAlerts`: number (optional)

### `Student`
Used in the Class Details 'Top Performers' and 'Student Status' sections.
- `id`: string
- `name`: string
- `score`: number
- `maxScore`: number
- `rank`: number
- `alertId`: string | null

### `Teacher`
Used in the Class Details 'Assigned Teachers' section.
- `id`: string
- `name`: string
- `subject`: string
- `rating`: number
- `maxRating`: number
- `trend`: "improving" | "declining" | "stable"
- `avatarInitials`: string
