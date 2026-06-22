import type { FC } from "react";
import { motion } from "framer-motion";
import { AnimatedNumber } from "../../components/ui/AnimatedNumber";

interface DailyMasteryProgressBarProps {
  progress: number;
  level: number;
}

const barVariants = {
  hidden: { width: 0 },
  visible: (progress: number) => ({
    width: `${progress}%`,
    transition: {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1] as const, // easeOutExpo
    },
  }),
};

const DailyMasteryProgressBar: FC<DailyMasteryProgressBarProps> = ({ progress, level }) => {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-800">Daily Mastery</h2>
        <span className="text-[#1600D5] font-bold text-[10px] sm:text-sm tracking-widest uppercase">LEVEL {level}</span>
      </div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-slate-500 text-xs sm:text-sm font-medium">Daily Goal Progress</p>
        <span className="text-[#FF8000] font-bold text-base sm:text-lg">
          <AnimatedNumber value={progress} />%
        </span>
      </div>
      <div className="w-full h-4 bg-[#E2E2E2] rounded-full overflow-hidden mb-4">
        <motion.div
          className="h-full bg-gradient-to-r from-[#1600D5] via-[#7b4dff] to-[#FF8000] rounded-full"
          variants={barVariants}
          initial="hidden"
          animate="visible"
          custom={progress}
        />
      </div>
      <p className="text-slate-500 text-xs flex items-center gap-1 font-medium">
        Finish your last 2 tasks to turn the bar fully Orange! <span>🏆</span>
      </p>
    </div>
  );
};

export default DailyMasteryProgressBar;

