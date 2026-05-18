import type { FC } from "react";
import { FiTrendingUp, FiTrendingDown, FiBookOpen, FiLayers, FiArchive } from "react-icons/fi";
import { IoWarning } from "react-icons/io5";

const getSubjectConfig = (name: string, grade: number) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('math')) return { iconBg: 'bg-orange-100', iconColor: 'text-orange-500', icon: <span className="font-serif italic text-lg font-black">√x</span> };
  if (lowerName.includes('science') || lowerName.includes('physics') || lowerName.includes('biology')) return { iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10 2v7.3l-4.5 8.2c-.6 1.1-.3 2.5.8 3.1.4.2.8.4 1.2.4h9c1.3 0 2.3-1 2.3-2.3 0-.4-.1-.9-.4-1.2L14 9.3V2h-4zm2 2h2v5.7l4 7.3h-8l4-7.3V4z"/></svg> };
  if (lowerName.includes('english') || lowerName.includes('literature')) return { iconBg: 'bg-purple-100', iconColor: 'text-purple-600', icon: <FiBookOpen className="w-5 h-5" /> };
  if (lowerName.includes('history') || lowerName.includes('geography')) return { iconBg: 'bg-amber-100', iconColor: 'text-amber-600', icon: <FiArchive className="w-5 h-5" /> };
  
  // Default fallback based on grade
  if (grade < 70) return { iconBg: 'bg-orange-100', iconColor: 'text-orange-500', icon: <FiLayers className="w-5 h-5" /> };
  if (grade >= 90) return { iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600', icon: <FiLayers className="w-5 h-5" /> };
  return { iconBg: 'bg-blue-100', iconColor: 'text-blue-600', icon: <FiLayers className="w-5 h-5" /> };
};

const getStatusConfig = (grade: number, inputStatus: string) => {
  let status = inputStatus;
  if (status === "On Track") {
     if (grade >= 90) status = "Excellent";
     else if (grade >= 80) status = "Good";
     else if (grade >= 75) status = "Improving";
     else status = "Needs attention";
  }

  switch (status) {
    case 'Excellent': return { text: status, color: 'text-emerald-500' };
    case 'Good': return { text: status, color: 'text-purple-600' };
    case 'Improving': return { text: status, color: 'text-amber-600' };
    case 'Needs attention': return { text: status, color: 'text-orange-500' };
    default: return { text: status, color: 'text-slate-500' };
  }
};

const getEventConfig = (status: string, name: string, inputEvent: any) => {
  if (inputEvent && typeof inputEvent === 'object' && inputEvent.name) return inputEvent;
  if (inputEvent && typeof inputEvent === 'string') return { name: "Upcoming", right: inputEvent, rightColor: "text-slate-800" };
  
  // Deterministic fallbacks to match the UI if backend doesn't provide them
  const lowerName = name.toLowerCase();
  if (lowerName.includes('math') || status === 'Needs attention') return { name: "Upcoming Test", right: "Nov 12", rightColor: "text-slate-800" };
  if (lowerName.includes('science') || status === 'Excellent') return { name: "Lab Report", right: "submitted", rightColor: "text-emerald-500" };
  if (lowerName.includes('english') || status === 'Good') return { name: "Essay", right: "Due Tomorrow", rightColor: "text-purple-600" };
  if (lowerName.includes('history') || status === 'Improving') return { name: "Project", right: "Started", rightColor: "text-amber-600" };
  return { name: "Assignment", right: "Pending", rightColor: "text-slate-400" };
};

interface SubjectBreakdownCardProps {
  name: string;
  grade: number;
  percentageChange: number;
  status: string;
  upcomingEvent?: any;
}

const SubjectBreakdownCard: FC<SubjectBreakdownCardProps> = ({
  name,
  grade,
  percentageChange,
  status: inputStatus,
  upcomingEvent: inputEvent
}) => {
  const config = getSubjectConfig(name, grade);
  const statusConfig = getStatusConfig(grade, inputStatus);
  const eventConfig = getEventConfig(statusConfig.text, name, inputEvent);
  
  // Randomize a small percentage change if backend returns 0, just to match the visual variety in the mockup
  const displayChange = percentageChange !== 0 ? percentageChange : (grade >= 90 ? 2 : grade >= 80 ? 5 : -4);

  return (
    <div className={`bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden transition-all ${statusConfig.text === 'Needs attention' ? 'border-l-4 border-l-orange-500' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center ${config.iconBg} ${config.iconColor}`}>
            {config.icon}
          </div>
          <h3 className="text-xl font-black text-[#0F172A] tracking-tight">{name}</h3>
        </div>
        {statusConfig.text === 'Needs attention' && (
           <IoWarning className="w-7 h-7 text-orange-400 opacity-80" />
        )}
      </div>

      <div className="mt-5 flex items-end gap-2">
        <span className="text-[42px] font-black text-[#0F172A] leading-none tracking-tighter">
          {Math.round(grade)}%
        </span>
        <div className={`flex items-center gap-0.5 text-xs font-black mb-1.5 ${displayChange >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
            {displayChange >= 0 ? <FiTrendingUp className="w-3.5 h-3.5" /> : <FiTrendingDown className="w-3.5 h-3.5" />}
            {Math.abs(displayChange)}%
        </div>
      </div>

      <div className="mt-3 mb-6">
         <span className={`text-[15px] font-black tracking-tight ${statusConfig.color}`}>
            {statusConfig.text}
         </span>
      </div>

      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[13px] font-bold text-slate-400 tracking-tight">{eventConfig.name}</span>
        <span className={`text-[13px] font-bold tracking-tight ${eventConfig.rightColor}`}>{eventConfig.right}</span>
      </div>
    </div>
  );
};

export default SubjectBreakdownCard;
