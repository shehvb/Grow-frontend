import type { FC, ReactNode } from "react";
import { FiSearch, FiBell } from "react-icons/fi";
import { Link } from "react-router-dom";

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
        {!children && <h2 className="text-xl font-bold text-slate-800 truncate">{title}</h2>}
        {children && <div className="flex-1 flex justify-start w-full">{children}</div>}
      </div>

      <div className="flex items-center gap-4 ml-4">
        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-[#F1F3F5] rounded-xl px-4 py-2 w-full max-w-md border border-slate-100 focus-within:border-blue-300 transition-all">
          <FiSearch className="text-slate-400 w-4 h-4 mr-2" />
          <input 
            type="text" 
            placeholder="Search students, courses..." 
            className="bg-transparent border-none outline-none text-sm text-slate-600 w-full placeholder:text-slate-400"
          />
        </div>

        {/* Notification Bell */}
        <Link to="/teacher/notifications" className="relative p-2.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all border border-slate-100 block shadow-sm">
          <FiBell className="w-5 h-5" />
          <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </Link>
      </div>
    </header>
  );
};

export default TeacherTopbar;
