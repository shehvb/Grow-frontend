import apiClient from '../../../services/apiClient';
import type { Course, CourseWriteRequest, Lesson, PaginatedResponse } from '../types';

export const fetchCourses = async (): Promise<PaginatedResponse<Course> | Course[]> => {
  const response = await apiClient.get('/student/courses/');
  return response.data;
};

export const fetchCourseDetails = async (id: number): Promise<Course> => {
  const response = await apiClient.get(`/student/courses/${id}/`);
  return response.data;
};

export const enrollCourse = async (id: number): Promise<void> => {
  await apiClient.post(`/courses/${id}/enroll/`);
};

export const fetchCourseLessons = async (id: number): Promise<PaginatedResponse<Lesson> | Lesson[]> => {
  const response = await apiClient.get(`/courses/${id}/lessons/`);
  return response.data;
};

// Teacher specific endpoints
export const createCourse = async (data: CourseWriteRequest): Promise<Course> => {
  const response = await apiClient.post('teacher/courses/create/', data);
  return response.data;
};

export const updateCourse = async (id: number, data: CourseWriteRequest): Promise<Course> => {
  const response = await apiClient.put(`teacher/courses/${id}/update/`, data);
  return response.data;
};

export const deleteCourse = async (id: number): Promise<void> => {
  await apiClient.delete(`teacher/courses/${id}/delete/`);
};
