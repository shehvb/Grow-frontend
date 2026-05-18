import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { FiBookOpen } from "react-icons/fi";
import type { StudentQuizResult } from "../../types";

interface QuizResultScreenProps {
  result: StudentQuizResult;
  courseId: string;
}

const QuizResultScreen: FC<QuizResultScreenProps> = ({ result, courseId }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto w-full pt-16 pb-20 animate-fade-up font-['Nunito']">
      <div className="flex flex-col items-center flex-1 text-center">
        
        {/* Medal Badge Container */}
        <div className="w-28 h-28 rounded-full bg-[#C7C2FF] flex items-center justify-center mb-8 shadow-sm relative shrink-0 select-none">
          {result.passed ? (
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1600D5]">
              <circle cx="12" cy="8" r="7" fill="#1600D5" stroke="#1600D5" />
              <polygon points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" fill="#1600D5" stroke="#1600D5" />
              <polygon points="12 5 13.53 8.09 16.94 8.59 14.47 11 15.05 14.41 12 12.8 8.95 14.41 9.53 11 7.06 8.59 10.47 8.09" fill="white" />
            </svg>
          ) : (
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" fill="#FEE2E2" stroke="#EF4444" />
              <line x1="15" y1="9" x2="9" y2="15" stroke="#EF4444" strokeWidth="2.5" />
              <line x1="9" y1="9" x2="15" y2="15" stroke="#EF4444" strokeWidth="2.5" />
            </svg>
          )}
        </div>

        <h1 className="text-[38px] font-black text-slate-900 tracking-tight mb-3">
          {result.passed ? "Outstanding performance!" : "Keep Practicing!"}
        </h1>
        <p className="text-slate-400 font-bold text-base mb-12 max-w-md">
          {result.passed 
            ? "You've mastered the core concepts of this module."
            : "You didn't reach the passing score this time. Review the material and try again."}
        </p>

        <div className="flex flex-col md:flex-row gap-6 w-full mb-12">
          {/* Final Score Card */}
          <div className="flex-1 bg-white rounded-[16px] p-8 border border-slate-100 shadow-sm flex flex-col items-center justify-center min-h-[220px]">
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">FINAL SCORE</p>
            <span className={`text-[80px] leading-none font-black tracking-tight mb-4 ${result.passed ? 'text-[#1600D5]' : 'text-red-500'}`}>
              {result.percentage}%
            </span>
            <div className={`px-4 py-1.5 rounded-[8px] border text-[11px] font-black uppercase tracking-wider ${
              result.passed 
                ? 'border-[#0ED600] text-[#0ED600] bg-[#EEFDF0]' 
                : 'border-red-500 text-red-500 bg-red-50'
            }`}>
              {result.passed ? 'PASSED' : 'FAILED'}
            </div>
          </div>

          {/* Assessment Progress Card */}
          <div className="flex-[1.5] bg-white rounded-[16px] p-8 border border-slate-100 shadow-sm flex flex-col justify-center text-left min-h-[220px]">
            <h3 className="text-lg font-black text-slate-900 mb-1">Assessment Progress</h3>
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-3">
              <span>Passing requirement: 75%</span>
              <span className="text-[#1600D5] font-black text-sm">{result.percentage}%</span>
            </div>
            
            <div className="w-full h-3 bg-[#E2E2E2] rounded-full overflow-hidden mb-6">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ease-out ${result.passed ? 'bg-[#1600D5]' : 'bg-red-500'}`}
                style={{ width: `${result.percentage}%` }}
              ></div>
            </div>
            
            <div className="flex items-start gap-3">
              {/* Green check circular icon */}
              <div className={`mt-0.5 shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                result.passed ? 'bg-[#0ED600] text-white' : 'bg-red-500 text-white'
              }`}>
                {result.passed ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                )}
              </div>
              <p className="text-sm font-bold text-slate-500 leading-relaxed">
                {result.passed 
                  ? `Great job! You've successfully cleared this module and earned ${result.xp_awarded || 250} XP.` 
                  : "You didn't pass the requirements. We recommend reviewing the lessons."}
              </p>
            </div>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-row items-center justify-center gap-6 w-full font-['Nunito']">
          <button 
            onClick={() => navigate(`/student/courses/${courseId}`)}
            className="px-6 py-[18px] bg-[#1600D5] hover:bg-blue-700 text-white font-black rounded-xl transition-all shadow-sm flex items-center justify-center gap-2.5 text-base active:scale-[0.98]"
          >
            <FiBookOpen className="text-lg stroke-[2.5]" />
            <span>Back to Course</span>
          </button>
          
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-[18px] bg-[#C7C2FF] hover:bg-[#b5adff] text-[#1600D5] font-black rounded-xl transition-all shadow-sm flex items-center justify-center gap-2.5 text-base active:scale-[0.98]"
          >
            {/* Retake/Rotate arrow icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-[2.5]">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.92-10.42l5.58 5.58"/>
            </svg>
            <span>Retake Quiz</span>
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default QuizResultScreen;
