import type { FC } from "react";
import { 
  FiTrendingUp, 
  FiCheckCircle, 
  FiXCircle, 
  FiAlertCircle,
  FiChevronDown,
  FiCalendar
} from "react-icons/fi";

const MOCK_CLASSES = [
  { id: 1, name: "Class A", date: "Apr 5, 2026", present: 42, absent: 3, percentage: 93 },
  { id: 2, name: "Class B", date: "Apr 5, 2026", present: 42, absent: 3, percentage: 93 },
  { id: 3, name: "Class C", date: "Apr 5, 2026", present: 42, absent: 3, percentage: 93 },
  { id: 4, name: "Class A", date: "Apr 5, 2026", present: 42, absent: 3, percentage: 93 },
];

const MOCK_ACTIVITY = [
  { id: 1, student: "Emma Watson", class: "Class C", date: "Apr 5, 2026", status: "Present" },
  { id: 2, student: "Emma Watson", class: "Class C", date: "Apr 5, 2026", status: "Present" },
  { id: 3, student: "Emma Watson", class: "Class C", date: "Apr 5, 2026", status: "Present" },
  { id: 4, student: "Emma Watson", class: "Class C", date: "Apr 5, 2026", status: "Absent" },
  { id: 5, student: "Emma Watson", class: "Class C", date: "Apr 5, 2026", status: "Late" },
];

const AttendancePage: FC = () => {
  return (
    <div className="space-y-8 animate-fade-in pb-10">
      {/* Header Area */}
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Attendance</h1>
        <p className="text-slate-400 font-medium">Track student attendance</p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-800 mb-1">Avg Performance</p>
            <span className="text-3xl font-black text-slate-800">91%</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-green-100 text-green-500 flex items-center justify-center">
            <FiTrendingUp className="text-xl stroke-[3]" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-800 mb-1">Present Today</p>
            <span className="text-3xl font-black text-slate-800">112</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-500 flex items-center justify-center">
            <FiCheckCircle className="text-xl stroke-[3]" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-800 mb-1">Absent Today</p>
            <span className="text-3xl font-black text-slate-800">8</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-red-100 text-red-500 flex items-center justify-center">
            <FiXCircle className="text-xl stroke-[3]" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-800 mb-1">Late Today</p>
            <span className="text-3xl font-black text-slate-800">4</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-500 flex items-center justify-center">
            <FiAlertCircle className="text-xl stroke-[3]" />
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="relative w-full max-w-xs">
          <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 text-sm font-bold text-slate-800 focus:border-orange-400 outline-none transition-all appearance-none cursor-pointer hover:bg-slate-100">
            <option value="All Classes">All Classes</option>
            <option value="Class A">Class A</option>
            <option value="Class B">Class B</option>
            <option value="Class C">Class C</option>
          </select>
          <FiChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none stroke-[3]" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Class Attendance Summary */}
        <div className="flex-1 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
            <FiCalendar className="text-orange-500" />
            Class Attendance Summary
          </h3>
          
          <div className="space-y-4">
            {MOCK_CLASSES.map((cls, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-100 rounded-3xl p-6 hover:border-slate-200 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-base font-black text-slate-800">{cls.name}</h4>
                    <p className="text-[10px] font-bold text-slate-400 mt-0.5">{cls.date}</p>
                    
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1 text-[10px] font-black text-green-500 uppercase tracking-wider">
                        <FiCheckCircle /> {cls.present} Present
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-black text-red-500 uppercase tracking-wider">
                        <FiXCircle /> {cls.absent} Absent
                      </div>
                    </div>
                  </div>
                  <span className="text-xl font-black text-slate-800">{cls.percentage}%</span>
                </div>
                
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full" 
                    style={{ width: `${cls.percentage}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="flex-1 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <h3 className="text-lg font-black text-slate-800 mb-6">Recent Activity</h3>
          
          <div className="space-y-4">
            {MOCK_ACTIVITY.map((activity, idx) => {
              const initials = activity.student.split(' ').map(n => n[0]).join('');
              
              const statusColors = {
                Present: 'bg-green-100 text-green-500',
                Absent: 'bg-red-100 text-red-500',
                Late: 'bg-yellow-100 text-yellow-600'
              };
              
              return (
                <div key={idx} className="bg-slate-50 border border-slate-100 rounded-[2rem] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-slate-200 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#FF8000] text-white flex items-center justify-center font-black tracking-widest text-lg shrink-0">
                      {initials}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-800 mb-0.5">{activity.student}</h4>
                      <p className="text-[10px] font-bold text-slate-400">
                        {activity.class} • {activity.date}
                      </p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider w-fit sm:w-auto ${statusColors[activity.status as keyof typeof statusColors]}`}>
                    {activity.status}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
