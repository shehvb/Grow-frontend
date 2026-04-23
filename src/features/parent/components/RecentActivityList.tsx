import type { FC } from "react";
import { FiCheck, FiBook, FiChevronRight } from "react-icons/fi";

interface RecentActivityListProps {
  activities: { title: string; score?: string; time: string }[];
}

const RecentActivityList: FC<RecentActivityListProps> = ({ activities }) => {
  return (
    <div className="mt-2">
      <h3 className="font-extrabold text-[#0F172A] text-[17px] mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const isCompleted = activity.title.toLowerCase().includes('completed') || activity.score;
          return (
            <div 
              key={index} 
              className="flex items-center justify-between p-5 bg-white rounded-[24px] shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="flex items-center gap-5">
                <div className={`w-[52px] h-[52px] rounded-[18px] flex items-center justify-center ${
                  isCompleted 
                    ? 'bg-green-100 text-green-500' 
                    : 'bg-[#F0F5FF] text-[#0062FF]'
                }`}>
                  {isCompleted ? <FiCheck className="w-6 h-6 stroke-[3px]" /> : <FiBook className="w-6 h-6 stroke-[2.5px] fill-current" />}
                </div>
                <div className="flex flex-col gap-0.5">
                  <h4 className="font-extrabold text-slate-900 text-[15px]">
                    {activity.title}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {activity.score && (
                      <span className="text-[12px] font-bold text-slate-500">Score: {activity.score}</span>
                    )}
                    {activity.score && <span className="text-slate-300 text-[10px]">●</span>}
                    <span className="text-[12px] font-semibold text-slate-400">{activity.time}</span>
                  </div>
                </div>
              </div>
              <FiChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#0062FF] transition-colors" strokeWidth={2.5} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivityList;
