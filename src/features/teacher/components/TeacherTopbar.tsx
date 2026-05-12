import type { FC, ReactNode } from "react";
import { FiBell } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

interface TeacherTopbarProps {
  title?: string;
  onMenuToggle: () => void;
  isMenuOpen: boolean;
  children?: ReactNode;
}

const TeacherTopbar: FC<TeacherTopbarProps> = ({ 
  title = "Teacher Dashboard", 
  onMenuToggle, 
  isMenuOpen, 
  children 
}) => {
  const location = useLocation();
  let displayTitle = title;
  if (location.pathname.includes('/assignments')) {
    displayTitle = "student assignments";
  } else if (location.pathname.includes('/quizzes')) {
    displayTitle = "Quizzes";
  } else if (location.pathname.includes('/students')) {
    displayTitle = "Students";
  }

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 shrink-0">
      <div className="flex items-center gap-3 w-full md:w-auto">
        <button
          onClick={onMenuToggle}
          className="md:hidden p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors shrink-0"
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-6 flex flex-col justify-center items-center">
            <span 
              className={`absolute block h-0.5 bg-slate-700 transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 w-6' : 'rotate-0 w-6 -translate-y-1.5'}`} 
            />
            <span 
              className={`absolute block h-0.5 bg-slate-700 transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0 w-6' : 'opacity-100 w-6'}`} 
            />
            <span 
              className={`absolute block h-0.5 bg-slate-700 transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 w-6' : 'rotate-0 w-6 translate-y-1.5'}`} 
            />
          </div>
        </button>
        {!children && <h2 className="text-xl font-bold text-slate-800 truncate capitalize">{displayTitle}</h2>}
        {children && <div className="flex-1 flex justify-start w-full">{children}</div>}
      </div>

      <div className="flex items-center gap-4 ml-4">
        {/* Search Bar Removed */}
        {/* Notification Bell */}
        <Link to="/teacher/notifications" className="relative p-2.5 text-[#FF8000] bg-orange-50 hover:bg-orange-100 rounded-full transition-all block">
          <FiBell className="w-5 h-5" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-[#FF8000] rounded-full border border-white"></span>
        </Link>
      </div>
    </header>
  );
};

export default TeacherTopbar;
