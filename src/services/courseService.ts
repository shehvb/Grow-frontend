import apiClient from './apiClient';
import type { Course, Enrollment, CourseWriteRequest } from '../types/course';

export const courseService = {
  listCourses: async (): Promise<Course[]> => {
    const response = await apiClient.get('/courses/');
    return response.data;
  },

  getCourseById: async (id: number): Promise<Course> => {
    const response = await apiClient.get(`/courses/${id}/`);
    return response.data;
  },

  createCourse: async (data: CourseWriteRequest): Promise<Course> => {
    const response = await apiClient.post('/courses/', data);
    return response.data;
  },

  updateCourse: async (id: number, data: CourseWriteRequest): Promise<Course> => {
    const response = await apiClient.put(`/courses/${id}/`, data);
    return response.data;
  },

  deleteCourse: async (id: number): Promise<void> => {
    await apiClient.delete(`/courses/${id}/`);
  },

  enrollInCourse: async (id: number): Promise<Enrollment> => {
    const response = await apiClient.post(`/courses/${id}/enroll/`);
    return response.data;
  },

  getCourseStudents: async (id: number): Promise<Enrollment[]> => {
    const response = await apiClient.get(`/courses/${id}/students/`);
    return response.data;
  },

  listLessons: async (id: number): Promise<any[]> => {
    const response = await apiClient.get(`/courses/${id}/lessons/`);
    return response.data;
  },
};
