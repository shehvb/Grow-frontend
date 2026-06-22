import type { FC } from "react";
import { FiTrendingUp, FiClock, FiZap } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatedNumber } from "../../../components/ui/AnimatedNumber";
import type { DashboardMetrics } from "../../../types/parent";

interface DashboardMetricsRowProps {
  metrics?: DashboardMetrics | null;
}

const DashboardMetricsRow: FC<DashboardMetricsRowProps> = ({ metrics = null }) => {
  const navigate = useNavigate();
  // Default values to avoid any null error
  const safeMetrics = metrics || {
    gpa: { value: 3.8, changePercentage: 2.4, trend: "from last term" },
    studyHours: { value: 12.5, changeLabel: "+1.5 hrs", trend: "vs Weekly goal" },
    studentXp: { value: 9750, changeLabel: "+15%", trend: "From Yesterday" },
  };

  const activeGpa = safeMetrics.gpa;
  const activeXp = safeMetrics.studentXp;

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Current GPA */}
      <motion.div 
        variants={itemVariants}
        whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(34, 197, 94, 0.4)" }}
        transition={{ duration: 0.2 }}
        onClick={() => navigate("/parent/analytics")}
        className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col justify-between relative overflow-hidden min-h-[160px] cursor-pointer hover:shadow-md transition-shadow group"
      >
        {/* Decorative Blob */}
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-green-50 rounded-full opacity-60"></div>
        
        <div className="flex justify-between items-start relative z-10">
          <div>
            <p className="text-[13px] font-bold text-slate-500 mb-1">Current GPA</p>
            <p className="text-[40px] font-extrabold text-slate-900 leading-tight">
              <AnimatedNumber value={activeGpa?.value || 0} />
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-green-50 text-green-500 flex items-center justify-center">
            <FiTrendingUp className="w-4 h-4" />
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-4 relative z-10">
          <span className="text-green-600 font-extrabold text-[12px] bg-green-100 px-2 py-0.5 rounded flex items-center gap-1">
            {activeGpa?.changePercentage > 0 ? "+" : ""}{activeGpa?.changePercentage}%
          </span>
          <span className="text-xs text-slate-500 font-bold ml-2">{activeGpa?.trend}</span>
        </div>
      </motion.div>

      {/* Study Hours */}
      <motion.div 
        variants={itemVariants}
        whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)" }}
        transition={{ duration: 0.2 }}
        onClick={() => navigate("/parent/analytics")}
        className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col justify-between relative overflow-hidden min-h-[160px] cursor-pointer hover:shadow-md transition-shadow group"
      >
        {/* Decorative Blob */}
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-indigo-50 rounded-full opacity-60"></div>

        <div className="flex justify-between items-start relative z-10">
          <div>
            <p className="text-[13px] font-bold text-slate-500 mb-1">Study Hours</p>
            <p className="text-[40px] font-extrabold text-slate-900 leading-tight flex items-baseline gap-1">
              <AnimatedNumber value={safeMetrics.studyHours?.value || 0} /> <span className="text-base font-bold text-slate-500">hrs</span>
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
      </motion.div>

      {/* Student Xp */}
      <motion.div 
        variants={itemVariants}
        whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(217, 70, 239, 0.4)" }}
        transition={{ duration: 0.2 }}
        onClick={() => navigate("/parent/analytics")}
        className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col justify-between relative overflow-hidden min-h-[160px] cursor-pointer hover:shadow-md transition-shadow group"
      >
        {/* Decorative Blob */}
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-fuchsia-50 rounded-full opacity-60"></div>

        <div className="flex justify-between items-start relative z-10">
          <div>
            <p className="text-[13px] font-bold text-slate-500 mb-1">Student Xp</p>
            <p className="text-[40px] font-extrabold text-slate-900 leading-tight">
              <AnimatedNumber value={activeXp?.value || 0} />
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-fuchsia-50 text-fuchsia-500 flex items-center justify-center">
            <FiZap className="w-4 h-4 text-fuchsia-500 fill-current" />
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-4 relative z-10">
          <span className="px-2 py-1 bg-fuchsia-100 text-fuchsia-700 text-xs font-bold rounded-md">
            <FiTrendingUp className="w-3 h-3 inline mr-1" />
            {activeXp?.changeLabel || "+0%"}
          </span>
          <span className="text-xs font-semibold text-slate-400">{activeXp?.trend}</span>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardMetricsRow;