import apiClient from '../../../services/apiClient';
import type { Course, CourseWriteRequest } from '../types';

const getRolePrefix = () => {
  const path = window.location.pathname;
  if (path.startsWith('/teacher')) return 'teacher';
  if (path.startsWith('/parent')) return 'parent';
  return 'student';
};

export const fetchCourses = async (): Promise<Course[]> => {
  const prefix = getRolePrefix();
  const response = await apiClient.get(`${prefix}/courses/`);
  return response.data;
};

export const fetchCourseDetails = async (id: number): Promise<Course> => {
  const prefix = getRolePrefix();
  const response = await apiClient.get(`${prefix}/courses/${id}/`);
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
