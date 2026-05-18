# Research: Student Assessments Integration

## Best Practices for File Uploads in React/Axios
- **Decision**: Use native `FormData` API and pass to Axios without explicitly setting the `Content-Type` header (let the browser boundary do it).
- **Rationale**: Manually setting `Content-Type: multipart/form-data` can break boundary handling in some browsers. Axios handles `FormData` perfectly natively.
- **Alternatives considered**: Using `fetch` or converting to base64. Base64 adds overhead, and `fetch` lacks the convenient interceptor setup we already have in `apiClient.ts`.

## Timer Synchronization for Quizzes
- **Decision**: Initialize the client-side timer directly from `time_limit_seconds` fetched via `POST /api/v1/student/quizzes/{quiz_id}/start/`.
- **Rationale**: Syncing from the server response guarantees the student sees exactly the allowed time. A `setInterval` loop in React `useEffect` is sufficient for this scope.
- **Alternatives considered**: WebSocket timers (too complex for current scope) and tracking start time with `Date.now()` (better for precision, but simple countdown is acceptable for this UX).

## API Payload Formatting
- **Decision**: Map the student's selected answer index dynamically to the literal string value required by `StudentQuizSubmitRequestRequest`.
- **Rationale**: The UI natively deals with indices (e.g. tracking `0`, `1`, `2` for options). The mapping function ensures seamless translation right before dispatching the POST request without changing internal React component logic.
- **Alternatives considered**: Refactoring `QuizPlayerPage` state to hold the string instead of the index. Rejected because UI rendering is easier with indices.
