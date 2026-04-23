import type { Course, CourseDetails } from "../types";
import { getMockCourses, getMockCourseById } from "./mock/courseServiceMock";
// BACKEND DEVELOPER INSTRUCTIONS:
// 1. Replace the mock imports above with real API calls using fetch or axios (e.g., `import axios from 'axios';`).
// 2. Adjust the return types if your backend payload structure differs, but ideally match the `Course` and `CourseDetails` interfaces in `/src/types/index.ts`.
// 3. Make sure to implement proper error handling and async/await for these methods.

export const courseService = {
  // BACKEND: API Endpoint should be `GET /api/courses`
  getAllCourses: async (): Promise<Course[]> => {
    // return axios.get('/api/courses').then(res => res.data);
    return getMockCourses();
  },
  
  // BACKEND: API Endpoint should be `GET /api/courses/:id`
  getCourseById: async (id: string): Promise<CourseDetails | undefined> => {
    // return axios.get(`/api/courses/${id}`).then(res => res.data);
    return getMockCourseById(id);
  },
};
