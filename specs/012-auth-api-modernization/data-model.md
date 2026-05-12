# Data Model: Auth Modernization

## Entities

### User
- `id`: integer (Primary Key)
- `username`: string (Unique)
- `email`: string (Unique)
- `role`: string (Enum: student, teacher, parent, school_admin)
- `first_name`: string (Optional)
- `last_name`: string (Optional)
- `phone`: string (Optional)
- `avatar`: string (URL, Optional)
- `is_first_login`: boolean (True for new parents)

### School
- `id`: integer (Primary Key)
- `name`: string
- `school_code`: string (Unique, used for enrollment)
- `type`: string (e.g., International, National)
- `slug`: string (URL friendly)

### EnrollmentCode
- `id`: integer (Primary Key)
- `code`: string (Unique)
- `is_used`: boolean
- `is_revoked`: boolean
- `created_at`: string (ISO date)

### AuthTokens (Local Storage Only)
- `access`: string (JWT)
- `refresh`: string (JWT)

## Relationships
- **School Admin** owns exactly **1 School**.
- **User (Student/Teacher)** belongs to **1 School** (via membership).
- **Parent** links to exactly **1 Student** child.
- **EnrollmentCode** belongs to **1 School**.
