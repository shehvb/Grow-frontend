import { useState, useEffect } from "react";
import type { FC } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { quizService } from "../../services/quizService";
import type { Quiz, QuizResult } from "../../types";
import QuizResultScreen from "./QuizResultScreen";

const QuizPlayerPage: FC = () => {
  const { courseId, quizId } = useParams<{ courseId: string; quizId: string }>();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  
  const [timeLeft, setTimeLeft] = useState(0); // in seconds
  const [isFinished, setIsFinished] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  // Load Quiz
  useEffect(() => {
    const fetchQuiz = async () => {
      if (!quizId) return;
      setLoading(true);
      try {
        const data = await quizService.getQuizById(quizId);
        if (data) {
          setQuiz(data);
          setTimeLeft(data.durationMinutes * 60);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizId]);

  // Timer
  useEffect(() => {
    if (loading || isFinished || timeLeft <= 0) return;
    
    if (timeLeft === 0 && !isFinished) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, isFinished, timeLeft]);



  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleSubmit = async () => {
    if (!quiz) return;
    try {
      const res = await quizService.submitQuiz(quiz.id, answers);
      setResult(res);
      setIsFinished(true);
    } catch (err) {
      console.error(err);
      alert("Failed to submit quiz.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1600D5]"></div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-800">Quiz not found</h2>
        <button 
          onClick={() => navigate(`/student/courses/${courseId}`)}
          className="mt-4 px-6 py-2 bg-[#1600D5] text-white rounded-lg font-bold"
        >
          Back to Course
        </button>
      </div>
    );
  }

  if (isFinished && result) {
    return <QuizResultScreen result={result} courseId={courseId!} />;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progressPercent = ((Object.keys(answers).length) / quiz.questions.length) * 100;
  


  return (
    <div className="max-w-7xl mx-auto w-full pb-20 flex flex-col lg:flex-row gap-8 font-['Nunito']">
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0 bg-white rounded-[24px] shadow-sm border border-white p-8 md:p-10 relative">
        <div className="flex flex-col mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[22px] font-black text-slate-800">Quiz Progress: {quiz.title}</h2>
            <span className="text-sm font-bold text-[#1600D5]">{currentQuestionIndex + 1} of {quiz.questions.length} Questions</span>
          </div>
          <div className="w-full h-3 bg-[#E2E2E2] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#1600D5] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-8">
          <span className="inline-block bg-[#FFEED9] text-[#FF8000] text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded mb-4">
            MULTIPLE CHOICE
          </span>
          <h1 className="text-[28px] font-black text-[#000000] leading-snug">
            {currentQuestion.text}
          </h1>
        </div>
        
        <div className="space-y-4 mb-20">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = answers[currentQuestion.id] === idx;
            
            return (
              <button
                key={idx}
                onClick={() => handleAnswerSelect(currentQuestion.id, idx)}
                className={`w-full p-6 space-x-5 rounded-2xl border flex items-center text-left font-black transition-all ${
                  isSelected 
                    ? 'border-[#1600D5] bg-[#E6E5FA]' 
                    : 'border-slate-200 bg-[#F8F9FA] hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className={`w-6 h-6 rounded-full border-[3px] flex items-center justify-center shrink-0 shadow-sm ${
                  isSelected ? 'border-[#1600D5] bg-[#1600D5]' : 'border-slate-200 bg-white'
                }`}>
                  <div className={`w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-white' : 'bg-transparent'}`}></div>
                </div>
                <span className={`text-[15px] ${isSelected ? 'text-slate-900' : 'text-slate-800'}`}>{option}</span>
              </button>
            );
          })}
        </div>

        {/* Floating Action Button for Next */}
        <div className="absolute right-[-20px] bottom-[-20px] md:right-8 md:bottom-8 z-20">
          {currentQuestionIndex < quiz.questions.length - 1 ? (
            <button
              onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
              className="w-20 h-20 bg-[#1600D5] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform"
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="h-20 px-8 bg-[#1600D5] text-white font-black rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform text-lg"
            >
              Submit
            </button>
          )}
        </div>
      </div>

      {/* Right: Sidebar */}
      <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-6">
        
        {/* TIME REMAINING */}
        <div className="bg-white rounded-[24px] border border-white shadow-sm p-6 overflow-hidden">
          <div className="flex items-center gap-2 mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF8000"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
            <h3 className="text-[17px] font-black text-[#000000]">TIME REMAINING</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 flex flex-col items-center">
              <div className="w-full h-24 bg-[#E0DEF7] rounded-[16px] border border-[#C7C2FF] flex items-center justify-center mb-2">
                <span className="text-[40px] font-black text-[#1600D5]">
                  {Math.floor(timeLeft / 60).toString().padStart(2, '0')}
                </span>
              </div>
              <span className="text-xs font-bold text-[#1600D5]">Minutes</span>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <div className="w-full h-24 bg-[#FFEED9] rounded-[16px] border border-[#FFD9B3] flex items-center justify-center mb-2">
                <span className="text-[40px] font-black text-[#FF8000]">
                  {(timeLeft % 60).toString().padStart(2, '0')}
                </span>
              </div>
              <span className="text-xs font-bold text-[#FF8000]">Seconds</span>
            </div>
          </div>
        </div>

        {/* QUESTION MAP */}
        <div className="bg-white rounded-[24px] border border-white shadow-sm p-8 overflow-y-auto">
          <h3 className="text-[17px] font-black text-[#000000] mb-6 uppercase tracking-widest">QUESTION MAP</h3>
          <div className="grid grid-cols-4 gap-4">
            {quiz.questions.map((q, idx) => {
              const isAnswered = answers[q.id] !== undefined;
              const isCurrent = idx === currentQuestionIndex;
              
              let bgColor = "bg-[#E2E2E2] text-slate-500";
              if (isCurrent) bgColor = "bg-[#1600D5] text-white shadow-lg";
              else if (isAnswered) bgColor = "bg-[#0ED600] text-white";

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`w-12 h-12 rounded-[12px] font-black text-[18px] flex items-center justify-center transition-all ${bgColor}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
          
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 text-xs font-black text-slate-500">
              <div className="w-4 h-4 rounded-[4px] bg-[#0ED600]"></div> Answered
            </div>
            <div className="flex items-center gap-3 text-xs font-black text-slate-500">
              <div className="w-4 h-4 rounded-[4px] bg-[#1600D5]"></div> Current
            </div>
            <div className="flex items-center gap-3 text-xs font-black text-slate-500">
              <div className="w-4 h-4 rounded-[4px] bg-[#E2E2E2]"></div> Not visited
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default QuizPlayerPage;
