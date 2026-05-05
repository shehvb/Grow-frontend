import type { FC } from "react";
import { FiBookmark } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface Subject {
  name: string;
  grade: number;
  letterGrade?: string;
}

interface DashboardSubjectsListProps {
  subjects: Subject[];
}

const COLORS = ["#0062FF", "#F59E0B", "#D946EF", "#10B981", "#6366F1"];

const DashboardSubjectsList: FC<DashboardSubjectsListProps> = ({ subjects = [] }) => {
  const navigate = useNavigate();
  if (!subjects || subjects.length === 0) {
    return (
      <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100">
        <p className="text-slate-400">No subjects data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-extrabold text-[#0F172A] text-[17px]">Subject Performance</h3>
        <button 
          onClick={() => navigate("/parent/analytics")}
          className="text-[#0062FF] text-xs font-bold hover:underline"
        >
          See All
        </button>
      </div>

      <div className="space-y-4">
        {subjects.map((subject, index) => {
          const color = COLORS[index % COLORS.length];
          const grade = subject.letterGrade || "B";

          return (
            <div key={index} className="bg-[#F8FAFC] rounded-[20px] p-5 border border-[#F1F5F9] relative">
              {/* Header Row: Icon + Grade */}
              <div className="flex justify-between items-start mb-3">
                <div
                  className="w-8 h-8 rounded-[10px] flex items-center justify-center text-white"
                  style={{ backgroundColor: color }}
                >
                  <FiBookmark className="w-4 h-4 fill-current" />
                </div>
                
                <div
                  className="px-2 py-1 flex items-center justify-center rounded-lg text-xs font-bold"
                  style={{ 
                    backgroundColor: `${color}20`, 
                    color: color !== '#F59E0B' ? color : '#D97706'
                  }}
                >
                  {grade}
                </div>
              </div>

              {/* Title & Progress Row */}
              <h4 className="font-extrabold text-slate-900 text-base mb-2">
                {subject.name}
              </h4>
              
              <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden mb-1.5">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${subject.grade}%`,
                    backgroundColor: color
                  }}
                />
              </div>
              
              {/* Footer Text */}
              <p className="text-xs font-bold text-slate-400">
                {subject.grade}% Average
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardSubjectsList;