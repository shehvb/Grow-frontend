import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import type { QuizResult } from "../../types";

interface QuizResultScreenProps {
  result: QuizResult;
  courseId: string;
}

const QuizResultScreen: FC<QuizResultScreenProps> = ({ result, courseId }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto w-full pt-16 pb-20 animate-fade-up font-['Nunito']">
      <div className="flex flex-col items-center flex-1 text-center">
        
        <div className="w-28 h-28 rounded-full bg-[#C7C2FF] text-[#1600D5] flex items-center justify-center mb-8 shadow-sm">
          {result.passed ? (
            <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L8 5H4v4L0 12l4 3v4h4l4 4 4-4h4v-4l4-3-4-3V5h-4L12 1zm0 13c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
              <circle cx="12" cy="10" r="2" fill="white" />
            </svg>
          ) : (
             <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          )}
        </div>

        <h1 className="text-[36px] font-black text-slate-900 tracking-tight mb-3">
          {result.passed ? "Outstanding performance!" : "Keep Practicing!"}
        </h1>
        <p className="text-slate-400 font-bold text-base mb-12 max-w-md">
          {result.passed 
            ? "You've mastered the core concepts of this module."
            : "You didn't reach the passing score this time. Review the material and try again."}
        </p>

        <div className="flex flex-col md:flex-row gap-6 w-full mb-12">
          {/* Final Score Card */}
          <div className="flex-1 bg-white rounded-[16px] p-8 border border-slate-100 shadow-sm flex flex-col items-center justify-center">
            <p className="text-[13px] font-black text-slate-400 uppercase tracking-widest mb-6">FINAL SCORE</p>
            <span className={`text-[80px] leading-none font-black tracking-tighter mb-6 ${result.passed ? 'text-[#1600D5]' : 'text-red-500'}`}>
              {result.scorePercentage}%
            </span>
            <div className={`px-5 py-1 rounded-full border-2 text-[15px] font-black uppercase tracking-wider ${
              result.passed ? 'border-[#0ED600] text-[#0ED600]' : 'border-red-500 text-red-500'
            }`}>
              {result.passed ? 'PASSED' : 'FAILED'}
            </div>
          </div>

          {/* Assessment Progress Card */}
          <div className="flex-[1.5] bg-white rounded-[16px] p-8 border border-slate-100 shadow-sm flex flex-col justify-center text-left">
            <h3 className="text-lg font-black text-slate-900 mb-2">Assessment Progress</h3>
            <div className="flex items-center justify-between text-sm mb-4">
              <span className="text-slate-500 font-bold">Passing requirement: 75%</span>
              <span className="text-[#1600D5] font-black">{result.scorePercentage}%</span>
            </div>
            
            <div className="w-full h-3 bg-[#E2E2E2] rounded-full overflow-hidden mb-8">
              <div 
                className={`h-full transition-all duration-1000 ease-out ${result.passed ? 'bg-[#1600D5]' : 'bg-red-500'}`}
                style={{ width: `${result.scorePercentage}%` }}
              ></div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${result.passed ? 'bg-[#0ED600] text-white' : 'bg-red-500 text-white'}`}>
                {result.passed ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                )}
              </div>
              <p className="text-sm font-bold text-slate-500 leading-relaxed">
                {result.passed 
                  ? "Great job! You've successfully cleared this module and earned 250 XP." 
                  : "You didn't pass the requirements. We recommend reviewing the lessons."}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <button 
            onClick={() => navigate(`/student/courses/${courseId}`)}
            className="px-8 py-[18px] w-full sm:w-auto min-w-[200px] bg-[#1600D5] text-white font-black rounded-[12px] hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center gap-2 text-lg"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            Back to Course
          </button>
          
          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-[18px] w-full sm:w-auto min-w-[200px] bg-[#C7C2FF] text-[#1600D5] font-black rounded-[12px] hover:bg-[#b0a8ff] transition-colors shadow-sm flex items-center justify-center gap-2 text-lg"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.92-10.42l5.58 5.58"/></svg>
            Retake Quiz
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default QuizResultScreen;
