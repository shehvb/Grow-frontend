import type { FC, ReactNode } from "react";
import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";

interface KPIStatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: string;
    isUp: boolean;
  };
  iconBgColor?: string;
  iconTextColor?: string;
  delay?: number;
}

const KPIStatCard: FC<KPIStatCardProps> = ({ 
  label, 
  value, 
  icon, 
  trend, 
  iconBgColor = "bg-blue-100",
  iconTextColor = "text-blue-600",
  delay = 0 
}) => {
  return (
    <div 
      className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-all group animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex justify-between items-start mb-4">
        <p className="text-slate-500 font-bold text-sm">{label}</p>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBgColor} ${iconTextColor}`}>
          {icon}
        </div>
      </div>
      
      <div>
        <h3 className="text-4xl font-black text-slate-800 tracking-tight mb-2">{value}</h3>
        {trend ? (
          <div className={`flex items-center text-xs font-bold ${trend.isUp ? 'text-emerald-500' : 'text-red-500'}`}>
            {trend.isUp ? <FiArrowUpRight className="mr-1" /> : <FiArrowDownRight className="mr-1" />}
            {trend.value}
          </div>
        ) : (
          <div className="text-xs font-bold text-slate-400 flex items-center">
            <span className="w-4 border-b-2 border-slate-300 mr-2 inline-block"></span>
            No Change
          </div>
        )}
      </div>
    </div>
  );
};

export default KPIStatCard;
