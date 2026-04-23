import type { FC } from "react";
import type { Course } from "../../mock/courses.mock";
import ProgressBar from "../../components/ui/ProgressBar";

interface CourseCardProps {
  course: Course;
  onClick?: () => void;
}

const CourseCard: FC<CourseCardProps> = ({ course, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-slate-800 line-clamp-2">{course.title}</h3>
      </div>
      <p className="text-sm text-slate-500 mb-4">{course.instructor.name}</p>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Progress</span>
          <span className="font-medium text-slate-700">{course.progress}%</span>
        </div>
        <ProgressBar progress={course.progress} />
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <span className={`text-xs px-2 py-1 rounded-full ${
          course.status === "completed" 
            ? "bg-emerald-100 text-emerald-700"
            : course.status === "in_progress"
            ? "bg-blue-100 text-blue-700"
            : "bg-slate-100 text-slate-600"
        }`}>
          {course.status === "not_started" ? "Not Started" : 
           course.status === "in_progress" ? "In Progress" : "Completed"}
        </span>
      </div>
    </div>
  );
};

export default CourseCard;
