import apiClient from "./apiClient";
import type { Quiz, QuizResult } from "../types";
import type { QuizResultDetail } from "../types/teacher";


// BACKEND DEVELOPER INSTRUCTIONS:
// 1. In a real environment, quizzes should not expose `correctAnswerIndex` to the frontend until the quiz is submitted. 
// 2. The `submitQuiz` endpoint should accept the answers (e.g., `{ [questionId]: answerIndex }`), calculate the score serverside, and return a `QuizResult`.
// 3. Update the imports to use your HTTP client (e.g., Axios or Fetch).

export const quizService = {
  // Student Endpoints
  getQuizById: async (id: string): Promise<Quiz | undefined> => {
    const response = await apiClient.get(`student/quizzes/${id}/`);
    return response.data;
  },

  submitQuiz: async (quizId: string, answers: Record<string, number>): Promise<QuizResult> => {
    const response = await apiClient.post(`student/quizzes/${quizId}/submit/`, { answers });
    return response.data;
  },

  // Teacher Endpoints
  getTeacherQuizById: async (id: string | number): Promise<any> => {
    const response = await apiClient.get(`teacher/quizzes/${id}/`);
    return response.data;
  },

  getTeacherQuizzes: async (): Promise<any[]> => {
    const response = await apiClient.get('teacher/quizzes/');
    return response.data;
  },

  createQuiz: async (data: any): Promise<any> => {
    const response = await apiClient.post('teacher/quizzes/create/', data);
    return response.data;
  },

  updateQuiz: async (id: string | number, data: any): Promise<any> => {
    const response = await apiClient.put(`teacher/quizzes/${id}/update/`, data);
    return response.data;
  },

  getQuizResults: async (quizId: string | number): Promise<QuizResultDetail[]> => {
    const response = await apiClient.get(`teacher/quizzes/${quizId}/results/`);
    return response.data;
  }
};
