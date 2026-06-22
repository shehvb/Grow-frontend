import type { FC } from "react";
import { FiClock, FiFileText, FiCalendar, FiAlertTriangle } from "react-icons/fi";
import { motion } from "framer-motion";
import { AnimatedNumber } from "../../../../components/ui/AnimatedNumber";
import type { ReportMetrics } from "../../../../types/parent";

interface ReportMetricsRowProps {
  metrics: ReportMetrics;
}

const ReportMetricsRow: FC<ReportMetricsRowProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Overall Average */}
      <div className="bg-white rounded-[28px] p-8 shadow-[0_4px_20px_0_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col justify-between relative overflow-hidden h-[180px]">
        <div className="absolute -top-6 right-1 w-24 h-24 bg-indigo-50 rounded-bl-[48px] flex items-center justify-center pt-4 pl-4 transition-transform group-hover:scale-110">
            <FiClock className="text-indigo-600 w-6 h-6" />
        </div>
        <div>
          <span className="text-[14px] font-bold text-[#9E9E9E] tracking-tight">Overall Average</span>
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <motion.span 
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-[44px] font-black text-[#1A1C1E] tracking-tighter leading-none inline-block origin-center tabular-nums"
          >
            <AnimatedNumber value={metrics.overallAverage.percentage} />%
          </motion.span>
          <span className="text-[20px] font-extrabold text-[#9E9E9E]">{metrics.overallAverage.grade}</span>
        </div>
        <div className="mt-4 flex items-center">
          <span className="bg-indigo-50 text-indigo-600 text-[12px] font-black px-2 py-0.5 rounded-md">
            +{metrics.overallAverage.change}
          </span>
          <span className="text-[13px] text-[#9E9E9E] font-bold ml-2 tracking-tight">from last month</span>
        </div>
      </div>

      {/* Assignments */}
      <div className="bg-white rounded-[28px] p-8 shadow-[0_4px_20px_0_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col justify-between relative overflow-hidden h-[180px]">
        <div className="absolute -top-6 right-0 w-24 h-24 bg-orange-50 rounded-bl-[48px] flex items-center justify-center pt-4 pl-4">
            <FiFileText className="text-orange-500 w-6 h-6" />
        </div>
        <div>
          <span className="text-[14px] font-bold text-[#9E9E9E] tracking-tight">Assignments</span>
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <motion.span 
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true }}
            className="text-[44px] font-black text-[#1A1C1E] tracking-tighter leading-none inline-block origin-center tabular-nums"
          >
            <AnimatedNumber value={metrics.assignments.total} />
          </motion.span>
          <span className="text-[18px] font-extrabold text-[#9E9E9E]">Days</span>
        </div>
        <div className="flex items-center gap-2 mt-4 text-orange-500 font-extrabold text-[13px] tracking-tight">
          <FiAlertTriangle className="w-4 h-4" /> {metrics.assignments.lateSubmission} late submission
        </div>
      </div>

      {/* Attendance */}
      <div className="bg-white rounded-[28px] p-8 shadow-[0_4px_20px_0_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col justify-between relative overflow-hidden h-[180px]">
        <div className="absolute -top-6 right-0 w-24 h-24 bg-fuchsia-50 rounded-bl-[48px] flex items-center justify-center pt-4 pl-4">
            <FiCalendar className="text-fuchsia-500 w-6 h-6" />
        </div>
        <div>
          <span className="text-[14px] font-bold text-[#9E9E9E] tracking-tight">Attendance</span>
        </div>
        <div className="mt-1 flex items-baseline">
          <motion.span 
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="text-[44px] font-black text-[#1A1C1E] tracking-tighter leading-none inline-block origin-center tabular-nums"
          >
            <AnimatedNumber value={metrics.attendance.percentage} />%
          </motion.span>
        </div>
        <div className="mt-4">
          <p className="text-[13px] text-[#9E9E9E] font-bold tracking-tight leading-snug">
            Perfect attendance streak: <span className="text-[#1A1C1E]">{metrics.attendance.perfectStreakDays} days</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReportMetricsRow;
