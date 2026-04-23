import type { FC } from "react";
import { FiTrendingUp, FiTrendingDown, FiAlertCircle, FiCheckCircle, FiClock } from "react-icons/fi";
import { FiBookOpen, FiActivity, FiLayers, FiArchive } from "react-icons/fi";

const SubjectIcon = ({ name, className }: { name: string; className?: string }) => {
  switch (name.toLowerCase()) {
    case 'math': return <span className={`font-serif italic text-xl font-black ${className}`}>√x</span>;
    case 'physics': return <FiActivity className={className} />;
    case 'biology': return <FiActivity className={className} />;
    case 'science': return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M10 2v7.3l-4.5 8.2c-.6 1.1-.3 2.5.8 3.1.4.2.8.4 1.2.4h9c1.3 0 2.3-1 2.3-2.3 0-.4-.1-.9-.4-1.2L14 9.3V2h-4zm2 2h2v5.7l4 7.3h-8l4-7.3V4z"/>
        </svg>
      );
    case 'english': return <FiBookOpen className={className} />;
    case 'history': return <FiArchive className={className} />;
    default: return <FiLayers className={className} />;
  }
};

const StatusBadge = ({ status }: { status: string }) => {
  const colors = {
    'Excellent': 'bg-emerald-50 text-emerald-500',
    'Good': 'bg-blue-50 text-[#1600D5]',
    'Improving': 'bg-amber-50 text-amber-500',
    'Needs attention': 'bg-rose-50 text-rose-500',
  };
  return (
    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${colors[status as keyof typeof colors] || 'bg-slate-50 text-slate-500'}`}>
        {status}
    </span>
  );
};

interface SubjectBreakdownCardProps {
  name: string;
  grade: number;
  percentageChange: number;
  status: string;
  upcomingEvent?: {
    name: string;
    date?: string;
    status?: string;
  };
}

const SubjectBreakdownCard: FC<SubjectBreakdownCardProps> = ({
  name,
  grade,
  percentageChange,
  status,
  upcomingEvent
}) => {
  return (
    <div className="bg-white rounded-[24px] p-5 shadow-sm border border-slate-100 flex flex-col gap-4 hover:shadow-md transition-shadow relative overflow-hidden group h-full justify-between">
      <div className="flex items-start justify-between relative z-10">
        <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#1600D5]/10 group-hover:text-[#1600D5] transition-all">
          <SubjectIcon name={name} />
        </div>
        {status === 'Needs attention' && (
           <FiAlertCircle className="w-5 h-5 text-rose-500" />
        )}
      </div>

      <div className="relative z-10">
        <h3 className="text-xl font-black text-slate-800">{name}</h3>
        <div className="flex items-end gap-2 mt-2">
           <span className="text-3xl font-black text-[#0F172A] leading-none tabular-nums tracking-tighter">{grade}%</span>
           <div className={`flex items-center gap-1 text-[10px] font-black mb-1 px-1.5 py-0.5 rounded ${percentageChange >= 0 ? 'text-emerald-500 bg-emerald-50/50' : 'text-rose-500 bg-rose-50/50'}`}>
               {percentageChange >= 0 ? <FiTrendingUp className="w-2.5 h-2.5" /> : <FiTrendingDown className="w-2.5 h-2.5" />}
               {Math.abs(percentageChange)}%
           </div>
        </div>
        <div className="mt-2">
           <StatusBadge status={status} />
        </div>
      </div>

      {upcomingEvent && (
        <div className="pt-4 border-t border-slate-50 relative z-10 flex items-center justify-between">
          <div className="space-y-0.5">
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{upcomingEvent.name}</p>
             <p className="text-xs font-black text-slate-700">{upcomingEvent.date || upcomingEvent.status}</p>
          </div>
          {upcomingEvent.status === 'submitted' ? (
             <FiCheckCircle className="text-emerald-500 w-5 h-5" />
          ) : upcomingEvent.status === 'Due Tomorrow' ? (
             <FiClock className="text-[#FF8000] w-5 h-5" />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SubjectBreakdownCard;
