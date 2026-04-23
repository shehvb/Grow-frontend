import type { FC } from "react";
import { getQuiz, type QuizResult } from "../../mock/quiz.mock";
import QuizContainer from "./QuizContainer";

const QuizPage: FC = () => {
  const quiz = getQuiz();
  
  const handleComplete = (result: QuizResult) => {
    console.log("Quiz completed:", result);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{quiz.title}</h1>
        <p className="text-slate-500">Answer all questions to complete the quiz</p>
      </div>
      
      <QuizContainer questions={quiz.questions} onComplete={handleComplete} />
    </div>
  );
};

export default QuizPage;
