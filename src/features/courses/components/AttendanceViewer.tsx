import React, { useState, useEffect } from 'react';
import { fetchCourseAttendance } from '../api/attendance';
import type { AttendanceRecord } from '../types';
import toast from 'react-hot-toast';

interface AttendanceViewerProps {
  courseId: number;
}

export const AttendanceViewer: React.FC<AttendanceViewerProps> = ({ courseId }) => {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId) return;
    
    const loadAttendance = async () => {
      try {
        const data = await fetchCourseAttendance(courseId);
        setRecords(data);
      } catch (err) {
        toast.error('Failed to load attendance records');
      } finally {
        setLoading(false);
      }
    };
    
    loadAttendance();
  }, [courseId]);

  if (loading) {
    return <div className="p-4 text-center text-gray-500">Loading attendance...</div>;
  }

  if (records.length === 0) {
    return (
      <div className="bg-gray-50 rounded-xl border border-gray-100 p-8 text-center">
        <p className="text-gray-500">No attendance records found for this course.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500">
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4">Student ID</th>
            <th className="px-6 py-4">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {records.map((record) => (
            <tr key={record.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                {record.date}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {record.student_id}
              </td>
              <td className="px-6 py-4 text-sm">
                <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                  record.status === 'present' ? 'bg-green-100 text-green-700' : 
                  record.status === 'absent' ? 'bg-red-100 text-red-700' : 
                  record.status === 'late' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {record.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
