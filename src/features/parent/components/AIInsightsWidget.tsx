import type { FC } from "react";
import { useParentStore } from "../../../store/parentStore";
import { FiZap, FiCheck, FiInfo, FiAlertTriangle } from "react-icons/fi";

const AIInsightsWidget: FC = () => {
  const { dashboardSummary } = useParentStore();

  if (!dashboardSummary) return null;
  const insight = dashboardSummary.latestInsight;

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "Positive": return { icon: <FiCheck />, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" };
      case "NeedsAttention": return { icon: <FiAlertTriangle />, color: "text-[#FF8000]", bg: "bg-orange-50", border: "border-orange-100" };
      default: return { icon: <FiInfo />, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" };
    }
  };

  const styles = insight ? getTypeStyles(insight.type) : null;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="p-8 pb-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#1600D5] flex items-center justify-center text-white shadow-lg shadow-blue-200 animate-pulse">
            <FiZap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">AI Observations</h2>
            <p className="text-[10px] font-black text-[#1600D5] uppercase tracking-[0.2em] mt-0.5">Real-time Insights</p>
          </div>
        </div>

        {insight ? (
          <div className={`p-6 rounded-2xl border-2 ${styles?.bg} ${styles?.border} relative overflow-hidden group`}>
            {/* Background Decorative Element */}
            <div className={`absolute -right-4 -bottom-4 opacity-5 transform group-hover:scale-110 transition-transform duration-500`}>
                <div className="text-9xl">✨</div>
            </div>

            <div className="flex gap-4 relative z-10">
              <div className={`w-10 h-10 rounded-xl ${styles?.bg} ${styles?.color} flex items-center justify-center shrink-0 border border-current/20 shadow-sm`}>
                <span className="text-xl">{styles?.icon}</span>
              </div>
              <div>
                <span className={`text-[10px] font-black uppercase tracking-wider ${styles?.color} bg-white/50 px-2 py-0.5 rounded-full border border-current/10`}>
                  {insight.type.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <p className="mt-3 text-slate-700 font-bold leading-relaxed text-sm">
                  {insight.insightText}
                </p>
                <p className="mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  Generated {insight.dateGenerated}
                </p>
              </div>
            </div>
            
            <button className="w-full mt-6 py-3 bg-[#1600D5] text-white rounded-xl text-xs font-black shadow-md hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-2">
               VIEW FULL ANALYSIS
               <FiZap className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <div className="p-10 text-center bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-slate-400 font-bold italic">No insights available for this period.</p>
          </div>
        )}
      </div>
      
      <div className="mt-auto p-8 pt-4">
        <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-4 border border-slate-100/50">
           <div className="flex -space-x-2">
             <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-300" />
             <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-400" />
           </div>
           <p className="text-[10px] font-bold text-slate-500 leading-tight">
             Shared with 2 teachers<br/>monitoring Mazen
           </p>
        </div>
      </div>
    </div>
  );
};

export default AIInsightsWidget;
