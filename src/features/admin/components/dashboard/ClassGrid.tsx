import type { ClassSummary } from "../../admin.mock";
import { FiUsers, FiChevronRight } from "react-icons/fi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { Link } from "react-router-dom";

interface ClassGridProps {
  classes: ClassSummary[];
}

export function ClassGrid({ classes }: ClassGridProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex-1">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">All Classes</h2>
        <p className="text-sm text-gray-500 mt-1">Click on a class to view details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {classes.map((c) => (
          <Link
            key={c.id}
            to={`/admin/class/${c.id}`}
            className="group block p-5 rounded-xl border border-gray-100 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold text-gray-900">{c.name}</h3>
                {c.activeAlerts ? (
                  <span className="px-2.5 py-0.5 bg-orange-100 text-orange-600 text-xs font-semibold rounded-full">
                    {c.activeAlerts} Alert{c.activeAlerts > 1 ? "s" : ""}
                  </span>
                ) : null}
              </div>
              <FiChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <FiUsers className="w-4 h-4" />
                <span>{c.studentCount} Students</span>
              </div>
              <div className="flex items-center gap-2">
                <FaChalkboardTeacher className="w-4 h-4" />
                <span>{c.teacherCount} Teachers</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
