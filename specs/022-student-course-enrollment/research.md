# Technical Research: Student Course List and Enrollment

## API Integration Patterns

### Decision: Direct Axios (apiClient) vs Zustand Actions
**Decision**: We will encapsulate all API calls within `src/features/courses/api/courses.ts` and call these from Zustand store actions (`useCourseStore`) when global state is needed, or custom React hooks when component-local state is sufficient.

**Rationale**:
- Keeps UI components clean and free of `axios.get` clutter.
- Zustand store will cache the enrolled courses to prevent redundant network requests when switching between dashboard and course views.

### Alternatives considered:
- Fetching directly inside `useEffect` in components: Rejected because it causes duplicate fetches and makes the UI feel slower when navigating.
- React Query: Rejected because the project currently uses Zustand for state management and adding another caching library would violate the project's simplicity constitution.

## Handling Pagination
**Decision**: We must assume the backend endpoints (`/api/v1/courses/` and `/api/v1/courses/{id}/lessons/`) might return paginated responses (e.g., `{ count, next, previous, results: [] }`).

**Rationale**:
- Recent integrations (e.g., School selection) proved the backend uses DRF pagination.
- We will write safe accessors: `const data = response.data.results || response.data;`

## UI States
**Decision**: Implement strict Loading, Error, and Empty states for all three views.

**Rationale**:
- Network requests are unpredictable.
- Returning an empty array is different from an error, and the user must know if they simply don't have courses yet.
