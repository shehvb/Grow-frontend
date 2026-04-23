import type { FC } from "react";
import type { Lesson } from "../../types";

interface LessonTabProps {
  lessons: Lesson[];
}

const LessonTab: FC<LessonTabProps> = ({ lessons }) => {
  const activeLesson = lessons.find(l => l.status === "in_progress") || lessons[0];

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Video & Description Section */}
      <div className="flex-1">
        <div className="w-full aspect-[16/9] bg-[#000428] rounded-[24px] flex items-center justify-center mb-6 relative overflow-hidden shadow-sm">
          {!activeLesson?.videoUrl ? (
            <div className="absolute inset-0 bg-gradient-to-r from-[#000428] to-[#004e92] flex items-center justify-center">
              {/* Fake Video Player UI */}
              <div className="w-20 h-20 rounded-full bg-[#1600D5] text-white flex items-center justify-center cursor-pointer shadow-xl hover:scale-105 transition-transform z-10">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4">
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="w-1/3 h-full bg-[#1600D5] relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
             <video src={activeLesson.videoUrl} controls className="w-full h-full object-cover" />
          )}
        </div>

        <div className="bg-white p-8 md:p-10 rounded-[24px] border border-white shadow-sm font-['Nunito']">
          <h2 className="text-[28px] font-black text-slate-900 mb-4">{activeLesson?.title || "Lesson"}</h2>
          <p className="text-slate-600 font-bold mb-6 text-[15px] leading-relaxed">
            {activeLesson?.description || "In this lesson, we explore the essential topics and practical applications."}
          </p>
          
          <hr className="border-slate-100 my-6" />

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-[11px] font-black text-slate-400 uppercase tracking-wider">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                {activeLesson?.duration || "70 min"}
              </span>
              <span className="flex items-center gap-1.5 text-[11px] font-black text-[#FF8000] uppercase tracking-wider">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                Earn 50 XP
              </span>
            </div>
          </div>

          <button className="w-full py-4 bg-[#4182F9] text-white font-black text-[15px] rounded-xl hover:bg-blue-600 transition-colors shadow-sm">
            Mark as Complete
          </button>
        </div>
      </div>

      {/* Syllabus Sidebar */}
      <div className="w-full lg:w-[380px] shrink-0 font-['Nunito']">
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-white mb-6">
          <h3 className="text-xl font-black text-[#000000] mb-6">Course Syllabus:</h3>
          <div className="flex flex-col gap-3">
            {lessons.map((lesson, idx) => {
              const isLocked = lesson.status === "locked";
              const isFinishedOrActive = lesson.status === "completed" || lesson.status === "in_progress";
              return (
                <div 
                  key={lesson.id}
                  className={`p-4 rounded-2xl flex items-start gap-4 transition-all cursor-pointer border ${
                    isFinishedOrActive 
                      ? "bg-[#E6E5FA] border-[#D1CDF5]" 
                      : "bg-slate-50/50 border-white"
                  }`}
                >
                  <div className={`mt-0.5 shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    isFinishedOrActive ? "bg-[#1600D5] text-white shadow-md shadow-indigo-200" : "bg-[#E5E7EB] text-slate-400"
                  }`}>
                    {isFinishedOrActive ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
                    )}
                  </div>
                  <div>
                    <h4 className={`text-[15px] font-black leading-snug ${isLocked ? 'text-slate-400' : 'text-slate-900'}`}>
                      {idx + 1}. {lesson.title}
                    </h4>
                    <p className={`text-xs font-bold mt-1 ${isLocked ? 'text-slate-400' : 'text-slate-500'}`}>
                      {lesson.status === 'completed' ? 'Completed' : lesson.status === 'in_progress' ? 'In Progress' : 'Locked'}
                    </p>
                  </div>
                </div>
              );
            })}
            
            {/* Mid-term Quiz Placeholder in Syllabus */}
            <div className="p-4 rounded-2xl flex items-start gap-4 bg-[#FFEED9] border border-[#FFD9B3] cursor-pointer mt-2">
              <div className="mt-0.5 shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-[#FF8000] text-white shadow-md shadow-orange-200">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5zm0-3.37l-2.61 1.58.69-2.95-2.31-2 3.03-.26 1.2-2.81 1.2 2.81 3.03.26-2.31 2 .69 2.95L12 13.9z"/></svg>
              </div>
              <div>
                <h4 className="text-[15px] font-black text-[#FF8000] leading-snug">Mid-Term Quiz</h4>
                <p className="text-xs font-bold mt-1 text-[#FF8000]">Available after L15</p>
              </div>
            </div>
          </div>
        </div>

        {/* Downloadable Resources */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-white">
          <div className="flex items-center gap-3 mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF8000"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>
            <h3 className="text-[17px] font-black text-[#000000]">Downloadable Resources</h3>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="p-4 rounded-xl border border-slate-100 flex items-center justify-between cursor-pointer hover:border-[#1600D5] transition-colors group bg-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center font-black text-[10px] uppercase">PDF</div>
                <div>
                  <h4 className="text-[13px] font-black text-slate-800">Advanced Calculus Notes.pdf</h4>
                  <p className="text-[11px] font-bold text-slate-400 mt-0.5">2.4 MB</p>
                </div>
              </div>
              <svg className="text-slate-400 group-hover:text-[#1600D5] transition-colors" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            </div>
            
            <div className="p-4 rounded-xl border border-slate-100 flex items-center justify-between cursor-pointer hover:border-[#1600D5] transition-colors group bg-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center font-black text-[10px] uppercase">DOC</div>
                <div>
                  <h4 className="text-[13px] font-black text-slate-800">Integral Theorems Cheat Sheet.docx</h4>
                  <p className="text-[11px] font-bold text-slate-400 mt-0.5">1.1 MB</p>
                </div>
              </div>
              <svg className="text-slate-400 group-hover:text-[#1600D5] transition-colors" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonTab;
