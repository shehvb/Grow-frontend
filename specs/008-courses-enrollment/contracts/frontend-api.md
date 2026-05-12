# API Contracts: Courses Feature

This document defines the interface between the Frontend and the Backend API for the Courses feature, based on the [Grow Educational Platform API.yaml](../../../Grow%20Educational%20Platform%20API.yaml).

## Endpoints

### 1. List Courses
- **Method**: `GET`
- **Path**: `/api/v1/courses/`
- **Roles**: All (Teacher sees owned, Student sees enrolled, Parent sees child's enrolled)
- **Response**: `200 OK`
  ```json
  [
    {
      "id": "uuid",
      "title": "Course Title",
      "description": "Course Description",
      "teacher_id": "uuid"
    }
  ]
  ```

### 2. Create Course
- **Method**: `POST`
- **Path**: `/api/v1/courses/`
- **Roles**: Teacher
- **Request**:
  ```json
  {
    "title": "New Course",
    "description": "Course details..."
  }
  ```
- **Response**: `201 Created`

### 3. Get Course Details
- **Method**: `GET`
- **Path**: `/api/v1/courses/{id}/`
- **Roles**: All
- **Response**: `200 OK`
  ```json
  {
    "id": "uuid",
    "title": "Title",
    "description": "Description",
    "teacher": { "name": "...", "email": "..." }
  }
  ```

### 4. Enroll in Course
- **Method**: `POST`
- **Path**: `/api/v1/courses/{id}/enroll/`
- **Roles**: Student
- **Response**:
  - `200 OK`: Success
  - `403 Forbidden`: Not a student
  - `409 Conflict`: Already enrolled

### 5. List Enrolled Students
- **Method**: `GET`
- **Path**: `/api/v1/courses/{id}/students/`
- **Roles**: Teacher (Owner)
- **Response**: `200 OK`
  ```json
  [
    { "id": "uuid", "name": "Student Name", "email": "student@email.com" }
  ]
  ```

## Errors
- **401 Unauthorized**: Missing or invalid token.
- **403 Forbidden**: Role mismatch or not the resource owner.
- **404 Not Found**: Course does not exist.
- **422 Unprocessable Entity**: Validation failed.
