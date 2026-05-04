import type { FC } from "react";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface GpaTrendPoint {
  month: string;
  value: number;
}

interface GpaTrendChartProps {
  data: GpaTrendPoint[];
  metrics: any;
}

const GpaTrendChart: FC<GpaTrendChartProps> = ({ data, metrics }) => {
  const navigate = useNavigate();
  const activeGpa = metrics?.gpa || metrics?.currentGPA;

  // حماية ضد null
  if (!metrics || !activeGpa) {
    return (
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 h-full flex flex-col items-center justify-center">
        <p className="text-slate-400 text-lg">GPA Trend Chart</p>
        <p className="text-slate-500 text-sm mt-2">Will appear here once data is loaded</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 h-full flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-base font-extrabold text-[#0F172A]">Current GPA</h3>
            <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-green-100 text-green-700">
              {activeGpa.changeLabel}
            </span>
          </div>
          <div className="mt-2">
            <span className="text-[40px] font-extrabold text-slate-900 leading-tight">
              {activeGpa.value.toFixed(1)}
            </span>
          </div>
          <p className="text-[13px] text-slate-400 font-bold mt-1">Top 5% of class</p>
        </div>
        <button 
          onClick={() => navigate("/parent/reports")}
          className="flex items-center gap-1.5 text-[#0062FF] font-extrabold text-sm hover:underline mt-1"
        >
          View Full Report <FiArrowRight className="w-4 h-4" strokeWidth={3} />
        </button>
      </div>

      <div className="flex-1 w-full h-48 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0062FF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0062FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 600 }}
              dy={10}
            />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ color: '#0062FF', fontWeight: 'bold' }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#0062FF"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorGpa)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GpaTrendChart;