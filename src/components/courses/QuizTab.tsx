import type { FC } from "react";
import type { QuizSummary } from "../../types";
import { useNavigate } from "react-router-dom";

interface QuizTabProps {
  courseId: string;
  quizzes: QuizSummary[];
}

const QuizTab: FC<QuizTabProps> = ({ courseId, quizzes }) => {
  const navigate = useNavigate();

  if (quizzes.length === 0) {
    return (
      <div className="py-12 bg-white rounded-2xl border border-slate-100 shadow-sm text-center">
        <h3 className="text-xl font-bold text-slate-800 mb-2">No Quizzes Yet</h3>
        <p className="text-slate-500 font-medium">This course doesn't have any quizzes.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {quizzes.map((quiz) => (
        <div key={quiz.id} className="bg-white rounded-[24px] overflow-hidden border border-white shadow-sm flex flex-col group font-['Nunito']">
          {/* Top Banner Area */}
          <div className="h-36 bg-[#C7C2FF] relative overflow-hidden flex flex-col p-4">
            <span className="bg-[#1600D5] text-white text-[10px] font-black px-2 py-1 rounded w-max uppercase tracking-wider">
              {`MODULE 1`} {/* Example hardcoded module to match image "MOUDLE 1" */}
            </span>
            {/* Background math icon watermark */}
            <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-40 text-[#1600D5]">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 14l3 3 4-10H3 M16 7l5 5M16 12l5-5"/>
              </svg>
            </div>
          </div>
          
          {/* Card Body */}
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-xl font-black text-slate-900 mb-2">{quiz.title}</h3>
            <p className="text-sm font-semibold text-slate-500 mb-6 leading-relaxed">
              Test your understanding of the core concepts related to this module.
            </p>
            
            <div className="flex items-center gap-6 mt-auto mb-6">
              <div className="flex items-center gap-1.5 text-xs font-black text-slate-500 uppercase tracking-widest">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
                </svg>
                {quiz.questionCount} QS
              </div>
              <div className="flex items-center gap-1.5 text-xs font-black text-slate-500 uppercase tracking-widest">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14" stroke="black" strokeWidth="2" fill="none"></polyline>
                </svg>
                {quiz.durationMinutes} Mins
              </div>
            </div>
            
            <button 
              onClick={() => navigate(`/student/courses/${courseId}/quiz/${quiz.id}`)}
              className="w-full py-3.5 bg-[#1600D5] text-white font-black rounded-lg hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 text-[15px]"
            >
              Start Quiz
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizTab;
