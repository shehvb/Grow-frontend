import type { FC } from "react";
import { FiTrendingUp, FiTrendingDown, FiType, FiArchive, FiMonitor, FiCpu, FiBookOpen, FiEdit3, FiAlertTriangle } from "react-icons/fi";
import { motion } from "framer-motion";
import { AnimatedNumber } from "../../../../components/ui/AnimatedNumber";
import type { DetailedSubjectPerformance } from "../../../../types/parent";

interface DetailedSubjectsGridProps {
  subjects: DetailedSubjectPerformance[];
}

const DetailedSubjectsGrid: FC<DetailedSubjectsGridProps> = ({ subjects }) => {
  
  const getSubjectConfig = (name: string) => {
    const lName = name.toLowerCase();
    if (lName.includes('math')) return { icon: FiCpu, color: '#FF8000', bgColor: '#FFF4E1', progressColor: 'bg-[#FF8000]' };
    if (lName.includes('science')) return { icon: FiMonitor, color: '#0062FF', bgColor: '#E1EFFF', progressColor: 'bg-[#0062FF]' };
    if (lName.includes('english')) return { icon: FiBookOpen, color: '#8000FF', bgColor: '#F1E1FF', progressColor: 'bg-[#8000FF]' };
    if (lName.includes('history')) return { icon: FiArchive, color: '#B8860B', bgColor: '#FAF1D1', progressColor: 'bg-[#B8860B]' };
    if (lName.includes('arabic')) return { icon: FiType, color: '#32CD32', bgColor: '#E1FFE1', progressColor: 'bg-[#32CD32]' };
    if (lName.includes('art')) return { icon: FiEdit3, color: '#FF0000', bgColor: '#FFE1E1', progressColor: 'bg-[#FF0000]' };
    return { icon: FiBookOpen, color: '#1600D5', bgColor: '#E2E1FF', progressColor: 'bg-[#1600D5]' };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {subjects.map((subject) => {
        const config = getSubjectConfig(subject.name);
        const Icon = config.icon;
        const isNegativeTrend = subject.trend < 0;

        return (
          <motion.div 
            variants={itemVariants}
            key={subject.id} 
            className="bg-white rounded-[28px] p-7 border border-slate-100 shadow-[0_4px_20px_0_rgba(0,0,0,0.02)] transition-colors hover:shadow-[0_4px_25px_0_rgba(0,0,0,0.05)] flex flex-col relative group"
          >
            {/* Subject Header */}
            <div className="flex justify-between items-start mb-6">
               <div className="flex items-center gap-3">
                 <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: config.bgColor }}>
                    <Icon className="w-6 h-6" style={{ color: config.color }} />
                 </div>
                 <h3 className="text-[#1A1C1E] font-black text-[18px] tracking-tight">{subject.name}</h3>
               </div>
               {isNegativeTrend && (
                 <FiAlertTriangle className="text-[#FF8000] w-5 h-5 mt-3" />
               )}
            </div>
            
            {/* Score & Trend */}
            <div className="flex items-end justify-between mb-3">
              <div className="flex items-baseline gap-2">
                <span className="text-[38px] font-black text-[#1A1C1E] tracking-tighter leading-none tabular-nums">
                  <AnimatedNumber value={subject.score} />%
                </span>
                <div className={`flex items-center gap-0.5 text-[12px] font-extrabold ${isNegativeTrend ? 'text-[#FF4040]' : 'text-[#30B175]'}`}>
                   {isNegativeTrend ? <FiTrendingDown className="w-3.5 h-3.5" /> : <FiTrendingUp className="w-3.5 h-3.5" />}
                   {Math.abs(subject.trend)}%
                </div>
              </div>
              <div className="text-[12px] font-bold text-[#9E9E9E] mb-1">
                 Grade {subject.grade}
              </div>
            </div>

            {/* Thick Progress Bar */}
            <div className="w-full bg-[#F3F3F3] h-3 rounded-full overflow-hidden mb-8">
               <motion.div 
                 initial={{ width: 0 }}
                 whileInView={{ width: `${subject.score}%` }}
                 transition={{ duration: 1.2, ease: "easeOut" }}
                 viewport={{ once: true }}
                 className={`h-full ${config.progressColor} rounded-full`} 
               />
            </div>

            {/* Stats Footer */}
            <div className="flex items-center justify-between pt-1 mt-auto">
               <div className="text-[11px] font-bold">
                  <span className="text-[#9E9E9E]">Assignments: </span>
                  <span className="text-[#1A1C1E]">{subject.assignmentsCompleted}/{subject.assignmentsTotal}</span>
               </div>
               <div className="text-[11px] font-bold">
                  <span className="text-[#9E9E9E]">{subject.labsAvg !== undefined ? 'Labs' : 'Tests'}: </span>
                  <span style={{ color: config.color }}>
                    {subject.labsAvg !== undefined ? `${subject.labsAvg}%` : `${subject.testsAvg}%`} avg
                  </span>
               </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default DetailedSubjectsGrid;
