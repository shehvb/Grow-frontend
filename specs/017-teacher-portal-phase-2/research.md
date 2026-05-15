# Research: Teacher Portal API Integration (Phase 2)

This document resolves technical unknowns and identifies best practices for the Teacher Portal Phase 2 implementation.

## Decisions & Findings

### 1. Assignment File Preview
- **Decision**: Implement a "Preview" modal using an `iframe` for PDF files and an `img` tag for common image formats.
- **Rationale**: Browser-native PDF rendering via `iframe` is the most lightweight and reliable method for a standard web app.
- **Alternatives**: Using a library like `react-pdf` (rejected to keep dependencies minimal).

### 2. Course Selection Dropdown
- **Decision**: Fetch course list on assignment creation page load and store in local state.
- **Rationale**: Since the number of courses per teacher is relatively small (typically <20), fetching the full list for a dropdown is efficient and simplifies the UX.

### 3. Grading Workflow
- **Decision**: Modal-based grading interface.
- **Rationale**: Allows the teacher to stay on the submission list while viewing and grading individual student work, reducing page loads and maintaining context.

### 4. API Endpoint Consistency
- **Decision**: Strictly follow the `/create/`, `/update/`, and `/delete/` sub-path pattern.
- **Rationale**: Consistency with the recently fixed Course and Lesson APIs which require these specific sub-paths for POST/PATCH/DELETE operations on this backend.

## Best Practices

- **File Upload Progress**: Use Axios `onUploadProgress` to show a progress bar for large assignment resource uploads (up to 50MB).
- **Optimistic Updates**: For grading, update the local submission status immediately and revert if the API call fails.
- **Deduplication**: When fetching the global student list, deduplicate by `student_id` in the frontend if the backend returns duplicates across multiple courses.
