# Data Model: Auth API Integration

## Entities

### User
- **Attributes**:
    - `id`: string (uuid)
    - `email`: string (required, unique)
    - `username`: string (unique)
    - `role`: enum ('student', 'teacher', 'parent', 'school_admin')
    - `first_name`: string
    - `last_name`: string
    - `phone`: string
    - `avatar`: string (url)
- **Relationships**:
    - Linked to one `Profile`.
    - Linked to multiple `Session` records (in the backend).

### Session
- **Attributes**:
    - `access_token`: string (JWT)
    - `refresh_token`: string (JWT)
    - `expires_at`: datetime
- **State**:
    - `Active`: Token is valid.
    - `Expired`: Token needs refresh.
    - `Invalid`: Token is blacklisted or malformed.

### Profile
- **Attributes**:
    - `first_name`: string
    - `last_name`: string
    - `phone`: string
    - `avatar`: string (url)
- **Validation**:
    - `phone` must follow international format.
    - `avatar` must be a valid URL.
