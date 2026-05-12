import type { Alert } from "../../admin.mock";
import { FiPhoneCall, FiUserX, FiAlertCircle } from "react-icons/fi";

interface StudentStatusSidebarProps {
  alerts: Alert[];
}

export function StudentStatusSidebar({ alerts }: StudentStatusSidebarProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 w-full lg:w-80 flex-shrink-0">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Student Status</h2>
        <p className="text-sm text-gray-500 mt-1">Disciplinary alerts</p>
      </div>

      <div className="flex flex-col gap-4">
        {alerts.map((alert) => {
          const isCritical = alert.severity === "critical";
          const bgColor = isCritical ? "bg-red-50" : "bg-orange-50";
          const borderColor = isCritical ? "border-red-200" : "border-orange-200";
          const iconColor = isCritical ? "text-red-500" : "text-orange-500";

          // Select icon based on context to match design
          let Icon = FiAlertCircle;
          if (alert.context === "Parent Call") Icon = FiPhoneCall;
          if (alert.context === "Expelled") Icon = FiUserX;

          return (
            <div
              key={alert.id}
              className={`p-4 rounded-xl border ${bgColor} ${borderColor} flex gap-3 items-start`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColor}`} />
              <div>
                <p className="text-sm font-semibold text-gray-900">{alert.message}</p>
                <p className="text-xs text-gray-600 mt-1">{alert.context}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
