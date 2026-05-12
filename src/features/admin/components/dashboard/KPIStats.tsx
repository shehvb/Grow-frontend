import type { SchoolKPIs } from "../../admin.mock";
import { FiUsers } from "react-icons/fi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { TbSchool } from "react-icons/tb";
import { MdTrendingUp } from "react-icons/md";

interface KPIStatsProps {
  kpis: SchoolKPIs;
}

export function KPIStats({ kpis }: KPIStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Students */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Total Students</h3>
            <p className="text-4xl font-bold text-gray-900">{kpis.totalStudents}</p>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
            <FiUsers className="w-6 h-6" />
          </div>
        </div>
        <div className="flex items-center text-green-500 mt-4 text-sm font-medium">
          <MdTrendingUp className="w-4 h-4 mr-1" />
          <span>+{kpis.studentGrowthPercent}% this year</span>
        </div>
      </div>

      {/* Total Teachers */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Total Teachers</h3>
            <p className="text-4xl font-bold text-gray-900">{kpis.totalTeachers}</p>
          </div>
          <div className="p-3 bg-orange-50 text-orange-500 rounded-lg">
            <FaChalkboardTeacher className="w-6 h-6" />
          </div>
        </div>
        <div className="flex items-center text-green-500 mt-4 text-sm font-medium">
          <MdTrendingUp className="w-4 h-4 mr-1" />
          <span>+{kpis.newHires} new hires</span>
        </div>
      </div>

      {/* Total Classes */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Total Classes</h3>
            <p className="text-4xl font-bold text-gray-900">{kpis.totalClasses}</p>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
            <TbSchool className="w-6 h-6" />
          </div>
        </div>
        <div className="flex items-center text-gray-400 mt-4 text-sm font-medium">
          <span>Across {kpis.gradesSpanned} grades</span>
        </div>
      </div>
    </div>
  );
}
