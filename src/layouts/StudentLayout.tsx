import { useState } from "react";
import type { FC, ReactNode } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import PageContainer from "../components/layout/PageContainer";
import useIdleTimeout from "../hooks/useIdleTimeout";


interface StudentLayoutProps {
  children?: ReactNode;
}

const StudentLayout: FC<StudentLayoutProps> = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  useIdleTimeout();

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
          <div className={`max-w-[1320px] mx-auto w-full flex-1 flex flex-col min-h-0 ${location.pathname.includes('/ai-tutor') || location.pathname.includes('/communication') ? 'h-full' : ''}`}>
            <Outlet />
          </div>
        </PageContainer>
        {/* Floating Message Button Removed */}
      </div>
    </div>
  );
};

export default StudentLayout;
