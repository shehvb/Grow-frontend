import { KPIStats } from "../components/dashboard/KPIStats";
import { ClassGrid } from "../components/dashboard/ClassGrid";
import { AlertsSidebar } from "../components/dashboard/AlertsSidebar";
import { mockSchoolKPIs, mockClassSummaries, mockGlobalAlerts } from "../admin.mock";

export function AdminDashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Monitor your school's performance and activities</p>
      </div>

      <KPIStats kpis={mockSchoolKPIs} />

      <div className="flex flex-col lg:flex-row gap-6">
        <ClassGrid classes={mockClassSummaries} />
        <AlertsSidebar alerts={mockGlobalAlerts} />
      </div>
    </div>
  );
}
