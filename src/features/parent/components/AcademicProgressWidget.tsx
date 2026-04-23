import type { FC } from "react";
import { useParentStore } from "../../../store/parentStore";
import { FiTrendingUp, FiBookOpen } from "react-icons/fi";

const AcademicProgressWidget: FC = () => {
  const { dashboardSummary } = useParentStore();

  if (!dashboardSummary) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow duration-300">
      <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1600D5]/10 flex items-center justify-center text-[#1600D5]">
            <FiBookOpen className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Academic Progress</h2>
        </div>
        <div className="flex items-center gap-2 text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold">
          <FiTrendingUp className="w-3.5 h-3.5" />
          <span>+4% this month</span>
        </div>
      </div>

      <div className="p-6 flex-1 overflow-y-auto">
        <div className="space-y-5">
          {dashboardSummary.grades.map((grade) => (
            <div key={grade.id} className="group p-4 rounded-xl border border-slate-50 hover:border-[#1600D5]/20 hover:bg-blue-50/30 transition-all duration-200">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-slate-800 group-hover:text-[#1600D5] transition-colors">{grade.courseName}</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Last updated: {grade.lastUpdated}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-[#1600D5]">{grade.currentGrade}%</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase">Grade: <span className="text-[#FF8000]">{grade.letterGrade}</span></div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#1600D5] rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${grade.currentGrade}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AcademicProgressWidget;
