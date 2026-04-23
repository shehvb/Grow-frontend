import { useState } from "react";
import type { FC, ReactNode } from "react";
import { Outlet, NavLink } from "react-router-dom";
import AITutorSidebar from "../components/layout/AITutorSidebar";
import Topbar from "../components/layout/Topbar";
import { FiPieChart, FiBookOpen, FiCheckSquare, FiCpu, FiSettings } from "react-icons/fi";

interface AITutorLayoutProps {
  children?: ReactNode;
}

const mainNavItems = [
  { path: "/student/dashboard", label: "Dashboard", icon: <FiPieChart /> },
  { path: "/student/courses", label: "Courses", icon: <FiBookOpen /> },
  { path: "/student/tasks", label: "Tasks", icon: <FiCheckSquare /> },
  { path: "/student/ai-tutor", label: "AI Tour", icon: <FiCpu /> },
  { path: "/student/settings", label: "Setting", icon: <FiSettings /> },
];

const AITutorLayout: FC<AITutorLayoutProps> = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F3F3F3]">
      <AITutorSidebar isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Topbar
          onMenuToggle={toggleMobileMenu}
          isMenuOpen={isMobileMenuOpen}
          showSearch={false}
        >
          {/* Horizontal Navigation inside Topbar */}
          <nav className="hidden md:flex items-center gap-10 lg:gap-14 ml-8">
            {mainNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 text-[15px] transition-colors ${isActive
                    ? "text-[#FF8000] font-bold"
                    : "text-[#94A3B8] font-bold hover:text-slate-700"
                  }`
                }
              >
                <span className={`text-lg ${item.path.includes('ai-tutor') ? 'text-[#FF8000]' : ''}`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </Topbar>

        <main className="flex-1 w-full flex flex-col min-h-0 !p-0 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AITutorLayout;
