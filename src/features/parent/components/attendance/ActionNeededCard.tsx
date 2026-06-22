import type { FC } from "react";
import { FiAlertCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import type { ActionNeededContext } from "../../../../types/parent";

interface ActionNeededCardProps {
  data: ActionNeededContext;
}

const ActionNeededCard: FC<ActionNeededCardProps> = ({ data }) => {
  return (
    <motion.div 
      initial={{ x: 25, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-orange-50 rounded-2xl p-6 border border-orange-100 relative overflow-hidden"
    >
      <div className="absolute right-0 top-0 w-32 h-32 bg-orange-200/20 rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="flex items-center gap-2 mb-3">
        <FiAlertCircle className="text-orange-500 w-5 h-5" />
        <h3 className="font-bold text-slate-800">{data.title}</h3>
      </div>
      <p className="text-sm text-slate-600 font-medium mb-5 leading-relaxed pr-4 relative z-10">
        {data.message}
      </p>
      <motion.button 
        animate={{ opacity: [0.85, 1, 0.85], boxShadow: ["0px 0px 0px rgba(255,128,0,0)", "0px 0px 8px rgba(255,128,0,0.3)", "0px 0px 0px rgba(255,128,0,0)"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-full bg-[#FF8000] hover:bg-orange-600 text-white font-bold py-3 rounded-xl relative z-10"
      >
        {data.actionText}
      </motion.button>
    </motion.div>
  );
};

export default ActionNeededCard;
