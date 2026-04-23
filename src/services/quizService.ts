import type { Quiz, QuizResult } from "../types";
import { getMockQuizById, submitMockQuiz } from "./mock/quizServiceMock";

// BACKEND DEVELOPER INSTRUCTIONS:
// 1. In a real environment, quizzes should not expose `correctAnswerIndex` to the frontend until the quiz is submitted. 
// 2. The `submitQuiz` endpoint should accept the answers (e.g., `{ [questionId]: answerIndex }`), calculate the score serverside, and return a `QuizResult`.
// 3. Update the imports to use your HTTP client (e.g., Axios or Fetch).

export const quizService = {
  // BACKEND: API Endpoint should be `GET /api/quizzes/:id`
  getQuizById: async (id: string): Promise<Quiz | undefined> => {
    // return axios.get(`/api/quizzes/${id}`).then(res => res.data);
    return getMockQuizById(id);
  },

  // BACKEND: API Endpoint should be `POST /api/quizzes/:id/submit`
  submitQuiz: async (quizId: string, answers: Record<string, number>): Promise<QuizResult> => {
    // return axios.post(`/api/quizzes/${quizId}/submit`, { answers }).then(res => res.data);
    return submitMockQuiz(quizId, answers);
  }
};
