import type { FC } from "react";
import { FiTrendingUp, FiClock, FiZap } from "react-icons/fi";

interface MetricItem {
  value: number;
  changeLabel: string;
  trend: string;
}

interface DashboardMetricsRowProps {
  metrics?: {
    gpa?: MetricItem;
    studyHours?: MetricItem;
    engagement?: MetricItem;
  } | null;
}

const DashboardMetricsRow: FC<DashboardMetricsRowProps> = ({ metrics = null }) => {
  // Default values عشان نتجنب أي null error
  const safeMetrics = metrics || {
    gpa: { value: 3.8, changeLabel: "+2.4%", trend: "up" },
    studyHours: { value: 12.5, changeLabel: "+1.5 hrs", trend: "up" },
    engagement: { value: 92, changeLabel: "Excellent", trend: "up" },
  };

  const activeGpa = safeMetrics.gpa || (safeMetrics as any).currentGPA;
  const activeEngagement = safeMetrics.engagement || (safeMetrics as any).engagementRate;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Current GPA */}
      <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col justify-between relative overflow-hidden min-h-[160px]">
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
          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-md">
            {activeGpa?.changeLabel || "+0%"}
          </span>
          <span className="text-xs font-semibold text-slate-400">from last term</span>
        </div>
      </div>

      {/* Study Hours */}
      <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col justify-between relative overflow-hidden min-h-[160px]">
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
          <span className="text-xs font-semibold text-slate-400">vs Weekly goal</span>
        </div>
      </div>

      {/* Engagement Rate */}
      <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col justify-between relative overflow-hidden min-h-[160px]">
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
          <span className="px-2 py-1 bg-fuchsia-100 text-fuchsia-700 text-xs font-bold rounded-md uppercase tracking-wide px-3">
            {activeEngagement?.changeLabel || "Good"}
          </span>
          <span className="text-xs font-semibold text-slate-400">Top 5% of class</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardMetricsRow;