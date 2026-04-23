import type { FC } from "react";
import { FiAlertCircle } from "react-icons/fi";
import type { ActionNeededContext } from "../../../../types/parent";

interface ActionNeededCardProps {
  data: ActionNeededContext;
}

const ActionNeededCard: FC<ActionNeededCardProps> = ({ data }) => {
  return (
    <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-32 h-32 bg-orange-200/20 rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="flex items-center gap-2 mb-3">
        <FiAlertCircle className="text-orange-500 w-5 h-5" />
        <h3 className="font-bold text-slate-800">{data.title}</h3>
      </div>
      <p className="text-sm text-slate-600 font-medium mb-5 leading-relaxed pr-4 relative z-10">
        {data.message}
      </p>
      <button className="w-full bg-[#FF8000] hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors relative z-10">
        {data.actionText}
      </button>
    </div>
  );
};

export default ActionNeededCard;
