import type { Teacher } from "../../admin.mock";
import { AiFillStar } from "react-icons/ai";
import { MdTrendingUp, MdTrendingDown, MdTrendingFlat } from "react-icons/md";

interface AssignedTeachersGridProps {
  teachers: Teacher[];
}

export function AssignedTeachersGrid({ teachers }: AssignedTeachersGridProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Assigned Teachers</h2>
        <p className="text-sm text-gray-500 mt-1">Faculty members teaching the class</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            className="p-5 rounded-xl border border-indigo-200 bg-white shadow-sm flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{teacher.name}</h3>
              <p className="text-sm text-indigo-600 font-medium mt-1">{teacher.subject}</p>
              
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center text-xs text-gray-500">
                  <AiFillStar className="text-amber-500 mr-1" />
                  <span className="font-bold text-gray-900 mr-1">{teacher.rating}</span> / {teacher.maxRating}
                </div>
                
                {teacher.trend === "improving" && (
                  <div className="flex items-center text-xs text-green-500 font-medium">
                    <MdTrendingUp className="mr-1" /> Improving
                  </div>
                )}
                {teacher.trend === "declining" && (
                  <div className="flex items-center text-xs text-red-500 font-medium">
                    <MdTrendingDown className="mr-1" /> Declining
                  </div>
                )}
                {teacher.trend === "stable" && (
                  <div className="flex items-center text-xs text-gray-400 font-medium">
                    <MdTrendingFlat className="mr-1" /> Stable
                  </div>
                )}
              </div>
            </div>
            
            <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
              {teacher.avatarInitials}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
