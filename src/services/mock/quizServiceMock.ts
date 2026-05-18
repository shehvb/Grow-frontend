import type { Quiz, QuizResult } from "../../mock/quiz.mock";

export const mockQuizData: Record<string, Quiz> = {
  "q1": {
    id: "q1",
    title: "Algebra Basics Quiz",
    questions: [
      {
        id: "q1_1",
        text: "What is 15 + 27?",
        options: ["40", "42", "44", "46"],
        correctAnswer: 1,
      },
      {
        id: "q1_2",
        text: "What is 8 × 7?",
        options: ["54", "56", "58", "60"],
        correctAnswer: 1,
      },
      {
        id: "q1_3",
        text: "What is 100 - 37?",
        options: ["63", "67", "73", "77"],
        correctAnswer: 0,
      },
      {
        id: "q1_4",
        text: "What is 144 ÷ 12?",
        options: ["10", "11", "12", "14"],
        correctAnswer: 2,
      },
      {
        id: "q1_5",
        text: "What is the square root of 81?",
        options: ["7", "8", "9", "10"],
        correctAnswer: 2,
      },
    ]
  }
};

export const getMockQuizById = (id: string): Quiz | undefined => {
  return mockQuizData[id];
};

export const submitMockQuiz = (quizId: string, answers: Record<string, number>): QuizResult => {
  const quiz = mockQuizData[quizId];
  if (!quiz) throw new Error("Quiz not found");

  let correctCount = 0;
  quiz.questions.forEach((q: any) => {
    if (answers[q.id] === q.correctAnswer) {
      correctCount++;
    }
  });

  const scorePercentage = Math.round((correctCount / quiz.questions.length) * 100);

  return {
    quizId,
    score: scorePercentage,
    totalQuestions: quiz.questions.length,
    completedAt: new Date().toISOString()
  };
};
