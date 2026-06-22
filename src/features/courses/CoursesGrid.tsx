import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import type { Course } from "../../types";
import { motion } from "framer-motion";

interface CoursesGridProps {
  courses: Course[];
}

const CourseIcon = ({ id }: { id: string }) => {
  switch (id) {
    case '1': return <span className="font-serif italic text-xl font-black">√x</span>;
    case '2': return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l9 4v12l-9 4-9-4V6z M6 10l6 3 6-3 M12 13v7" />
      </svg>
    );
    case '3': return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 2v7.3l-4.5 8.2c-.6 1.1-.3 2.5.8 3.1.4.2.8.4 1.2.4h9c1.3 0 2.3-1 2.3-2.3 0-.4-.1-.9-.4-1.2L14 9.3V2h-4zm2 2h2v5.7l4 7.3h-8l4-7.3V4z" />
      </svg>
    );
    case '4': return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14H7.5c.8 0 1.5.7 1.5 1.5S8.3 22 7.5 22 6 21.3 6 20.5 5.3 19 4.5 19H19v2h-1z" />
      </svg>
    );
    case '5': return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
      </svg>
    );
    case '6': return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1h.39c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-4 9c-.83 0-1.5-.67-1.5-1.5S7.17 9 8 9s1.5.67 1.5 1.5S8.83 12 8 12zm2-5c-.83 0-1.5-.67-1.5-1.5S9.17 4 10 4s1.5.67 1.5 1.5S10.83 7 10 7zm4 0c-.83 0-1.5-.67-1.5-1.5S13.17 4 14 4s1.5.67 1.5 1.5S14.83 7 14 7zm2 5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
      </svg>
    );
    default: return null;
  }
};

const getCourseStyle = (id: string) => {
  const styles = [
    { themeBg: 'bg-[#1600D545]', themeColor: 'text-[#1600D5]', shapeColor: 'bg-[#1600D522]', barFill: 'bg-[#1600D5]' },
    { themeBg: 'bg-[#FF800038]', themeColor: 'text-[#FF8000]', shapeColor: 'bg-[#FF800038]', barFill: 'bg-[#1600D5]' },
    { themeBg: 'bg-[#FFCFE4]', themeColor: 'text-[#FF0070]', shapeColor: 'bg-[#FFCFE4]', barFill: 'bg-[#1600D5]' },
    { themeBg: 'bg-[#D504FF21]', themeColor: 'text-[#D400FF]', shapeColor: 'bg-[#D504FF21]', barFill: 'bg-[#1600D5]' },
    { themeBg: 'bg-[#00FFF21A]', themeColor: 'text-[#00FFF2]', shapeColor: 'bg-[#00FFF21A]', barFill: 'bg-[#1600D5]' },
    { themeBg: 'bg-[#FFB80020]', themeColor: 'text-[#FFB800]', shapeColor: 'bg-[#FFB80010]', barFill: 'bg-[#1600D5]' },
  ];
  return styles[(parseInt(id) - 1) % styles.length];
};

const COMPLETED_STYLE = {
  themeBg: 'bg-[#D6EAD7]',
  themeColor: 'text-[#43A047]',
  shapeColor: 'bg-[#D6EAD722]',
  barFill: 'bg-[#43A047]'
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

const CoursesGrid: FC<CoursesGridProps> = ({ courses }) => {
  const navigate = useNavigate();
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {courses.map((course) => {
        const isCompleted = course.progress === 100;
        const style = isCompleted ? COMPLETED_STYLE : getCourseStyle(course.id);
        return (
          <motion.div 
            key={course.id} 
            onClick={() => navigate(`/student/courses/${course.id}`)}
            className="relative bg-white rounded-xl p-8 shadow-sm border border-slate-100 overflow-hidden flex flex-col h-[280px] cursor-pointer group w-full"
            variants={cardVariants}
            whileHover={{ 
              scale: 1.02, 
              y: -4,
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.06)"
            }}
          >
            {/* Top Right Shape */}
            <motion.div 
              className={`absolute -top-6 -right-6 w-32 h-32 rounded-full ${style.shapeColor}`}
              whileHover={{ scale: 1.1, rotate: 12 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            />

            <div className="flex-1 relative z-10">
              {/* Top Left Icon */}
              <div className="relative mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${style.themeBg} ${style.themeColor}`}>
                  <CourseIcon id={course.id} />
                </div>
              </div>

              <h3 className={`text-xl font-extrabold text-[#0F172A] mb-1 tracking-tight truncate group-hover:${style.themeColor} transition-colors`}>{course.title}</h3>
              <p className="text-sm text-slate-400 font-medium truncate">{course.instructor.name}</p>
              <div className="flex items-center gap-2 mt-3">
                <div className={`p-1.5 rounded-md ${style.shapeColor}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={style.themeColor}>
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                  </svg>
                </div>
                <span className="text-xs font-bold text-slate-500">{course.lessonsCount} Lessons</span>
              </div>
            </div>

            <div className="mt-auto relative z-10 w-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold text-slate-400 tracking-widest uppercase">Completion</span>
                <span className={`text-sm font-extrabold ${style.themeColor}`}>{course.progress}%</span>
              </div>
              <div className="w-full h-3 bg-[#E2E2E2] rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${style.barFill} transition-all duration-1000`} style={{ width: `${course.progress}%` }}></div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default CoursesGrid;

