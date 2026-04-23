import type { FC } from "react";
import { Link } from "react-router-dom";
import { useParentStore } from "../../../store/parentStore";
import type { AttendanceRecord } from "../../../types/parent";
import { FiCalendar, FiCheckCircle, FiClock, FiAlertCircle } from "react-icons/fi";

const AttendanceWidget: FC = () => {
  const { dashboardSummary } = useParentStore();

  if (!dashboardSummary) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Present": return <FiCheckCircle className="text-emerald-500" />;
      case "Late": return <FiClock className="text-[#FF8000]" />;
      case "Absent": return <FiAlertCircle className="text-rose-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Present": return "text-emerald-600 bg-emerald-50";
      case "Late": return "text-[#FF8000] bg-orange-50";
      case "Absent": return "text-rose-600 bg-rose-50";
      default: return "text-slate-500 bg-slate-50";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow duration-300">
      <div className="p-6 border-b border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FF8000]/10 flex items-center justify-center text-[#FF8000]">
            <FiCalendar className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Attendance Status</h2>
        </div>
        <Link 
          to="/parent/attendance" 
          className="text-xs font-black text-[#1600D5] hover:underline uppercase tracking-widest"
        >
          View All
        </Link>
      </div>

      <div className="p-6">
        <div className="bg-slate-50 rounded-2xl p-6 flex items-center justify-around mb-8 border border-slate-100">
            <div className="text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Present</p>
                <p className="text-xl font-black text-emerald-500">{dashboardSummary.attendanceRecords.filter((a: AttendanceRecord) => a.status === 'Present').length}</p>
            </div>
            <div className="w-[1px] h-8 bg-slate-200" />
            <div className="text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Late</p>
                <p className="text-xl font-black text-[#FF8000]">{dashboardSummary.attendanceRecords.filter((a: AttendanceRecord) => a.status === 'Late').length}</p>
            </div>
            <div className="w-[1px] h-8 bg-slate-200" />
            <div className="text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Absent</p>
                <p className="text-xl font-black text-rose-500">{dashboardSummary.attendanceRecords.filter((a: AttendanceRecord) => a.status === 'Absent').length}</p>
            </div>
        </div>

        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Recent Records</h3>
        <div className="space-y-3">
          {dashboardSummary.attendanceRecords.map((record: AttendanceRecord) => (
            <div key={record.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-50 hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-lg">{getStatusIcon(record.status)}</span>
                <span className="font-bold text-slate-700 text-sm">{record.date}</span>
              </div>
              <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${getStatusColor(record.status)}`}>
                {record.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttendanceWidget;
