import apiClient from "./apiClient";
import type { QuizStart, StudentQuizResult } from "../types";
import type { QuizResultDetail } from "../types/teacher";



export const quizService = {
  // Student Endpoints
  getCourseQuizzes: async (courseId: number | string): Promise<any[]> => {
    try {
      const response = await apiClient.get(`quizzes/`, { params: { course: courseId } });
      return response.data.results || response.data;
    } catch (err) {
      console.warn("Failed to fetch quizzes for course:", err);
      return [];
    }
  },

  startQuiz: async (id: string | number): Promise<QuizStart> => {
    const response = await apiClient.post(`student/quizzes/${id}/start/`);
    return response.data;
  },

  submitQuiz: async (quizId: string | number, answers: { question_id: number; answer: string }[]): Promise<StudentQuizResult> => {
    const response = await apiClient.post(`student/quizzes/${quizId}/submit/`, { answers });
    return response.data;
  },

  // Teacher Endpoints
  getTeacherQuizById: async (id: string | number): Promise<any> => {
    const response = await apiClient.get(`teachers/quizzes/${id}/`);
    return response.data;
  },

  getTeacherQuizzes: async (): Promise<any[]> => {
    const response = await apiClient.get('teachers/quizzes/');
    return response.data;
  },

  createQuiz: async (data: any): Promise<any> => {
    const response = await apiClient.post('teachers/quizzes/create/', data);
    return response.data;
  },

  updateQuiz: async (id: string | number, data: any): Promise<any> => {
    const response = await apiClient.put(`teachers/quizzes/${id}/update/`, data);
    return response.data;
  },

  getQuizResults: async (quizId: string | number): Promise<QuizResultDetail[]> => {
    const response = await apiClient.get(`teachers/quizzes/${quizId}/results/`);
    return response.data;
  }
};
