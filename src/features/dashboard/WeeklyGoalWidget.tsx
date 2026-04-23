import type { FC } from "react";

interface WeeklyGoalWidgetProps {
  weeklyProgress: number;
  weeklyTarget: number;
}

const WeeklyGoalWidget: FC<WeeklyGoalWidgetProps> = ({ weeklyProgress, weeklyTarget }) => {
  const percentage = Math.min((weeklyProgress / weeklyTarget) * 100, 100);
  const radius = 50;
  const strokeWidth = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center p-6 w-full">      
      <div className="relative w-36 h-36 flex items-center justify-center mb-6 mt-4">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
          <defs>
            <linearGradient id="weeklyProgressGrad" x1="0%" y1="0%" x2="0%" y2="100%">
               <stop offset="0%" stopColor="#FF8000" />
               <stop offset="100%" stopColor="#FBBB7A" />
            </linearGradient>
          </defs>
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#E1EFFF"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="url(#weeklyProgressGrad)"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-[#FF8000]">{Math.round(percentage)}%</span>
        </div>
      </div>
      
      <h3 className="text-slate-800 font-extrabold text-lg mb-1">Weekly Target</h3>
      <p className="text-[#DE0000] text-xs font-bold">-2% behind schedule</p>
    </div>
  );
};

export default WeeklyGoalWidget;
