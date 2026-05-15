import apiClient from '../../../services/apiClient';
import type { Lesson, LessonRequest } from '../types';



export const fetchLessons = async (courseId: number): Promise<Lesson[]> => {
  if (window.location.pathname.startsWith('/teacher')) {
    const response = await apiClient.get(`teacher/courses/${courseId}/lessons/`);
    return response.data;
  }
  const response = await apiClient.get(`courses/${courseId}/lessons/`);
  return response.data;
};

// Teacher specific endpoint
export const createLesson = async (courseId: number, data: LessonRequest): Promise<Lesson> => {
  const response = await apiClient.post(`teacher/courses/${courseId}/lessons/create/`, data);
  return response.data;
};
