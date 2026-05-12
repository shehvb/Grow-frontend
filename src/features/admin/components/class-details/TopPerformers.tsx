import type { Student } from "../../admin.mock";
import { FaTrophy } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";

interface TopPerformersProps {
  students: Student[];
}

export function TopPerformers({ students }: TopPerformersProps) {
  // Sort just to be safe
  const top4 = [...students].sort((a, b) => b.score - a.score).slice(0, 4);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex-1">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Top Performers</h2>
        <p className="text-sm text-gray-500 mt-1">Top 4 students in the class</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {top4.map((student, index) => {
          const isFirst = index === 0;
          const rankSuffix = isFirst ? "st" : index === 1 ? "nd" : index === 2 ? "rd" : "th";
          
          return (
            <div
              key={student.id}
              className={`p-4 rounded-xl border flex items-center justify-between ${
                isFirst ? "bg-amber-50/30 border-amber-200" : "bg-gray-50 border-gray-100"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                    isFirst
                      ? "bg-amber-400 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {index + 1}<span className="text-xs font-normal ml-0.5">{rankSuffix}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{student.name}</h3>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <AiFillStar className="text-amber-500 mr-1" />
                    <span className="font-bold text-gray-900 mr-1">{student.score}</span> / {student.maxScore}
                  </div>
                </div>
              </div>
              
              {isFirst && (
                <div className="text-amber-500">
                  <FaTrophy className="w-6 h-6" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
