import type { FC } from "react";
import { FiBook, FiBookmark } from "react-icons/fi";

interface Subject {
  name: string;
  average: number;
  color: string;
}

interface DashboardSubjectsListProps {
  subjects: Subject[];
}

const DashboardSubjectsList: FC<DashboardSubjectsListProps> = ({ subjects = [] }) => {
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
        <span className="text-[#0062FF] text-xs font-bold cursor-pointer hover:underline">See All</span>
      </div>

      <div className="space-y-4">
        {subjects.map((subject, index) => {
          let grade = "C";
          if (subject.average >= 95) grade = "A+";
          else if (subject.average >= 90) grade = "A";
          else if (subject.average >= 80) grade = "B";

          return (
            <div key={index} className="bg-[#F8FAFC] rounded-[20px] p-5 border border-[#F1F5F9] relative">
              {/* Header Row: Icon + Grade */}
              <div className="flex justify-between items-start mb-3">
                <div
                  className="w-8 h-8 rounded-[10px] flex items-center justify-center text-white"
                  style={{ backgroundColor: subject.color }}
                >
                  <FiBookmark className="w-4 h-4 fill-current" />
                </div>
                
                <div
                  className="px-2 py-1 flex items-center justify-center rounded-lg text-xs font-bold"
                  style={{ 
                    backgroundColor: `${subject.color}20`, 
                    color: subject.color !== '#F59E0B' ? subject.color : '#D97706' // dark text logic optionally
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
                    width: `${subject.average}%`,
                    backgroundColor: subject.color
                  }}
                />
              </div>
              
              {/* Footer Text */}
              <p className="text-xs font-bold text-slate-400">
                {subject.average}% Average
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardSubjectsList;