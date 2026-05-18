# GROW-back-up Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-05-18

## Active Technologies
- [if applicable, e.g., PostgreSQL, CoreData, files or N/A] (007-role-based-auth)
- TypeScript / React 19.2.0 + Zustand (state), Tailwind CSS (styling), Vite (framework) (008-courses-enrollment)
- REST API Backend (`/api/v1`) (008-courses-enrollment)
- TypeScript / React ^19.2.0 + Vite, Tailwind CSS ^3.4.0, React Router DOM, React Icons (010-school-admin)
- N/A (Frontend only, mock data in memory) (010-school-admin)
- TypeScript / React ^19.2.0 + Axios, Zustand, react-hot-toast, react-hook-form, zod (011-auth-api-integration)
- localStorage (Tokens, User Profile) (011-auth-api-integration)
- TypeScript 5+, React 19.2.0 + Axios, Zustand, React Router, React Hot Toast (012-auth-api-modernization)
- Browser LocalStorage (JWT persistence) (012-auth-api-modernization)
- TypeScript / React 19.2.0 + Vite, Tailwind CSS 3.4.0, Axios 1.16.0, Zustand 5.0.12, React Router DOM 7.13.1, React Hot Toast 2.6.0 (014-courses-api-integration)
- N/A (State management via Zustand, API fetching via Axios) (014-courses-api-integration)
- TypeScript 5.x (as declared in project) + React ^19.2.0, Zustand 5.0.12, Axios 1.16.0, react-hot-toast (existing) (015-session-management)
- `localStorage` (existing — `auth_tokens` key) (015-session-management)
- TypeScript 5.x / React ^19.2.0 + Vite, Tailwind CSS ^3.4.0, Zustand, Axios (016-lesson-management)
- N/A (Backend API driven) (016-lesson-management)
- TypeScript / React ^19.2.0 + Axios (via existing `apiClient.ts`), Zustand (if used for teacher state, otherwise local component state) (018-teacher-dashboard-api)
- TypeScript / React 19.2.0 + Axios (apiClient), Zustand (existing useAuthStore or new useStudentStore) (021-student-dashboard-api)
- N/A (Read-only dashboard for now) (021-student-dashboard-api)
- TypeScript 5.x / JavaScript ES6+ + React 19.x, Zustand (State Management), Axios/Fetch API (Network Calls) (024-parent-api-integration)
- Web storage (localStorage for auth tokens) (024-parent-api-integration)

- [e.g., Python 3.11, Swift 5.9, Rust 1.75 or NEEDS CLARIFICATION] + [e.g., FastAPI, UIKit, LLVM or NEEDS CLARIFICATION] (005-parent-dashboard)

## Project Structure

```text
backend/
frontend/
tests/
```

## Commands

cd src; pytest; ruff check .

## Code Style

[e.g., Python 3.11, Swift 5.9, Rust 1.75 or NEEDS CLARIFICATION]: Follow standard conventions

## Recent Changes
- 024-parent-api-integration: Added TypeScript 5.x / JavaScript ES6+ + React 19.x, Zustand (State Management), Axios/Fetch API (Network Calls)
- 021-student-dashboard-api: Added TypeScript / React 19.2.0 + Axios (apiClient), Zustand (existing useAuthStore or new useStudentStore)
- 018-teacher-dashboard-api: Added TypeScript / React ^19.2.0 + Axios (via existing `apiClient.ts`), Zustand (if used for teacher state, otherwise local component state)


<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
