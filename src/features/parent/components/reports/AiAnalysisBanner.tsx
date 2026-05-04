import type { FC } from "react";
import { BsStars, BsLightbulb } from "react-icons/bs";
import type { AiLearningAnalysis } from "../../../../types/parent";
import BrainImage from "../../../../assets/image.png";

interface AiAnalysisBannerProps {
  data: AiLearningAnalysis;
}

const AiAnalysisBanner: FC<AiAnalysisBannerProps> = ({ data }) => {
  return (
    <div className="bg-[#F5F3FF] border border-dashed border-[#C7D2FE] rounded-[16px] p-8 relative overflow-hidden mb-8">
      {/* Decorative Image */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-100 hidden md:block">
        <img src={BrainImage} alt="AI Analysis" className="w-48 h-auto object-contain" />
      </div>

      <div className="flex flex-col gap-6 relative z-10 max-w-[70%]">
        {/* Top Section */}
        <div>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
               <BsStars className="text-[#F59E0B] w-6 h-6" />
            </div>
            <h3 className="text-[#1A1C1E] font-black text-[20px] tracking-tight">AI Learning Analysis</h3>
          </div>
          <div className="pl-16">
            <p className="text-[#64748B] font-medium text-[15px] leading-relaxed">
              <span className="text-[#30B175] mr-1">↗</span> Mazen has shown a <strong className="font-extrabold text-[#1A1C1E]">{data.improvementPercentage}% improvement in {data.subject}</strong> this month.<br/>
              He seems to respond well to visual problem-solving exercises.
            </p>
          </div>
        </div>
        <div className="pl-[22px]">
          <div className="flex items-start gap-4">
            <BsLightbulb className="text-[#F59E0B] w-6 h-6 shrink-0 mt-0.5" />
            <p className="text-[#64748B] font-medium text-[15px] leading-relaxed">
              <strong className="text-[#1A1C1E] font-black mr-2">Suggested Focus:</strong>{data.suggestedFocus}<br/>
              {data.focusReason}
            </p>
          </div>
        </div>

        {/* Bottom Section */}
      </div>
    </div>
  );
};

export default AiAnalysisBanner;
