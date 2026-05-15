import type { FC } from "react";
import { FiAward, FiAlertTriangle } from "react-icons/fi";

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

const StudentPerformers: FC<StudentPerformersProps> = ({ topPerformance, needReview }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex gap-6">
      <div className="flex-1">
        <h3 className="text-xs font-black text-slate-500 mb-6 flex items-center gap-2 uppercase tracking-wide">
          <span className="w-5 h-5 rounded bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <FiAward size={12} />
          </span>
          Top Performers
        </h3>
        <div className="space-y-4">
          {topPerformance.map(student => (
            <div key={student.id} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                {/* Mock Avatar Placeholder */}
                <div className="w-4 h-4 bg-slate-400 rounded-sm"></div>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">{student.name}</p>
                <p className="text-xs text-slate-400 font-medium">{student.score}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex-1">
        <h3 className="text-xs font-black text-slate-500 mb-6 flex items-center gap-2 uppercase tracking-wide">
          <FiAlertTriangle className="text-orange-500" />
          Needs Review
        </h3>
        <div className="space-y-4">
          {needReview.map(student => (
            <div key={student.id} className="flex items-center gap-3 relative">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                {/* Mock Avatar Placeholder */}
                <div className="w-4 h-4 bg-slate-400 rounded-sm"></div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-800">{student.name}</p>
                <p className="text-xs text-slate-400 font-medium">{student.score}</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-orange-500 absolute right-0"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentPerformers;
