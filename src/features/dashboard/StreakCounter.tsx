import type { FC } from "react";

interface StreakCounterProps {
  streakDays: number;
}

const StreakCounter: FC<StreakCounterProps> = ({ streakDays }) => {
  return (
    <div className="bg-white rounded-2xl p-5 border-2 border-[#FF8000] shadow-sm flex items-center gap-4">
      <div className="w-14 h-14 bg-[#FFF0E0] rounded-xl flex items-center justify-center text-2xl">
        <span className="text-[#FF8000]">🔥</span>
      </div>
      <div className="flex flex-col">
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Daily Streak</p>
        <p className="text-2xl font-extrabold text-slate-900 leading-tight">{streakDays} Days</p>
        <p className="text-[#FF8000] text-[10px] italic font-bold mt-1">
          Top 5% of student!
        </p>
      </div>
    </div>
  );
};

export default StreakCounter;
