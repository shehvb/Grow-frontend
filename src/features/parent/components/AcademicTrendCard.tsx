import type { FC } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import { motion } from "framer-motion";

interface AcademicTrendPoint {
  label: string;
  value: number;
}

interface AcademicTrendCardProps {
  data: AcademicTrendPoint[];
  average: number;
  changePercentage: number;
  period: "weekly" | "monthly";
  onPeriodChange?: (period: "weekly" | "monthly") => void;
}

const AcademicTrendCard: FC<AcademicTrendCardProps> = ({
  data,
  average,
  changePercentage,
  period,
  onPeriodChange
}) => {
  return (
    <motion.div 
      initial={{ y: 15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 flex flex-col gap-6 group hover:shadow-md transition-shadow h-full pb-8 overflow-hidden relative"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div className="space-y-1">
          <h2 className="text-xl font-black text-slate-800 tracking-tight">Overall Academic Trend</h2>
          <div className="flex items-end gap-3 mt-2">
             <span className="text-5xl font-black text-[#0F172A] tracking-tighter tabular-nums leading-none">{average}%</span>
             <div className="pb-1">
                <p className="text-sm font-bold text-slate-400">Average Grade</p>
                <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 mt-1 rounded-lg text-xs font-black uppercase tracking-wider ${changePercentage >= 0 ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-500'}`}>
                    {changePercentage >= 0 ? <FiTrendingUp /> : <FiTrendingDown />}
                    {changePercentage >= 0 ? '+' : ''}{changePercentage}%
                </div>
             </div>
          </div>
        </div>

        <div className="bg-slate-100/80 p-1.5 rounded-2xl flex gap-1 self-start md:self-auto">
            <button 
                onClick={() => onPeriodChange?.("weekly")}
                className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${period === "weekly" ? "bg-white text-[#0062FF] shadow-sm scale-[1.02]" : "text-slate-400 hover:text-slate-600"}`}
            >
                Weekly
            </button>
            <button 
                onClick={() => onPeriodChange?.("monthly")}
                className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${period === "monthly" ? "bg-white text-[#0062FF] shadow-sm scale-[1.02]" : "text-slate-400 hover:text-slate-600"}`}
            >
                Monthly
            </button>
        </div>
      </div>

      <div className="flex-grow min-h-[250px] h-[300px] relative -mx-6 -mb-8 mt-2 rounded-b-[32px] overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 30, bottom: 40 }}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0062FF" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#0062FF" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#E2E8F0" />
            <XAxis 
              dataKey="label" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94A3B8', fontSize: 13, fontWeight: 800 }} 
              dy={35}
              textAnchor="middle"
            />
            <YAxis hide domain={[0, 100]} />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '16px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', 
                fontWeight: 900,
                fontSize: '14px',
                color: '#0062FF'
              }} 
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#0062FF" 
              strokeWidth={4} 
              fillOpacity={1} 
              fill="url(#colorGradient)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default AcademicTrendCard;
