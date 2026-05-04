import React from "react";
import { NavLink } from "react-router-dom";
import { 
  FiX, 
  FiPieChart, 
  FiBookOpen, 
  FiCheckSquare, 
  FiUsers, 
  FiCalendar, 
  FiSettings, 
  FiLogOut,
  FiAward
} from "react-icons/fi";
import Logo from "../../../assets/Logo.png";

const navItems = [
  { path: "/teacher/dashboard", label: "Dashboard", icon: <FiPieChart /> },
  { path: "/teacher/courses", label: "Courses", icon: <FiBookOpen /> },
  { path: "/teacher/assignments", label: "Assignments", icon: <FiCheckSquare /> },
  { path: "/teacher/quizzes", label: "Quizzes", icon: <FiAward /> },
  { path: "/teacher/students", label: "Students", icon: <FiUsers /> },
  { path: "/teacher/attendance", label: "Attendance", icon: <FiCalendar /> },
  { path: "/teacher/settings", label: "Settings", icon: <FiSettings /> },
];

interface TeacherSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const TeacherSidebar: React.FC<TeacherSidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Sidebar Content */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 
        w-64 h-full bg-white text-slate-800 flex flex-col
        transform transition-transform duration-300 ease-in-out
        border-r border-slate-200
        md:transform-none md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={Logo} alt="Grow Logo" className="h-8 w-auto" />
          </div>
          <button 
            onClick={onClose}
            className="md:hidden p-2 text-slate-500 hover:text-slate-800 transition-colors"
            aria-label="Close menu"
          >
            <FiX size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-bold text-sm ${
                      isActive
                        ? "bg-[#FF8000] text-white shadow-sm"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }`
                  }
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-100 flex items-center gap-3 bg-slate-50/50">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-100">
            TR
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="font-bold text-sm text-slate-800 leading-tight truncate">Mr. Ahmed</p>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide">Teacher Account</p>
          </div>
          <button className="text-slate-400 p-2 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors">
            <FiLogOut className="w-5 h-5" />
          </button>
        </div>
      </aside>
    </>
  );
};

export default TeacherSidebar;
