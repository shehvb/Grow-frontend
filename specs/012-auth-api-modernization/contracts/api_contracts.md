# API Interface Contracts: Auth Modernization

## Service: `authApi`

| Action | Method | Path | Request Body | Response |
| :--- | :--- | :--- | :--- | :--- |
| **Login** | POST | `/auth/login/` | `{email, password}` | `LoginResponse` |
| **Register** | POST | `/auth/register/` | `{username, email, password, role}` | `User` |
| **Parent Signup** | POST | `/auth/signup/` | `{username, email, password}` | `LoginResponse` |
| **Logout** | POST | `/auth/logout/` | `{refresh}` | 204 No Content |
| **Me** | GET | `/auth/me/` | N/A | `User` |
| **Update Profile** | PUT | `/auth/profile/` | `{first_name, last_name, phone, avatar}` | `User` |
| **Change Pass** | POST | `/auth/change-password/` | `{old_password, new_password}` | 200 OK |
| **Link Child** | POST | `/auth/parent-profile/` | `{child_id}` | `ParentProfile` |
| **Use Code** | POST | `/auth/enrollment-codes/use/` | `{code}` | 201 Created |

## Service: `adminApi` (School Admin Only)

| Action | Method | Path | Request Body | Response |
| :--- | :--- | :--- | :--- | :--- |
| **Create School** | POST | `/auth/school/` | `{name}` | `School` |
| **Get My School** | GET | `/auth/school/` | N/A | `School` |
| **List Codes** | GET | `/auth/schools/{id}/enrollment-codes/` | N/A | `EnrollmentCode[]` |
| **Generate Codes** | POST | `/auth/schools/{id}/enrollment-codes/generate/` | `{quantity}` | 201 Created |
| **Revoke Code** | POST | `/auth/schools/{id}/enrollment-codes/{id}/revoke/` | N/A | `EnrollmentCode` |
