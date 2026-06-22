import type { FC, ReactNode } from "react";
import { motion } from "framer-motion";
import { AnimatedNumber } from "../../../components/ui/AnimatedNumber";

interface AnalyticsMetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  changeLabel?: string;
  icon: ReactNode;
  iconBg: string;
  iconColor: string;
  progressPercentage?: number;
  progressColor?: string;
  rightBadge?: string;
}

const AnalyticsMetricCard: FC<AnalyticsMetricCardProps> = ({
  title,
  value,
  subtitle,
  changeLabel,
  icon,
  iconBg,
  iconColor,
  progressPercentage,
  progressColor = "bg-[#1600D5]",
  rightBadge
}) => {
  return (
    <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col h-full hover:shadow-md transition-shadow relative overflow-hidden group">
      {/* Background Decorative Shape */}
      <div className={`absolute -right-12 -top-12 w-48 h-48 rounded-full ${iconBg} opacity-20 group-hover:scale-110 transition-transform duration-500`}></div>
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${iconBg} ${iconColor} shadow-sm`}>
          {icon}
        </div>
        {rightBadge && (
           <span className="px-3 py-1 bg-emerald-50 text-emerald-500 text-[10px] font-black rounded-lg uppercase tracking-wider">
              {rightBadge}
           </span>
        )}
      </div>

      <div className="space-y-1 relative z-10">
        <h3 className="text-lg font-bold text-slate-500">{title}</h3>
        <div className="flex items-baseline gap-2">
           <span className="text-4xl font-black text-[#0F172A] tracking-tighter tabular-nums leading-none">
             {typeof value === 'number' ? <AnimatedNumber value={value} /> : value}
           </span>
           {subtitle && <span className="text-lg font-bold text-slate-400">{subtitle}</span>}
        </div>
        {changeLabel && (
          <p className="text-xs font-black text-slate-400 mt-2 uppercase tracking-widest">{changeLabel}</p>
        )}
      </div>

      {progressPercentage !== undefined && (
        <div className="mt-8 relative z-10 space-y-3">
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
             <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className={`h-full rounded-full ${progressColor}`} 
             />
          </div>
          {progressPercentage === 100 && (
             <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest text-center">COMPLETED</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AnalyticsMetricCard;
