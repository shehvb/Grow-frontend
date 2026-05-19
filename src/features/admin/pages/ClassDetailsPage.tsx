import { useState, useEffect } from "react";
import { TopPerformers } from "../components/class-details/TopPerformers";
import { StudentStatusSidebar } from "../components/class-details/StudentStatusSidebar";
import { AssignedTeachersGrid } from "../components/class-details/AssignedTeachersGrid";
import { FiChevronLeft, FiUsers } from "react-icons/fi";
import { FaChalkboardTeacher, FaTrophy } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { fetchClassDetail } from "../../../services/adminApi";
import type { ClassDetailData } from "../../../services/adminApi";
import { mockClass9AStudents, mockClass9AAlerts, mockClass9ATeachers } from "../admin.mock";

export function ClassDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<ClassDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const detail = await fetchClassDetail(id || "1");
        if (!cancelled) setData(detail);
      } catch (e) {
        console.warn("Class detail load failed", e);
        // Set fallback
        if (!cancelled) {
          setData({
            className: "Class 9A",
            totalStudents: 38,
            totalTeachers: 4,
            activeStudents: 7,
            topStudents: mockClass9AStudents,
            alerts: mockClass9AAlerts,
            teachers: mockClass9ATeachers,
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [id]);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="mb-8">
        <Link to="/admin" className="text-indigo-600 hover:text-indigo-700 flex items-center text-sm font-medium mb-4">
          <FiChevronLeft className="mr-1" /> Back to dashboard
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">{data.className}</h1>
        <p className="text-gray-500 mt-1">Detailed overview and performance metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Students */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Total Students</h3>
            <p className="text-4xl font-bold text-gray-900">{data.totalStudents}</p>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
            <FiUsers className="w-6 h-6" />
          </div>
        </div>

        {/* Total Teachers */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Total Teachers</h3>
            <p className="text-4xl font-bold text-gray-900">{data.totalTeachers}</p>
          </div>
          <div className="p-3 bg-orange-50 text-orange-500 rounded-lg">
            <FaChalkboardTeacher className="w-6 h-6" />
          </div>
        </div>

        {/* Active Students */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Active Students</h3>
            <p className="text-4xl font-bold text-gray-900">{data.activeStudents}</p>
          </div>
          <div className="p-3 bg-green-50 text-green-500 rounded-lg">
            <FaTrophy className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <TopPerformers students={data.topStudents} />
        </div>
        <StudentStatusSidebar alerts={data.alerts} />
      </div>

      <AssignedTeachersGrid teachers={data.teachers} />
    </div>
  );
}

