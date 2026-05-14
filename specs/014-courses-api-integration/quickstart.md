# Quickstart: Courses API Integration

This guide provides a high-level overview of how to interact with the new Courses APIs within the frontend.

## API Wrappers

All API endpoints will be encapsulated in `src/features/courses/api/`. Use these wrapper functions in your components or custom hooks to handle data fetching. 

Example:
```typescript
import { apiClient } from '@/lib/api'; // Assuming a configured axios instance exists
import { Course } from '../types';

export const fetchCourses = async (): Promise<Course[]> => {
  const response = await apiClient.get('/api/v1/courses/');
  return response.data;
};
```

## State Management

1. **Local State**: Use `useState` and `useEffect` for simple data fetching (e.g., listing lessons for a specific course).
2. **Global State**: Use Zustand (`src/features/courses/store/`) if the data needs to be shared across multiple independent components (e.g., caching the user's enrolled courses to show in the sidebar and dashboard).

## Error Handling

Always wrap your API calls in `try/catch` blocks and use `react-hot-toast` to notify the user of any errors.

```typescript
import toast from 'react-hot-toast';

try {
  await fetchCourses();
} catch (error) {
  toast.error('Failed to load courses. Please try again later.');
}
```
