import type { FC } from "react";

interface XPCardProps {
  totalXp: number;
  xpChange: string;
}

const XPCard: FC<XPCardProps> = ({ totalXp, xpChange }) => {
  return (
    <div className="bg-white rounded-2xl p-5 border-2 border-[#1600D5] shadow-sm flex items-center gap-4">
      <div className="w-14 h-14 bg-[#EAE8FA] rounded-xl flex items-center justify-center text-2xl">
        <span className="text-[#1600D5]">★</span>
      </div>
      <div className="flex flex-col">
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Total XP</p>
        <div className="flex items-baseline gap-1">
          <p className="text-2xl font-extrabold text-slate-900">{totalXp.toLocaleString()}</p>
          <span className="text-xs text-slate-500 font-bold uppercase">XP</span>
        </div>
        <p className="text-emerald-500 text-[10px] font-bold mt-1 tracking-wide uppercase">
          <span className="mr-1 text-sm leading-none">↗</span>{xpChange}
        </p>
      </div>
    </div>
  );
};

export default XPCard;
