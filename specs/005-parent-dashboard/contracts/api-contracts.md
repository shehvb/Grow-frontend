# API Contracts

These contracts define the RESTful communication between the frontend React application and the backend service for the Parent Dashboard.

## Endpoints

### 1. Get Associated Students
Retrieves the list of students associated with the currently logged-in parent.
- **Method**: `GET`
- **Path**: `/api/parents/{parentId}/students`
- **Response (200 OK)**:
  ```json
  [
    {
      "id": "stu-123",
      "name": "Alex Johnson",
      "gradeLevel": 8
    }
  ]
  ```

### 2. Get Student Dashboard Aggregate
Retrieves a unified view of grades, recent quizzes, attendance, and the latest AI insight to minimize frontend data fetching.
- **Method**: `GET`
- **Path**: `/api/students/{studentId}/dashboard-summary`
- **Response (200 OK)**:
  ```json
  {
    "studentId": "stu-123",
    "overallAttendance": 95.5,
    "courseGrades": [
      { "courseName": "Math", "currentGrade": 88, "letterGrade": "B+" }
    ],
    "recentQuizzes": [
      { "courseName": "Math", "quizName": "Algebra Ch 1", "score": 85, "maxScore": 100, "date": "2026-03-25" }
    ],
    "latestInsight": {
      "insightText": "Alex is showing strong improvement in Math, up 5% from last month.",
      "type": "Positive",
      "dateGenerated": "2026-03-28"
    }
  }
  ```

### 3. Generate Report
Triggers the generation of a weekly or monthly PDF/HTML report.
- **Method**: `GET`
- **Path**: `/api/students/{studentId}/reports?type={weekly|monthly}&date={ISO-8601}`
- **Response (200 OK)**:
  ```json
  {
    "reportUrl": "https://storage.example.com/reports/stu-123-monthly-2026-03.pdf",
    "generatedAt": "2026-03-28T10:00:00Z"
  }
  ```
