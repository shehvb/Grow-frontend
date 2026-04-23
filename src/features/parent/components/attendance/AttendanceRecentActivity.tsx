import type { FC } from "react";
import { FiMonitor, FiBook } from "react-icons/fi";

const MOCK_DATA = [
  { id: 1, title: "Math: Algebra Basics", date: "Jan 3 • 45 mins", score: 95, iconBg: "bg-orange-50", icon: <FiMonitor className="text-orange-500" /> },
  { id: 2, title: "Science: Ecosystems", date: "Jan 17 • 30 mins", score: 88, iconBg: "bg-indigo-50", icon: <FiBook className="text-[#0062FF]" /> },
  { id: 3, title: "English: Grammar", date: "Jan 8 • 25 mins", score: 100, iconBg: "bg-fuchsia-50", icon: <FiBook className="text-fuchsia-500" /> },
  { id: 4, title: "History: Pyramid builders", date: "Jan 19 • 50 mins", score: 75, iconBg: "bg-orange-50", icon: <FiMonitor className="text-orange-500" /> },
];

const AttendanceRecentActivity: FC = () => {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-black text-slate-800 tracking-tight">Recent Activity</h3>
        <button className="text-xs font-bold text-[#0062FF] hover:underline">See All</button>
      </div>
      
      <div className="space-y-6">
        {MOCK_DATA.map((item) => (
          <div key={item.id} className="flex items-center gap-4 group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.iconBg}`}>
               {item.icon}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sm text-slate-800">{item.title}</h4>
              <p className="text-xs text-slate-400 font-medium">{item.date}</p>
            </div>
            <div className="text-right">
              <span className={`font-black text-sm block ${
                  item.score >= 90 ? 'text-emerald-500' :
                  item.score >= 80 ? 'text-emerald-500' : 'text-orange-500'
              }`}>{item.score}%</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Score</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceRecentActivity;
