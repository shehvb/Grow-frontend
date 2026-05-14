import apiClient from './apiClient';
import type { Course, Enrollment, CourseWriteRequest } from '../types/course';

export interface SchoolGrade {
  id: number;
  name: string;
  level: number;
  stage: string;
}


export const courseService = {
  listCourses: async (): Promise<Course[]> => {
    const prefix = window.location.pathname.startsWith('/teacher') ? 'teacher' : 'student';
    const response = await apiClient.get(`${prefix}/courses/`);
    return response.data;
  },

  getGrades: async (): Promise<{ results: SchoolGrade[] }> => {
    // Note: The API returns a paginated list {"count": X, "next": ..., "previous": ..., "results": [...]}
    const response = await apiClient.get(`schools/grades/`);
    return response.data;
  },


  getCourseById: async (id: number): Promise<Course> => {
    const prefix = window.location.pathname.startsWith('/teacher') ? 'teacher' : 'student';
    const response = await apiClient.get(`${prefix}/courses/${id}/`);
    return response.data;
  },

  createCourse: async (data: CourseWriteRequest): Promise<Course> => {
    const response = await apiClient.post('teacher/courses/create/', data);
    return response.data;
  },

  updateCourse: async (id: number, data: CourseWriteRequest): Promise<Course> => {
    const response = await apiClient.put(`teacher/courses/${id}/update/`, data);
    return response.data;
  },

  deleteCourse: async (id: number): Promise<void> => {
    await apiClient.delete(`teacher/courses/${id}/delete/`);
  },

  enrollInCourse: async (id: number): Promise<Enrollment> => {
    const response = await apiClient.post(`courses/${id}/enroll/`);
    return response.data;
  },

  getCourseStudents: async (courseId: number): Promise<any[]> => {
    const response = await apiClient.get(`courses/${courseId}/students/`);
    return response.data;
  },

  listLessons: async (id: number): Promise<any[]> => {
    const endpoint = window.location.pathname.startsWith('/teacher') 
      ? `teacher/courses/${id}/lessons/` 
      : `courses/${id}/lessons/`;
    const response = await apiClient.get(endpoint);
    return response.data;
  },

  createLesson: async (courseId: number, data: any): Promise<any> => {
    const response = await apiClient.post(`teacher/courses/${courseId}/lessons/create/`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  updateLesson: async (lessonId: number, data: any): Promise<any> => {
    const response = await apiClient.patch(`teacher/lessons/${lessonId}/update/`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  deleteLesson: async (lessonId: number): Promise<void> => {
    await apiClient.delete(`teacher/lessons/${lessonId}/delete/`);
  },

  markLessonComplete: async (lessonId: number): Promise<any> => {
    const response = await apiClient.post(`student/lessons/${lessonId}/complete/`);
    return response.data;
  },
};
