import type { FC } from "react";
import { FiStar } from "react-icons/fi";
import type { AiTutorSettings } from "../../../../types/parent";

interface AiTutorSettingsCardProps {
  settings: AiTutorSettings;
  onToggle?: () => void;
}

export const AiTutorSettingsCard: FC<AiTutorSettingsCardProps> = () => {
  return (
    <div className="rounded-[24px] p-8 border border-indigo-500 shadow-xl shadow-indigo-600/10 relative overflow-hidden bg-gradient-to-br from-[#1600D5] to-indigo-900 min-h-[300px] flex flex-col justify-between">
       {/* Background star effects */}
       <div className="absolute top-8 left-8 flex -space-x-1">
          <FiStar className="text-white w-6 h-6 fill-white" />
          <FiStar className="text-white w-4 h-4 fill-white translate-y-3" />
       </div>

       <div>
          <h2 className="text-xl font-black text-white mt-8 mb-4 tracking-wide ml-14">AI Tutor Settings</h2>
          <p className="text-indigo-100 font-medium text-sm leading-relaxed mb-6">
             Control how AI interacts with your children's learning path.
          </p>
       </div>

       <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-4 mb-6 relative hover:bg-white/15 transition-colors cursor-pointer">
          <div className="flex justify-between items-center mb-1">
             <h3 className="font-bold text-white tracking-wide">Homework Helper</h3>
             <span className="bg-[#FF8000] text-white text-[10px] font-black tracking-widest px-2 py-0.5 rounded-md uppercase">New</span>
          </div>
          <p className="text-indigo-100/80 text-xs font-medium leading-relaxed max-w-[200px]">
             Allow AI to suggest practice problems based on mistakes.
          </p>
       </div>

       <button className="w-full bg-white hover:bg-slate-50 text-[#1600D5] font-black py-3.5 rounded-2xl transition-all shadow-md mt-auto z-10">
          Manage Preferences
       </button>
    </div>
  );
};

export default AiTutorSettingsCard;
