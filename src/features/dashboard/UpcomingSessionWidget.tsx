import type { FC } from "react";
import { FiMessageSquare, FiClock } from "react-icons/fi";

const UpcomingSessionWidget: FC = () => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm w-full flex items-center justify-between relative mt-6">
      <div className="flex flex-col gap-3">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Upcoming Session</span>

        <div className="flex items-start gap-4">
          <div className="bg-[#EAE8FA] text-[#1600D5] rounded-xl flex flex-col items-center justify-center p-2 w-12 h-12 flex-shrink-0">
            <span className="font-bold text-sm leading-none">24</span>
            <span className="text-[10px] font-medium uppercase mt-1">OCT</span>
          </div>

          <div className="flex flex-col">
            <h3 className="font-bold text-slate-800 text-sm leading-tight max-w-[140px]">
              Advanced Data Visualization
            </h3>
            <div className="flex items-center gap-1 text-slate-500 text-xs mt-1">
              <FiClock size={12} />
              <span>14:00 - 15:30</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default UpcomingSessionWidget;
