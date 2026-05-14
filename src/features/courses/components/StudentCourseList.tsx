import React from 'react';
import { Link } from 'react-router-dom';
import { useCourses } from '../hooks/useCourses';
import { FiBookOpen } from 'react-icons/fi';

export const StudentCourseList: React.FC = () => {
  const { courses, loading, error } = useCourses();

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading available courses...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6 max-w-[1320px]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Available Courses</h1>
        <p className="text-gray-600">Discover and enroll in new subjects to expand your knowledge.</p>
      </div>

      {courses.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <h3 className="text-xl text-gray-600 mb-2">No courses available</h3>
          <p className="text-gray-400">Check back later for new course offerings.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition flex flex-col h-full">
              <div className="p-6 flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-50 text-blue-600 p-3 rounded-lg">
                    <FiBookOpen className="text-xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{course.title}</h3>
                </div>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">{course.description}</p>
              </div>
              <div className="p-4 border-t border-gray-50 bg-gray-50 mt-auto">
                <Link 
                  to={`/student/courses/${course.id}`} 
                  className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  View Course Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
