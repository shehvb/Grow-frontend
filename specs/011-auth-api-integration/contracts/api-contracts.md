# API Contracts: Auth Integration

These contracts represent the expected request/response shapes for the authentication module based on the `Grow Educational Platform API copy.yaml`.

## Authentication Endpoints

### POST /api/v1/auth/login/
- **Request**: `{ email, password }`
- **Response**: `{ access, refresh, user: { id, username, email, role } }`

### POST /api/v1/auth/logout/
- **Request**: `{ refresh }`
- **Response**: `204 No Content`

### POST /api/v1/auth/token/refresh/
- **Request**: `{ refresh }`
- **Response**: `{ access }`

### POST /api/v1/auth/register/
- **Request**: `{ username, email, password, role }`
- **Response**: `{ id, username, email, role }`

### GET /api/v1/auth/me/
- **Response**: `{ id, username, email, role, first_name, last_name, phone, avatar }`

### PUT /api/v1/auth/profile/
- **Request**: `{ first_name?, last_name?, phone?, avatar? }`
- **Response**: `{ id, username, email, role, first_name, last_name, phone, avatar }`

### POST /api/v1/auth/oauth/
- **Request**: `{ provider, access_token }`
- **Response**: `{ access, refresh, user: { ... } }`
