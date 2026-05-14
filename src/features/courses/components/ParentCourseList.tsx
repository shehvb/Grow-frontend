import React from 'react';
import { useCourses } from '../hooks/useCourses';
import { FiBook } from 'react-icons/fi';

export const ParentCourseList: React.FC = () => {
  const { courses, loading, error } = useCourses();

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading your child's courses...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6 max-w-[1320px]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Student Courses</h1>
        <p className="text-gray-600">View the courses your child is currently enrolled in.</p>
      </div>

      {courses.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <h3 className="text-xl text-gray-600 mb-2">No active courses</h3>
          <p className="text-gray-400">Your child is not enrolled in any courses at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-50 text-blue-600 p-3 rounded-lg">
                    <FiBook className="text-xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{course.title}</h3>
                </div>
                <p className="text-gray-600 text-sm line-clamp-3">{course.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
