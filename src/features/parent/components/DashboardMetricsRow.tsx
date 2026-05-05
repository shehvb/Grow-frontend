import type { FC } from "react";
import { FiTrendingUp, FiClock, FiZap } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import type { DashboardMetrics } from "../../../types/parent";

interface DashboardMetricsRowProps {
  metrics?: DashboardMetrics | null;
}

const DashboardMetricsRow: FC<DashboardMetricsRowProps> = ({ metrics = null }) => {
  const navigate = useNavigate();
  // Default values to avoid any null error
  const safeMetrics = metrics || {
    gpa: { value: 3.8, changePercentage: 2.4, trend: "from last month" },
    studyHours: { value: 12.5, changeLabel: "+1.5 hrs", trend: "vs Weekly goal" },
    engagementRate: { value: 92, badge: "Excellent", subtitle: "Top 5% of class" },
  };

  const activeGpa = safeMetrics.gpa;
  const activeEngagement = safeMetrics.engagementRate;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Current GPA */}
      <div 
        onClick={() => navigate("/parent/analytics")}
        className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col justify-between relative overflow-hidden min-h-[160px] cursor-pointer hover:shadow-md transition-shadow group"
      >
        {/* Decorative Blob */}
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-green-50 rounded-full opacity-60"></div>
        
        <div className="flex justify-between items-start relative z-10">
          <div>
            <p className="text-[13px] font-bold text-slate-500 mb-1">Current GPA</p>
            <p className="text-[40px] font-extrabold text-slate-900 leading-tight">
              {activeGpa?.value || 0}
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-green-50 text-green-500 flex items-center justify-center">
            <FiTrendingUp className="w-4 h-4" />
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-4 relative z-10">
          <span className="text-[#1600D5] font-extrabold text-[12px] bg-blue-50 px-2 py-0.5 rounded flex items-center gap-1">
            <FiTrendingUp className="w-3 h-3" />
            {activeGpa?.changePercentage > 0 ? "+" : ""}{activeGpa?.changePercentage}%
          </span>
          <span className="text-xs text-slate-500 font-bold ml-2">{activeGpa?.trend}</span>
        </div>
      </div>

      {/* Study Hours */}
      <div 
        onClick={() => navigate("/parent/analytics")}
        className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col justify-between relative overflow-hidden min-h-[160px] cursor-pointer hover:shadow-md transition-shadow group"
      >
        {/* Decorative Blob */}
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-indigo-50 rounded-full opacity-60"></div>

        <div className="flex justify-between items-start relative z-10">
          <div>
            <p className="text-[13px] font-bold text-slate-500 mb-1">Study Hours</p>
            <p className="text-[40px] font-extrabold text-slate-900 leading-tight flex items-baseline gap-1">
              {safeMetrics.studyHours?.value || 0} <span className="text-base font-bold text-slate-500">hrs</span>
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center">
            <FiClock className="w-4 h-4" />
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-4 relative z-10">
          <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-md">
            {safeMetrics.studyHours?.changeLabel || "+0 hrs"}
          </span>
          <span className="text-xs font-semibold text-slate-400">{safeMetrics.studyHours?.trend}</span>
        </div>
      </div>

      {/* Engagement Rate */}
      <div 
        onClick={() => navigate("/parent/analytics")}
        className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col justify-between relative overflow-hidden min-h-[160px] cursor-pointer hover:shadow-md transition-shadow group"
      >
        {/* Decorative Blob */}
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-fuchsia-50 rounded-full opacity-60"></div>

        <div className="flex justify-between items-start relative z-10">
          <div>
            <p className="text-[13px] font-bold text-slate-500 mb-1">Engagement Rate</p>
            <p className="text-[40px] font-extrabold text-slate-900 leading-tight">
              {activeEngagement?.value || 0}%
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-fuchsia-50 text-fuchsia-500 flex items-center justify-center">
            <FiZap className="w-4 h-4 text-fuchsia-500 fill-current" />
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-4 relative z-10">
          <span className="px-3 py-1 bg-fuchsia-100 text-fuchsia-700 text-xs font-bold rounded-md uppercase tracking-wide">
            {activeEngagement?.badge || "Good"}
          </span>
          <span className="text-xs font-semibold text-slate-400">{activeEngagement?.subtitle}</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardMetricsRow;