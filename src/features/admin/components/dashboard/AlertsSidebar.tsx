import type { Alert } from "../../admin.mock";
import { FiAlertCircle } from "react-icons/fi";

interface AlertsSidebarProps {
  alerts: Alert[];
}

export function AlertsSidebar({ alerts }: AlertsSidebarProps) {
  const displayedAlerts = alerts.slice(0, 10);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 w-full lg:w-80 flex-shrink-0">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Alerts & Insights</h2>
        <p className="text-sm text-gray-500 mt-1">Requires attention</p>
      </div>

      <div className="flex flex-col gap-4">
        {displayedAlerts.map((alert) => {
          const isCritical = alert.severity === "critical";
          const bgColor = isCritical ? "bg-red-50" : "bg-orange-50";
          const borderColor = isCritical ? "border-red-200" : "border-orange-200";
          const iconColor = isCritical ? "text-red-500" : "text-orange-500";

          return (
            <div
              key={alert.id}
              className={`p-4 rounded-xl border ${bgColor} ${borderColor} flex gap-3 items-start`}
            >
              <FiAlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColor}`} />
              <div>
                {/* On the dashboard mockup, alerts are just empty blocks with an icon, but we'll show context if available */}
                <p className="text-sm font-semibold text-gray-900">{alert.context || "System Alert"}</p>
                {alert.message && <p className="text-xs text-gray-600 mt-1">{alert.message}</p>}
              </div>
            </div>
          );
        })}
      </div>

      {alerts.length > 10 && (
        <button className="w-full mt-6 text-sm font-semibold text-indigo-600 hover:text-indigo-700">
          View All Alerts
        </button>
      )}
    </div>
  );
}
