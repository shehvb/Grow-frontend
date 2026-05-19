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
    const prefix = window.location.pathname.startsWith('/teacher') ? 'teachers' : 'student';
    const response = await apiClient.get(`${prefix}/courses/`);
    return response.data.results || response.data;
  },

  getGrades: async (): Promise<SchoolGrade[]> => {
    const response = await apiClient.get('schools/grades/');
    return response.data.results || response.data || [];
  },


  getCourseById: async (id: number): Promise<Course> => {
    const prefix = window.location.pathname.startsWith('/teacher') ? 'teachers' : 'student';
    try {
      const response = await apiClient.get(`${prefix}/courses/${id}/`);
      return response.data;
    } catch (err) {
      // Fallback to general courses endpoint if role-scoped one fails
      const fallbackResponse = await apiClient.get(`courses/${id}/`);
      return fallbackResponse.data;
    }
  },

  createCourse: async (data: CourseWriteRequest): Promise<Course> => {
    const response = await apiClient.post('teachers/courses/create/', data);
    return response.data;
  },

  updateCourse: async (id: number, data: CourseWriteRequest): Promise<Course> => {
    const response = await apiClient.put(`teachers/courses/${id}/update/`, data);
    return response.data;
  },

  deleteCourse: async (id: number): Promise<void> => {
    await apiClient.delete(`teachers/courses/${id}/delete/`);
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
      ? `teachers/courses/${id}/lessons/` 
      : `courses/${id}/lessons/`;
    const response = await apiClient.get(endpoint);
    return response.data.results || response.data || [];
  },

  createLesson: async (courseId: number, data: any): Promise<any> => {
    const response = await apiClient.post(`teachers/courses/${courseId}/lessons/create/`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  updateLesson: async (lessonId: number, data: any): Promise<any> => {
    const response = await apiClient.patch(`teachers/lessons/${lessonId}/update/`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  deleteLesson: async (lessonId: number): Promise<void> => {
    await apiClient.delete(`teachers/lessons/${lessonId}/delete/`);
  },

  markLessonComplete: async (lessonId: number): Promise<any> => {
    const response = await apiClient.post(`student/lessons/${lessonId}/complete/`);
    return response.data;
  },

  reorderLessons: async (courseId: number, orderedIds: number[]): Promise<any[]> => {
    const response = await apiClient.post(`teachers/courses/${courseId}/lessons/reorder/`, {
      ordered_ids: orderedIds,
    });
    return response.data;
  },
};
