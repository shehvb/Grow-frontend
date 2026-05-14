import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTaskSummary, fetchCourseProgress } from '../api/analytics';
import type { TaskSummary, ProgressData } from '../api/analytics';
import { useCourseDetails } from '../hooks/useCourses';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiPieChart, FiBarChart2 } from 'react-icons/fi';

export const CourseAnalytics: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const courseId = id ? parseInt(id, 10) : 0;
  const navigate = useNavigate();

  const { course, loading: courseLoading } = useCourseDetails(courseId);
  
  const [taskSummary, setTaskSummary] = useState<TaskSummary | null>(null);
  const [progressData, setProgressData] = useState<ProgressData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      const loadAnalytics = async () => {
        try {
          const [tasks, progress] = await Promise.all([
            fetchTaskSummary(courseId),
            fetchCourseProgress(courseId)
          ]);
          setTaskSummary(tasks);
          setProgressData(progress);
        } catch (err) {
          toast.error('Failed to load analytics data');
        } finally {
          setLoading(false);
        }
      };
      loadAnalytics();
    }
  }, [courseId]);

  if (courseLoading || loading) {
    return <div className="p-8 text-center text-gray-500">Loading analytics...</div>;
  }

  if (!course) {
    return <div className="p-8 text-center text-red-500">Course not found</div>;
  }

  return (
    <div className="container mx-auto p-6 max-w-[1320px]">
      <button 
        onClick={() => navigate(`/teacher/courses/${courseId}`)}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-6 transition"
      >
        <FiArrowLeft /> Back to Course
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Analytics: {course.title}</h1>
        <p className="text-gray-600">Track student progress and assignment completion rates.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
          <div className="bg-blue-50 text-blue-600 p-4 rounded-full">
            <FiPieChart className="text-2xl" />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Total Assignments</h3>
            <p className="text-2xl font-bold text-gray-800">{taskSummary?.total || 0}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
          <div className="bg-green-50 text-green-600 p-4 rounded-full">
            <FiBarChart2 className="text-2xl" />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Completed</h3>
            <p className="text-2xl font-bold text-gray-800">{taskSummary?.completed || 0}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
          <div className="bg-yellow-50 text-yellow-600 p-4 rounded-full">
            <FiBarChart2 className="text-2xl" />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Pending</h3>
            <p className="text-2xl font-bold text-gray-800">{taskSummary?.pending || 0}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Student Progress</h2>
        </div>
        {progressData.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No progress data available yet.
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-sm font-medium text-gray-500">
                <th className="px-6 py-4">Student ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {progressData.map((student) => (
                <tr key={student.student_id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-600">{student.student_id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{student.student_name || `Student ${student.student_id}`}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 max-w-[200px]">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${student.progress_percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">{student.progress_percentage}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
