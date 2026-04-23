import { useState } from "react";
import type { FC } from "react";
import type { Question, QuizResult } from "../../mock/quiz.mock";

interface QuizContainerProps {
  questions: Question[];
  onComplete: (result: QuizResult) => void;
}

const QuizContainer: FC<QuizContainerProps> = ({ questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  
  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  
  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);
    
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const score = newAnswers.filter(
        (a, i) => a === questions[i].correctAnswer
      ).length;
      
      setShowResult(true);
      onComplete({
        quizId: "1",
        score,
        totalQuestions: questions.length,
        completedAt: new Date().toISOString(),
      });
    }
  };
  
  if (showResult) {
    const score = answers.filter(
      (a, i) => a === questions[i].correctAnswer
    ).length;
    
    return (
      <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 text-center">
        <div className="text-6xl mb-4">{score === questions.length ? "🏆" : "📊"}</div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Quiz Complete!</h2>
        <p className="text-xl text-slate-600">
          You scored <span className="font-bold text-emerald-600">{score}</span> out of{" "}
          <span className="font-bold">{questions.length}</span>
        </p>
        <p className="text-slate-500 mt-2">
          {score === questions.length
            ? "Perfect score! Great job!"
            : score >= questions.length * 0.7
            ? "Good work! Keep practicing!"
            : "Keep learning! Try again!"}
        </p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-500">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span className="text-sm text-slate-500">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 bg-slate-200 rounded-full">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-800">{currentQuestion.text}</h3>
      </div>
      
      <div className="space-y-3">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            className="w-full p-4 text-left rounded-lg border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 transition-colors"
          >
            <span className="font-medium text-slate-700">{option}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizContainer;
