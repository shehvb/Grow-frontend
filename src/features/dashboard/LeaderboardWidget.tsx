import type { FC } from "react";
import type { LeaderboardEntry } from "../../mock/dashboard.mock";
import { FiBarChart2 } from "react-icons/fi";

interface LeaderboardWidgetProps {
  leaderboard: LeaderboardEntry[];
}

const LeaderboardWidget: FC<LeaderboardWidgetProps> = ({ leaderboard }) => {

  return (
    <div className="bg-[#1600D5] rounded-2xl p-5 text-white flex flex-col w-full shadow-sm min-h-[320px]">
      <div className="flex items-center gap-2 mb-6">
        <FiBarChart2 className="w-6 h-6" />
        <h2 className="text-xl font-bold">Leaderboard</h2>
      </div>

      <div className="flex-1 flex flex-col gap-3">
        {leaderboard.map((item) => (
          <div 
            key={item.rank} 
            className={`flex items-center justify-between p-3 rounded-xl ${item.bgTheme}`}
          >
            <div className="flex items-center gap-3">
              <span className="font-bold w-4">{item.rank}</span>
              <div className="w-8 h-8 rounded-full bg-slate-300"></div>
              <span className="font-medium">{item.name}</span>
            </div>
            <div className="text-xs bg-[#FF8000] px-2 py-1 rounded-full font-bold">
              {item.xp} XP
            </div>
          </div>
        ))}
      </div>

      <button className="w-full bg-white text-[#1600D5] font-bold py-3 rounded-xl mt-4 hover:bg-slate-50 transition-colors">
        Full Leaderboard
      </button>
    </div>
  );
};

export default LeaderboardWidget;
