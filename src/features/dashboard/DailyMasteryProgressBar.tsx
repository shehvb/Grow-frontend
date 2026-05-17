import type { FC } from "react";

interface DailyMasteryProgressBarProps {
  progress: number;
  level: number;
}

const DailyMasteryProgressBar: FC<DailyMasteryProgressBarProps> = ({ progress, level }) => {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-800">Daily Mastery</h2>
        <span className="text-[#1600D5] font-bold text-[10px] sm:text-sm tracking-widest uppercase">LEVEL {level}</span>
      </div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-slate-500 text-xs sm:text-sm font-medium">Daily Goal Progress</p>
        <span className="text-[#FF8000] font-bold text-base sm:text-lg">{progress}%</span>
      </div>
      <div className="w-full h-4 bg-[#E2E2E2] rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-[#1600D5] via-[#7b4dff] to-[#FF8000] rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-slate-500 text-xs flex items-center gap-1 font-medium">
        Finish your last 2 tasks to turn the bar fully Orange! <span>🏆</span>
      </p>
    </div>
  );
};

export default DailyMasteryProgressBar;
