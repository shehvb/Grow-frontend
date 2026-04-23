import type { FC } from "react";
import { FiTrendingUp, FiTarget } from "react-icons/fi";
import type { AiLearningAnalysis } from "../../../../types/parent";

interface AiAnalysisBannerProps {
  data: AiLearningAnalysis;
}

const AiAnalysisBanner: FC<AiAnalysisBannerProps> = ({ data }) => {
  return (
    <div className="bg-[#1600D5]/5 border border-[#1600D5]/10 rounded-[32px] p-10 relative overflow-hidden mb-8 transition-all hover:bg-[#1600D5]/7 group">
      {/* Decorative Brain/Learning SVG Graphic Anchor */}
      <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 opacity-20 group-hover:opacity-30 transition-opacity">
        <svg width="220" height="220" viewBox="0 0 24 24" fill="currentColor" className="text-[#1600D5]">
            <path d="M12,2C6.477,2,2,6.477,2,12s4.477,10,10,10s10-4.477,10-10S17.523,2,12,2z M12,18c-3.314,0-6-2.686-6-6s2.686-6,6-6 s6,2.686,6,6S15.314,18,12,18z M12,8c-2.209,0-4,1.791-4,4s1.791,4,4,4s4-1.791,4-4S14.209,8,12,8z M15,12c0,1.657-1.343,3-3,3 s-3-1.343-3-3s1.343-3,3-3S15,10.343,15,12z" />
            <circle cx="12" cy="12" r="2" />
        </svg>
      </div>

      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12 relative z-10">
        <div className="flex items-center gap-6 flex-1">
          <div className="w-16 h-16 rounded-3xl bg-white shadow-md flex items-center justify-center shrink-0">
             <FiTrendingUp className="text-[#FF8000] w-8 h-8" />
          </div>
          <div>
             <h3 className="text-[#1A1C1E] font-black text-[22px] tracking-tight mb-1">AI Learning Analysis</h3>
             <div className="flex items-center gap-3">
               <span className="text-[#1A1C1E] font-medium text-[16px] leading-snug max-w-md">
                 Mazen has shown a <strong className="font-extrabold text-[#1A1C1E]">{data.improvementPercentage}% improvement in {data.subject}</strong> this month. He seems to respond well to visual problem-solving exercises.
               </span>
             </div>
          </div>
        </div>

        <div className="flex items-center gap-6 flex-1">
          <div className="w-16 h-16 rounded-3xl bg-white shadow-md flex items-center justify-center shrink-0">
             <FiTarget className="text-[#FFB800] w-8 h-8" />
          </div>
          <div>
             <div className="flex items-center gap-2 mb-1">
               <h3 className="text-[#1A1C1E] font-black text-[18px] tracking-tight">Suggested Focus:</h3>
               <span className="text-[#9E9E9E] font-bold text-[16px]">{data.suggestedFocus}</span>
             </div>
             <p className="text-[#9E9E9E] font-medium text-[14px] max-w-md leading-relaxed">
               {data.focusReason}
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAnalysisBanner;
