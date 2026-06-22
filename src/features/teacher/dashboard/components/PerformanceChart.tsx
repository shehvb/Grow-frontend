import type { FC } from "react";
import { useState, useRef, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion, useInView } from "framer-motion";

// ─── Variant Dictionaries ────────────────────────────────────────────────────

const cardVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" as any },
  },
};

// The clip-mask overlay animates scaleX from 1→0 (left→right reveal)
const chartRevealVariants = {
  hidden: { scaleX: 1 },
  visible: {
    scaleX: 0,
    transition: { duration: 1.1, ease: [0.33, 1, 0.68, 1] as any, delay: 0.3 },
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

interface PerformanceChartProps {
  data: {
    date: string;
    avgScore: number;
  }[];
}

const PerformanceChart: FC<PerformanceChartProps> = ({ data }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) setHasAnimated(true);
  }, [isInView, hasAnimated]);

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={hasAnimated ? "visible" : "hidden"}
      className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-black text-slate-800">
            Class Performance Overview
          </h3>
          <p className="text-slate-400 text-xs font-semibold">
            Average score trends across all math periods
          </p>
        </div>
        <select className="bg-slate-100 border-none rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700 outline-none">
          <option>Last 30 days</option>
        </select>
      </div>

      {/* Chart wrapper with clip-mask reveal overlay */}
      <div className="h-[250px] w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 600 }}
              dy={10}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Area
              type="monotone"
              dataKey="avgScore"
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorScore)"
            />
          </AreaChart>
        </ResponsiveContainer>

        {/* Clip-mask overlay: covers the chart, then slides away left→right */}
        <motion.div
          variants={chartRevealVariants}
          initial="hidden"
          animate={hasAnimated ? "visible" : "hidden"}
          style={{ originX: 0 }}
          className="absolute inset-0 bg-white rounded pointer-events-none z-10"
        />
      </div>
    </motion.div>
  );
};

export default PerformanceChart;
