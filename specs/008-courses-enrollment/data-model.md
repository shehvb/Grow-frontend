# Data Model: Courses & Enrollment

## Entities

### Course
Represents a single course on the platform.

| Field | Type | Description |
|---|---|---|
| id | string | Unique identifier (UUID) |
| title | string | Name of the course |
| description | string | Detailed content overview |
| teacher_id | string | ID of the teacher who created it |
| teacher | Teacher | Nested teacher object |
| created_at | date-time | Creation timestamp |
| updated_at | date-time | Last update timestamp |

### Teacher (Nested)
Basic information about the course owner.

| Field | Type | Description |
|---|---|---|
| id | string | Unique identifier |
| name | string | Full name of the teacher |
| email | string | Contact email |

### Enrollment
The link between a student and a course.

| Field | Type | Description |
|---|---|---|
| id | string | Enrollment identifier |
| course_id | string | ID of the course |
| student_id | string | ID of the student |
| enrolled_at | date-time | Timestamp of enrollment |

### Student (Nested)
Basic information about an enrolled student.

| Field | Type | Description |
|---|---|---|
| id | string | Unique identifier |
| name | string | Full name of the student |
| email | string | Contact email |

## Validation Rules
- **Course Title**: Required, minimum 5 characters, maximum 100 characters.
- **Course Description**: Required, minimum 20 characters.
- **Enrollment**: Only allowed for users with the `Student` role.
- **CRUD Operations**: Only allowed for users with the `Teacher` role who are the `teacher_id` owner (except Create).

## State Transitions
- **Course**: Created -> Active -> [Deleted]
- **Enrollment**: Initialized -> Enrolled -> [Unenrolled/Completed - Future]
