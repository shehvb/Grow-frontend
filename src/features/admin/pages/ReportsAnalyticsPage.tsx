import { ReportConfigurationForm } from "../components/reports/ReportConfigurationForm";

export function ReportsAnalyticsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-500 mt-1">Generate comprehensive reports and insights</p>
      </div>

      <div className="max-w-4xl">
        <ReportConfigurationForm />
      </div>
    </div>
  );
}
