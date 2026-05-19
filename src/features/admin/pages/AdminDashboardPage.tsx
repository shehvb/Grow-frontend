import { useState, useEffect } from "react";
import { KPIStats } from "../components/dashboard/KPIStats";
import { ClassGrid } from "../components/dashboard/ClassGrid";
import { AlertsSidebar } from "../components/dashboard/AlertsSidebar";
import { mockSchoolKPIs, mockClassSummaries, mockGlobalAlerts } from "../admin.mock";
import type { SchoolKPIs, Alert, ClassSummary } from "../admin.mock";
import { fetchDashboardOverview, fetchClassList } from "../../../services/adminApi";

export function AdminDashboardPage() {
  const [kpis, setKpis] = useState<SchoolKPIs>(mockSchoolKPIs);
  const [alerts, setAlerts] = useState<Alert[]>(mockGlobalAlerts);
  const [classes, setClasses] = useState<ClassSummary[]>(mockClassSummaries);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const [overview, classList] = await Promise.all([
          fetchDashboardOverview(),
          fetchClassList(),
        ]);
        if (!cancelled) {
          setKpis(overview.kpis);
          setAlerts(overview.alerts);
          setClasses(classList);
        }
      } catch (e) {
        console.warn("Admin dashboard load failed, using mocks", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Monitor your school's performance and activities</p>
      </div>

      <KPIStats kpis={kpis} />

      <div className="flex  flex-row gap-6">
        <ClassGrid classes={classes} />
        <AlertsSidebar alerts={alerts} />
      </div>
    </div>
  );
}
