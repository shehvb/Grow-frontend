import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCourses } from '../hooks/useCourses';
import { FiBookOpen } from 'react-icons/fi';

type FilterType = 'All Courses' | 'In Progress' | 'Completed';

const CARD_STYLES = [
  { shape: 'bg-[#DDE0FF]', iconBg: 'bg-[#DDE0FF]', iconText: 'text-[#1600D5]' },
  { shape: 'bg-[#FFE6D0]', iconBg: 'bg-[#FFE6D0]', iconText: 'text-[#FF912C]' },
  { shape: 'bg-[#FFD1ED]', iconBg: 'bg-[#FFD1ED]', iconText: 'text-[#E7008A]' },
  { shape: 'bg-[#F5D0FF]', iconBg: 'bg-[#F5D0FF]', iconText: 'text-[#BD00E7]' },
  { shape: 'bg-[#D0FFF5]', iconBg: 'bg-[#D0FFF5]', iconText: 'text-[#00E7BD]' },
  { shape: 'bg-[#D0EFD7]', iconBg: 'bg-[#D0EFD7]', iconText: 'text-[#279B37]' },
];

export const StudentCourseList: React.FC = () => {
  const { courses, loading, error } = useCourses();
  const [filter, setFilter] = useState<FilterType>('All Courses');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1600D5]"></div>
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-center text-red-500 font-medium">Error: {error}</div>;
  }

  // Filter Logic
  const filteredCourses = courses.filter(course => {
    // API returns completion_percentage, fallback to progress
    const progress = (course as any).completion_percentage ?? course.progress ?? 0;
    if (filter === 'Completed') return progress === 100;
    if (filter === 'In Progress') return progress > 0 && progress < 100;
    return true; // 'All Courses'
  });

  return (
    <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-[40px] font-extrabold text-[#000000] mb-2 tracking-tight">My Courses</h1>
        <p className="text-gray-500 font-medium">
          You have <span className="text-[#1600D5] font-bold">{courses.length} active courses</span> this semester
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-10">
        {(['All Courses', 'In Progress', 'Completed'] as FilterType[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-colors ${
              filter === f 
                ? 'bg-[#1600D5] text-white shadow-md' 
                : 'bg-white text-gray-500 hover:bg-gray-50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center shadow-sm">
          <h3 className="text-xl font-bold text-gray-800 mb-2">No courses found</h3>
          <p className="text-gray-500 font-medium">Try changing your filter or check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => {
            const style = CARD_STYLES[index % CARD_STYLES.length];
            const progress = (course as any).completion_percentage ?? course.progress ?? 0;
            const isCompleted = progress === 100;
            const title = (course as any).name || course.title || 'Untitled Course';

            return (
              <Link 
                to={`/student/courses/${course.id}`} 
                key={course.id} 
                className="relative bg-white rounded-3xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 p-8 flex flex-col h-[280px] overflow-hidden group"
              >
                {/* Abstract shape */}
                <div className={`absolute -top-4 -right-4 w-28 h-28 rounded-bl-[100px] opacity-70 ${style.shape} transition-transform group-hover:scale-110`}></div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 relative z-10 ${style.iconBg}`}>
                  <FiBookOpen className={`text-2xl ${style.iconText}`} />
                </div>

                <div className="relative z-10 flex-1">
                  <h3 className="text-xl font-extrabold text-[#000000] mb-1.5 leading-tight">{title}</h3>
                  <p className="text-[13px] font-medium text-gray-500">
                    {(course as any).status || course.subject_name || 'Active'}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="relative z-10 mt-auto">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[11px] font-bold text-gray-400 tracking-wider">COMPLETION</span>
                    <span className={`text-sm font-black ${isCompleted ? 'text-[#00D053]' : 'text-[#1600D5]'}`}>
                      {progress}%
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-[#E2E2E2] rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ease-out ${isCompleted ? 'bg-[#00D053]' : 'bg-[#1600D5]'}`} 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {filteredCourses.length > 0 && (
        <div className="flex justify-center mt-12 mb-8">
          <button className="px-8 py-3.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 hover:shadow-sm transition-all shadow-sm">
            Load More Courses
          </button>
        </div>
      )}
    </div>
  );
};
