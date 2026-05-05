import { useState } from "react";
import type { FC, ReactNode } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import PageContainer from "../components/layout/PageContainer";
import { Link } from "react-router-dom";
import { FiMessageSquare } from "react-icons/fi";

interface StudentLayoutProps {
  children?: ReactNode;
}

const StudentLayout: FC<StudentLayoutProps> = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
      <div className="flex-1 flex flex-col h-screen min-h-0 overflow-hidden">
        <Topbar
          onMenuToggle={toggleMobileMenu}
          isMenuOpen={isMobileMenuOpen}
        />
        <PageContainer
          className={`flex-1 w-full flex flex-col min-h-0 min-w-0 ${location.pathname.includes('/ai-tutor') || location.pathname.includes('/communication')
              ? '!p-0 overflow-hidden h-full'
              : 'overflow-y-auto'
            }`}
        >
          <div className={`flex-1 flex flex-col min-h-0 ${location.pathname.includes('/ai-tutor') || location.pathname.includes('/communication') ? 'h-full' : ''}`}>
            <Outlet />
          </div>
        </PageContainer>
        
        {/* Floating Message Button */}
        {!location.pathname.includes('/communication') && (
          <Link 
            to="/student/communication/chat"
            className="fixed bottom-28 right-6 md:bottom-8 md:right-8 w-14 h-14 rounded-full bg-[#1600D5] text-white flex items-center justify-center flex-shrink-0 shadow-xl z-50 transition-all hover:scale-105 hover:bg-[#1200b3] animate-float focus:outline-none focus:ring-4 focus:ring-indigo-300"
          >
            <FiMessageSquare className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#FF8000] border-2 border-white rounded-full"></span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StudentLayout;
