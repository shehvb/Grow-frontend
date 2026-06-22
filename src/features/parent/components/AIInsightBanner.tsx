import type { FC } from "react";
import { motion } from "framer-motion";

interface AIInsightBannerProps {
  title: string;
  description: string;
  actionRequired: boolean;
}

const AIInsightBanner: FC<AIInsightBannerProps> = ({ title, description, actionRequired }) => {
  return (
    <motion.div 
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="bg-white rounded-3xl p-5 md:p-6 border border-slate-100 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group hover:shadow-md transition-all duration-300"
    >
      <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FF8000]"></div>
      
      <div className="flex items-start gap-5">
        <div className="w-14 h-14 rounded-2xl bg-[#FF8000]/10 flex items-center justify-center text-[#FF8000] shrink-0">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18h6" /><path d="M10 22h4" /><path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" />
          </svg>
        </div>
        
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-lg font-extrabold text-slate-800">AI Insight: {title}</h2>
            {actionRequired && (
              <span className="px-3 py-1 bg-[#FF8000] text-white text-[10px] font-black rounded-lg uppercase tracking-wider">
                Action Required
              </span>
            )}
          </div>
          <p className="text-slate-500 font-medium leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>
      </div>
      
      <motion.button 
        animate={{ boxShadow: ["0px 0px 0px rgba(255,128,0,0)", "0px 0px 15px rgba(255,128,0,0.5)", "0px 0px 0px rgba(255,128,0,0)"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="px-6 py-3 bg-[#FF8000] text-white rounded-xl font-black hover:scale-105 flex items-center gap-2 whitespace-nowrap text-sm"
      >
        View Practice Plan <span className="text-lg">→</span>
      </motion.button>
    </motion.div>
  );
};

export default AIInsightBanner;
