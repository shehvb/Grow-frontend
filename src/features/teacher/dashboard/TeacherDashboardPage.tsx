import type { FC } from "react";
import { 
  FiUsers, 
  FiBookOpen, 
  FiCheckSquare, 
  FiAward, 
  FiAlertTriangle,
  FiHelpCircle
} from "react-icons/fi";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from "recharts";
import KPIStatCard from "../components/KPIStatCard";
import { useTeacherStats } from "../hooks/useTeacherStats";

const MOCK_ACTIVITY = [
  { id: 1, initials: "MF", name: "Mohamed Fawzi", task: "Decimals Worksheet", status: "COMPLETED", grade: "94%", time: "2m ago", color: "bg-blue-100 text-blue-600", statusColor: "bg-emerald-100 text-emerald-600" },
  { id: 2, initials: "AT", name: "Anas Tahoon", task: "Multiplication Quiz", status: "SUBMITTED", grade: "---", time: "14m ago", color: "bg-orange-100 text-orange-600", statusColor: "bg-orange-100 text-orange-600" },
  { id: 3, initials: "AA", name: "Ahmed Ali", task: "Division Practice", status: "IN PROGRESS", grade: "---", time: "1h ago", color: "bg-purple-100 text-purple-600", statusColor: "bg-purple-100 text-purple-600" },
];

const MOCK_TOP_PERFORMERS = [
  { id: 1, name: "Mohamed Fawzi", score: "98.5% avg score" },
  { id: 2, name: "Anas Tahoon", score: "97% avg score" },
  { id: 3, name: "Ahmed Ali", score: "95.5% avg score" },
];

const MOCK_NEEDS_REVIEW = [
  { id: 1, name: "Mazen Ali", score: "55% avg score" },
  { id: 2, name: "Sara Ahmed", score: "35.5% avg score" },
  { id: 3, name: "Mai Ahmed", score: "45% avg score" },
];

const TeacherDashboardPage: FC = () => {
  const { stats, loading } = useTeacherStats();

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Welcome back, Mr. Ahmed</h1>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPIStatCard 
          label="Total Students" 
          value="124" 
          icon={<FiUsers className="text-xl" />} 
          trend={{ value: "+2% from Last month", isUp: true }}
          iconBgColor="bg-indigo-100"
          iconTextColor="text-indigo-600"
        />
        <KPIStatCard 
          label="Total Courses" 
          value="2" 
          icon={<FiBookOpen className="text-xl" />} 
          iconBgColor="bg-orange-100"
          iconTextColor="text-orange-500"
        />
        <KPIStatCard 
          label="Assignments Created" 
          value="48" 
          icon={<FiCheckSquare className="text-xl" />} 
          trend={{ value: "+12% this week", isUp: true }}
          iconBgColor="bg-pink-100"
          iconTextColor="text-pink-500"
        />
        <KPIStatCard 
          label="Active Quizzes" 
          value="3" 
          icon={<FiAward className="text-xl" />} 
          trend={{ value: "-1% vs yesterday", isUp: false }}
          iconBgColor="bg-red-100"
          iconTextColor="text-red-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-black text-slate-800">Class Performance Overview</h3>
              <p className="text-slate-400 text-xs font-semibold">Average score trends across all math periods</p>
            </div>
            <select className="bg-slate-100 border-none rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700 outline-none">
              <option>Last 30 days</option>
            </select>
          </div>
          
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.performanceTrend}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }} 
                  dy={10}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="avgScore" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorScore)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Performers & Needs Review */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex gap-6">
          <div className="flex-1">
            <h3 className="text-xs font-black text-slate-500 mb-6 flex items-center gap-2 uppercase tracking-wide">
              <span className="w-5 h-5 rounded bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <FiAward size={12} />
              </span>
              Top Performers
            </h3>
            <div className="space-y-4">
              {MOCK_TOP_PERFORMERS.map(student => (
                <div key={student.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                    {/* Mock Avatar Placeholder */}
                    <div className="w-4 h-4 bg-slate-400 rounded-sm"></div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{student.name}</p>
                    <p className="text-xs text-slate-400 font-medium">{student.score}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="text-xs font-black text-slate-500 mb-6 flex items-center gap-2 uppercase tracking-wide">
              <FiAlertTriangle className="text-orange-500" />
              Needs Review
            </h3>
            <div className="space-y-4">
              {MOCK_NEEDS_REVIEW.map(student => (
                <div key={student.id} className="flex items-center gap-3 relative">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                    {/* Mock Avatar Placeholder */}
                    <div className="w-4 h-4 bg-slate-400 rounded-sm"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800">{student.name}</p>
                    <p className="text-xs text-slate-400 font-medium">{student.score}</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-orange-500 absolute right-0"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Student Activity */}
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
                <th className="pb-3 text-center">Grade</th>
                <th className="pb-3 text-right">Time</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ACTIVITY.map(item => (
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

        {/* New Feature Banner */}
        <div className="bg-[#FF8000] rounded-xl p-6 text-white relative overflow-hidden flex flex-col justify-center">
          <FiHelpCircle className="absolute -right-6 -bottom-6 w-32 h-32 opacity-20" />
          <h3 className="text-xl font-black mb-2 relative z-10">New Feature</h3>
          <p className="text-sm font-medium text-orange-100 mb-6 relative z-10 w-4/5">
            Try can now auto-grade multiple choice qizzes in seconds
          </p>
          <button className="bg-white text-orange-500 font-black text-sm px-6 py-2 rounded-lg w-fit hover:shadow-lg transition-shadow relative z-10">
            Try it out
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboardPage;
