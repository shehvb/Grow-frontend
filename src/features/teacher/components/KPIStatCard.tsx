import type { FC, ReactNode } from "react";
import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { useCountUp } from "../hooks/useCountUp";

// ─── Variant Dictionaries ────────────────────────────────────────────────────

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as any, delay },
  }),
};

const trendVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as any, delay: delay + 0.25 },
  }),
};

// ─── Component ───────────────────────────────────────────────────────────────

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
  delay = 0,
}) => {
  // Parse a numeric target from the value prop for the count-up hook.
  // If value is non-numeric (e.g. a formatted string), display it statically.
  const numericTarget =
    typeof value === "number"
      ? value
      : typeof value === "string" && !isNaN(parseFloat(value))
      ? parseFloat(value)
      : null;

  const countedValue = useCountUp(numericTarget ?? 0, { delay });

  return (
    <motion.div
      custom={delay}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow group"
    >
      <div className="flex justify-between items-start mb-4">
        <p className="text-slate-500 font-bold text-sm">{label}</p>
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBgColor} ${iconTextColor}`}
        >
          {icon}
        </div>
      </div>

      <div>
        <h3 className="text-4xl font-black text-slate-800 tracking-tight mb-2">
          {numericTarget !== null ? (
            <motion.span>{countedValue}</motion.span>
          ) : (
            value
          )}
        </h3>

        {trend ? (
          <motion.div
            custom={delay}
            variants={trendVariants}
            initial="hidden"
            animate="visible"
            className={`flex items-center text-xs font-bold ${
              trend.isUp ? "text-emerald-500" : "text-red-500"
            }`}
          >
            {trend.isUp ? (
              <FiArrowUpRight className="mr-1" />
            ) : (
              <FiArrowDownRight className="mr-1" />
            )}
            {trend.value}
          </motion.div>
        ) : (
          <div className="text-xs font-bold text-slate-400 flex items-center">
            <span className="w-4 border-b-2 border-slate-300 mr-2 inline-block"></span>
            No Change
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default KPIStatCard;
