import { useState } from "react";
import type { FC } from "react";
import { Outlet } from "react-router-dom";
import TeacherSidebar from "../features/teacher/components/TeacherSidebar";
import TeacherTopbar from "../features/teacher/components/TeacherTopbar";
import PageContainer from "../components/layout/PageContainer";

const TeacherLayout: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F3F3F3]">
      <TeacherSidebar isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
      
      <div className="flex-1 flex flex-col h-screen min-h-0 overflow-hidden">
        <TeacherTopbar
          onMenuToggle={toggleMobileMenu}
          isMenuOpen={isMobileMenuOpen}
        />
        
        <PageContainer className="flex-1 overflow-y-auto w-full">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </PageContainer>
      </div>
    </div>
  );
};

export default TeacherLayout;
