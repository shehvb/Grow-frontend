import type { FC } from "react";
import { FiAward, FiAlertTriangle } from "react-icons/fi";
import { motion } from "framer-motion";

// ─── Variant Dictionaries ────────────────────────────────────────────────────

const cardVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: "easeOut" as any },
  },
};

const topListVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const reviewListVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.32, ease: "easeOut" as any },
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

interface StudentPerformersProps {
  topPerformance: {
    id: number;
    name: string;
    score: string;
  }[];
  needReview: {
    id: number;
    name: string;
    score: string;
  }[];
}

const StudentPerformers: FC<StudentPerformersProps> = ({
  topPerformance,
  needReview,
}) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex gap-6"
    >
      {/* Top Performers */}
      <div className="flex-1">
        <h3 className="text-xs font-black text-slate-500 mb-6 flex items-center gap-2 uppercase tracking-wide">
          <span className="w-5 h-5 rounded bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <FiAward size={12} />
          </span>
          Top Performers
        </h3>
        <motion.div
          variants={topListVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {topPerformance.map((student) => (
            <motion.div
              key={student.id}
              variants={rowVariants}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                {/* Mock Avatar Placeholder */}
                <div className="w-4 h-4 bg-slate-400 rounded-sm"></div>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">
                  {student.name}
                </p>
                <p className="text-xs text-slate-400 font-medium">
                  {student.score}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Needs Review — independent stagger group */}
      <div className="flex-1">
        <h3 className="text-xs font-black text-slate-500 mb-6 flex items-center gap-2 uppercase tracking-wide">
          <FiAlertTriangle className="text-orange-500" />
          Needs Review
        </h3>
        <motion.div
          variants={reviewListVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {needReview.map((student) => (
            <motion.div
              key={student.id}
              variants={rowVariants}
              className="flex items-center gap-3 relative"
            >
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                {/* Mock Avatar Placeholder */}
                <div className="w-4 h-4 bg-slate-400 rounded-sm"></div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-800">
                  {student.name}
                </p>
                <p className="text-xs text-slate-400 font-medium">
                  {student.score}
                </p>
              </div>
              <div className="w-2 h-2 rounded-full bg-orange-500 absolute right-0"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StudentPerformers;
