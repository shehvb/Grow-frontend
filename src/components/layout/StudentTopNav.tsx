import type { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiBell } from "react-icons/fi";
import Logo from "../../assets/Logo.png";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", path: "/student/dashboard", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
  )},
  { id: "courses", label: "Courses", path: "/student/courses", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
  )},
  { id: "tasks", label: "Tasks", path: "/student/tasks", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
  )},
  { id: "ai-tutor", label: "AI Tutor", path: "/student/ai-tutor", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line></svg>
  )},
  { id: "settings", label: "Settings", path: "/student/settings", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
  )},
];

const StudentTopNav: FC = () => {
  const location = useLocation();

  return (
    <div className="w-full h-[72px] bg-white border-b border-slate-200 flex items-center px-8 lg:px-12 justify-between sticky top-0 z-50">
      {/* Brand logo */}
      <Link to="/student/dashboard" className="flex items-center gap-2">
        <img src={Logo} alt="Grow Logo" className="h-8 w-auto" />
      </Link>

      {/* Nav Links */}
      <nav className="hidden md:flex items-center gap-8">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname.includes(item.path);
          return (
            <Link 
              key={item.id} 
              to={item.path}
              className={`flex items-center gap-2 text-sm font-extrabold transition-colors ${
                isActive ? "text-[#1600d5]" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <div className={isActive ? "text-[#1600d5]" : "text-slate-400"}>
                {item.icon}
              </div>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Right icons */}
      <div className="flex items-center gap-5">
        <button className="relative text-[#1600d5] border border-[#FFE5CC] bg-[#FFF8F0] p-2 rounded-full hover:bg-[#FFE5CC]">
          <FiBell className="w-5 h-5" />
          <span className="absolute top-1 right-2 w-2 h-2 bg-[#1600D5] rounded-full border-2 border-white"></span>
        </button>
        <div className="w-9 h-9 bg-slate-400 rounded-full cursor-pointer hover:ring-2 hover:ring-slate-300 transition-all"></div>
      </div>
    </div>
  );
};

export default StudentTopNav;
