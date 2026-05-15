# Quickstart: Teacher Portal API Integration (Phase 2)

## Environment Setup
1. Ensure `VITE_API_URL` is set to `https://ahmeddali.pythonanywhere.com/api/v1` in `.env`.
2. Login as a teacher to obtain a valid JWT token.

## Key Service Usage

### Assignment Management
```typescript
import { assignmentService } from './services/assignmentService';

// Create a new assignment
const formData = new FormData();
formData.append('title', 'Math Homework');
formData.append('course', '1');
await assignmentService.createAssignment(formData);
```

### Grading
```typescript
// Grade a submission
await assignmentService.gradeSubmission(submissionId, {
  score: 95,
  feedback: 'Excellent work!'
});
```

## Running the Dashboard
1. Navigate to `/teacher/assignments` in the browser.
2. Ensure you have at least one course created to enable assignment creation.
