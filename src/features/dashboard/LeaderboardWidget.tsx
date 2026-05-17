import type { FC } from "react";
import type { LeaderboardEntry } from "../../types/student";
import { FiBarChart2 } from "react-icons/fi";

interface LeaderboardWidgetProps {
  leaderboard: LeaderboardEntry[];
}

const LeaderboardWidget: FC<LeaderboardWidgetProps> = ({ leaderboard }) => {

  if (!leaderboard || leaderboard.length === 0) {
    return (
      <div className="bg-[#1600D5] rounded-2xl p-5 text-white flex flex-col w-full shadow-sm min-h-[320px]">
        <div className="flex items-center gap-2 mb-6">
          <FiBarChart2 className="w-6 h-6" />
          <h2 className="text-xl font-bold">Leaderboard</h2>
        </div>
        <div className="flex-1 flex items-center justify-center text-indigo-200">
          No rankings available yet.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1600D5] rounded-2xl p-5 text-white flex flex-col w-full shadow-sm min-h-[320px]">
      <div className="flex items-center gap-2 mb-6">
        <FiBarChart2 className="w-6 h-6" />
        <h2 className="text-xl font-bold">Leaderboard</h2>
      </div>

      <div className="flex-1 flex flex-col gap-3">
        {leaderboard.map((item, index) => {
          if (!item) return null;
          // Keep the previous UI aesthetic by assigning themes based on rank
          const isCurrentUser = index === 1; // Just simulating the "You" highlight
          const bgTheme = isCurrentUser ? "bg-white text-[#1600D5]" : "bg-transparent border border-indigo-500/30 text-white";
          const displayName = isCurrentUser ? "You" : item.username || "Unknown";
          
          return (
            <div 
              key={item.rank || index} 
              className={`flex items-center justify-between p-3 rounded-xl ${bgTheme}`}
            >
              <div className="flex items-center gap-3">
                <span className="font-bold w-4">{item.rank || index + 1}</span>
                <div className={`w-8 h-8 rounded-full ${isCurrentUser ? 'bg-slate-300' : 'bg-indigo-400'}`}></div>
                <span className="font-medium">{displayName}</span>
              </div>
              <div className="text-xs bg-[#FF8000] text-white px-2 py-1 rounded-full font-bold">
                {item.total_xp || 0} XP
              </div>
            </div>
          );
        })}
      </div>

      <button className="w-full bg-white text-[#1600D5] font-bold py-3 rounded-xl mt-4 hover:bg-slate-50 transition-colors">
        Full Leaderboard
      </button>
    </div>
  );
};

export default LeaderboardWidget;
