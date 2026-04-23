export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizResult {
  quizId: string;
  score: number;
  totalQuestions: number;
  completedAt: string;
}

export const quizMock: Quiz = {
  id: "1",
  title: "Mathematics Basics Quiz",
  questions: [
    {
      id: "1",
      text: "What is 15 + 27?",
      options: ["40", "42", "44", "46"],
      correctAnswer: 1,
    },
    {
      id: "2",
      text: "What is 8 × 7?",
      options: ["54", "56", "58", "60"],
      correctAnswer: 1,
    },
    {
      id: "3",
      text: "What is 100 - 37?",
      options: ["63", "67", "73", "77"],
      correctAnswer: 0,
    },
    {
      id: "4",
      text: "What is 144 ÷ 12?",
      options: ["10", "11", "12", "14"],
      correctAnswer: 2,
    },
    {
      id: "5",
      text: "What is the square root of 81?",
      options: ["7", "8", "9", "10"],
      correctAnswer: 2,
    },
  ],
};

export const getQuiz = (): Quiz => quizMock;
