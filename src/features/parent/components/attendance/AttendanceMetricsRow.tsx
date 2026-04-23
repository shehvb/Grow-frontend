import type { FC } from "react";
import { FiClock, FiZap, FiAlertTriangle } from "react-icons/fi";
import type { AttendanceMetrics } from "../../../../types/parent";

interface AttendanceMetricsRowProps {
  metrics: AttendanceMetrics;
}

const AttendanceMetricsRow: FC<AttendanceMetricsRowProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Study Hours */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between relative overflow-hidden h-44 group hover:shadow-md transition-shadow">
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-indigo-50/50 rounded-full" />
        <div className="flex justify-between items-start z-10">
          <span className="text-sm font-bold text-slate-400">Total Study Hours</span>
          <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-[#1600D5]">
            <FiClock className="w-4 h-4" />
          </div>
        </div>
        <div className="z-10 mt-2 flex items-baseline">
          <span className="text-4xl font-black text-slate-800">{metrics.totalStudyHours.value}</span>
          <span className="text-sm font-bold text-slate-500 ml-1">hrs</span>
        </div>
        <div className="flex items-center gap-2 mt-4 z-10 w-full">
          <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-50 text-[#0062FF]">
             +{metrics.totalStudyHours.changePercentage}%
          </span>
          <span className="text-sm text-slate-400 font-medium">{metrics.totalStudyHours.trendLabel}</span>
        </div>
      </div>

      {/* Study Streak */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between relative overflow-hidden h-44 group hover:shadow-md transition-shadow">
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-green-50/50 rounded-full" />
        <div className="flex justify-between items-start z-10">
          <span className="text-sm font-bold text-slate-400">Study Streak</span>
          <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-emerald-500">
            <FiZap className="w-4 h-4" />
          </div>
        </div>
        <div className="z-10 mt-2 flex items-baseline">
          <span className="text-4xl font-black text-slate-800">{metrics.studyStreak.days}</span>
          <span className="text-sm font-bold text-slate-500 ml-1">Days</span>
        </div>
        <div className="flex items-center gap-2 mt-4 z-10 w-full">
          <span className="px-2 py-0.5 rounded text-xs font-bold bg-green-50 text-emerald-600">
            +{metrics.studyStreak.bestStreak} days
          </span>
          <span className="text-sm text-slate-400 font-medium">{metrics.studyStreak.trendLabel}</span>
        </div>
      </div>

      {/* Attendance Rate */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between relative overflow-hidden h-44 group hover:shadow-md transition-shadow">
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-orange-50/50 rounded-full" />
        <div className="flex justify-between items-start z-10">
          <span className="text-sm font-bold text-slate-400">Attendance Rate</span>
          <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-400">
            <FiAlertTriangle className="w-4 h-4" />
          </div>
        </div>
        <div className="z-10 mt-2 flex items-baseline">
          <span className="text-4xl font-black text-slate-800">{metrics.attendanceRate.value}%</span>
        </div>
        <div className="flex items-center gap-2 mt-4 z-10 w-full">
          <span className="px-2 py-0.5 rounded text-xs font-bold text-orange-500 bg-orange-50">
            {metrics.attendanceRate.missedDays} missed days
          </span>
          <span className="text-sm text-slate-400 font-medium">{metrics.attendanceRate.trendLabel}</span>
        </div>
      </div>
    </div>
  );
};

export default AttendanceMetricsRow;
