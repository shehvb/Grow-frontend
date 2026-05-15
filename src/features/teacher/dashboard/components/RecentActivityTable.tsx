import type { FC } from "react";

interface RecentActivityTableProps {
  recentActivity: {
    id: number;
    initials: string;
    name: string;
    task: string;
    status: string;
    grade: string;
    time: string;
    color: string;
    statusColor: string;
  }[];
}

const RecentActivityTable: FC<RecentActivityTableProps> = ({ recentActivity }) => {
  return (
    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-black text-slate-800">Recent Student Activity</h3>
        <button className="text-blue-600 font-bold text-sm hover:underline">See All</button>
      </div>
      
      <table className="w-full text-left">
        <thead>
          <tr className="text-xs font-bold text-slate-400 uppercase border-b border-slate-100">
            <th className="pb-3">Student Name</th>
            <th className="pb-3">Task Name</th>
            <th className="pb-3">Status</th>
            <th className="pb-3 text-center">Score</th>
            <th className="pb-3 text-right">Time</th>
          </tr>
        </thead>
        <tbody>
          {recentActivity.map(item => (
            <tr key={item.id} className="border-b border-slate-50 last:border-0">
              <td className="py-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${item.color}`}>
                    {item.initials}
                  </div>
                  <span className="font-bold text-sm text-slate-800">{item.name}</span>
                </div>
              </td>
              <td className="py-4 text-sm font-semibold text-slate-600">{item.task}</td>
              <td className="py-4">
                <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${item.statusColor}`}>
                  {item.status}
                </span>
              </td>
              <td className="py-4 text-center font-black text-slate-800 text-sm">{item.grade}</td>
              <td className="py-4 text-right text-xs font-semibold text-slate-400">{item.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentActivityTable;
