import type { FC } from "react";
import { useState, useEffect } from "react";
import StudentSelector from "./components/StudentSelector";
import DashboardMetricsRow from "./components/DashboardMetricsRow";
import GpaTrendChart from "./components/GpaTrendChart";
import RecentActivityList from "./components/RecentActivityList";
import DashboardSubjectsList from "./components/DashboardSubjectsList";

interface Student {
  id: number;
  full_name: string;
  student_id: string;
  grade: string;
}

const ParentDashboardPage: FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [parentName, setParentName] = useState("Parent");   // ← هنا التعريف

  // جلب الطلاب
  useEffect(() => {
    const fetchMyStudents = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) return;

        const res = await fetch("http://127.0.0.1:8000/students/my-students/", {
          headers: { "Authorization": `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setStudents(data);
          if (data.length > 0) {
            setCurrentStudent(data[0]);
          }
        }
      } catch (err) {
        console.error("Failed to fetch students", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyStudents();
  }, []);

  // جلب داتا الـ Dashboard
  useEffect(() => {
    if (!currentStudent) return;

    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await fetch(`http://127.0.0.1:8000/students/dashboard/${currentStudent.id}/`, {
          headers: { "Authorization": `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setDashboardData(data);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      }
    };

    fetchDashboardData();
  }, [currentStudent]);

  // اسم الـ Parent ديناميكي
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setParentName(user.username || user.email?.split("@")[0] || "Parent");
      } catch (e) { }
    }
  }, []);

  const handleSwitchStudent = (student: Student) => {
    setCurrentStudent(student);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (students.length === 0) {
    return <div className="p-12 text-center">No students linked yet.</div>;
  }

  const displayedStudent = currentStudent || students[0];
  const metrics = dashboardData?.metrics || null;
  const gpaTrend = dashboardData?.gpaTrend || [];
  const recentActivities = dashboardData?.recentActivities || [];
  const topSubjects = dashboardData?.topSubjects || [];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10 mt-6 relative">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Welcome back, {parentName}
          </h1>
          <p className="text-slate-500 font-medium mt-2">
            Here is {displayedStudent.full_name}'s learning summary for this week.
          </p>
        </div>

        <StudentSelector
          students={students}
          currentStudent={displayedStudent}
          onSwitch={handleSwitchStudent}
        />
      </div>

      <DashboardMetricsRow metrics={metrics} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="h-80">
            <GpaTrendChart data={gpaTrend} metrics={metrics} />
          </div>
          <RecentActivityList activities={recentActivities} />
        </div>

        <div className="lg:col-span-1">
          <DashboardSubjectsList subjects={topSubjects} />
        </div>
      </div>
    </div>
  );
};

export default ParentDashboardPage;