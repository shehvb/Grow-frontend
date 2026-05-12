# Research: Courses Management & Enrollment

## Summary
This research phase defines the technical approach for integrating the Courses feature with the existing backend API, focusing on state management with Zustand and robust role-based logic.

## Decision: API Integration Pattern
- **Decision**: Use a centralized `courseService.ts` for all API calls using `fetch` or a pre-configured Axios/Fetch client if available.
- **Rationale**: Keeps the API logic isolated from components, making it easier to maintain and update.
- **Alternatives Considered**: 
    - Inline fetch in components (Rejected: Hard to maintain, poor reuse).
    - React Query (Rejected: Constitution favors minimal dependencies; Zustand handles our state needs).

## Decision: State Management with Zustand
- **Decision**: Create a single `useCourseStore` to manage course lists, selected course details, loading states, and error messages.
- **Rationale**: Provides a predictable, lightweight way to share state across pages (List, Details, Management).
- **Alternatives Considered**: 
    - React Context (Rejected: More boilerplate, potential performance issues with deep nesting).
    - Prop Drilling (Rejected: Not scalable).

## Decision: Role-Based Authorization Logic
- **Decision**: Centralize role checking in a `useAuth` hook or similar utility that extracts the user's role and ID from the auth token/state.
- **Rationale**: Ensures consistency in permission checks across the UI.
- **Alternatives Considered**: 
    - Manual checks in every component (Rejected: Error-prone).

## Decision: Error Handling Strategy
- **Decision**: Use a global toast notification system (if available) or store errors in the Zustand store for display in specific UI zones. Map backend status codes (403, 404, 409) to human-readable messages.
- **Rationale**: Provides consistent user feedback.

## Unresolved Items (NEEDS CLARIFICATION)
- **API Base URL**: Configured via `.env`? (Assumption: Yes, `VITE_API_URL`).
- **Auth Implementation**: How are headers injected? (Assumption: Interceptor or wrapper).
- **Notifications**: Backend triggers them, but UI needs to refresh. (Assumption: Manual re-fetch or websocket push).
