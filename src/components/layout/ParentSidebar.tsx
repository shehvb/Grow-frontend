import type { FC } from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FiX, FiPieChart, FiFileText, FiSettings, FiCalendar, FiBarChart2, FiLogOut } from "react-icons/fi";
import Logo from "../../assets/Logo.png";

const navItems = [
  { path: "/parent/dashboard", label: "Dashboard", icon: <FiPieChart /> },
  { path: "/parent/analytics", label: "Analytic", icon: <FiBarChart2 /> },
  { path: "/parent/attendance", label: "Attendance", icon: <FiCalendar /> },
  { path: "/parent/reports", label: "Reports", icon: <FiFileText /> },
  { path: "/parent/settings", label: "Settings", icon: <FiSettings /> },
];

interface ParentSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const ParentSidebar: FC<ParentSidebarProps> = ({ isOpen, onClose }) => {
  const [parentName, setParentName] = useState("Parent");

  useEffect(() => {
    // نحاول نجيب اسم الـ Parent من localStorage (هنحفظه لاحقًا عند الـ Login)
    const user = localStorage.getItem("user");
    if (user) {
      const parsed = JSON.parse(user);
      setParentName(parsed.username || parsed.email?.split('@')[0] || "Parent");
    }
  }, []);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

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

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${isActive
                      ? "text-[#0062FF] font-bold"
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

        {/* Bottom Parent Info - Dynamic */}
        <div className="p-4 border-t border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-400 flex items-center justify-center text-white font-bold text-lg">
            {parentName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm text-slate-800 leading-tight truncate">
              {parentName}
            </p>
            <p className="text-xs text-slate-400 font-medium tracking-wide">Parent Account</p>
          </div>
          <button className="text-[#0062FF] p-2 hover:bg-blue-50 rounded-lg transition-colors">
            <FiLogOut className="w-5 h-5" />
          </button>
        </div>
      </aside>
    </>
  );
};

export default ParentSidebar;