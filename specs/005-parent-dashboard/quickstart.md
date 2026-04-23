# Quickstart Guide: Parent Dashboard

This guide provides instructions for developers to start working on the Parent Dashboard feature locally.

## Prerequisites
- Node.js (v18+)
- npm installed project dependencies

## Running Locally

1. **Start the Frontend Development Server**
   ```bash
   npm run dev
   ```
   This will start the Vite server.

2. **Backend Mocking / Local API**
   Until the backend endpoints are fully implemented, the dashboard components should use mocked data defined in `src/mockData/parentDashboard.ts` or via a service layer that intercepts `/api/*` requests.

3. **Routing**
   The parent dashboard is accessible at `/parent-dashboard`.

## Key Components
- `ParentDashboardLayout`: Contains the global student dropdown (Zustand state).
- `AcademicProgressWidget`: Displays current `CourseGrade`s.
- `AttendanceWidget`: Displays recent attendance trends.
- `AIInsightsWidget`: Surfaces the latest `AIInsight`.
