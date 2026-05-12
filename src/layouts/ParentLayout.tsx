import { useState, useEffect } from "react";
import type { FC } from "react";
import { Outlet } from "react-router-dom";
import ParentSidebar from "../components/layout/ParentSidebar";
import Topbar from "../components/layout/Topbar";
import PageContainer from "../components/layout/PageContainer";
import { useParentStore } from "../store/parentStore";

import StudentSelector from "../features/parent/components/StudentSelector";

const ParentLayout: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { fetchStudents } = useParentStore();


  useEffect(() => {
    fetchStudents("p1");
  }, [fetchStudents]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-[#F3F3F3] overflow-hidden relative">
      <ParentSidebar isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Topbar 
          title="Parent Dashboard"
          onMenuToggle={toggleMobileMenu} 
          isMenuOpen={isMobileMenuOpen} 
        >
          <StudentSelector />
        </Topbar>
        <PageContainer className="flex-1 overflow-y-auto w-full">
          <Outlet />
        </PageContainer>
        {/* Floating Message Button Removed */}
      </div>
    </div>
  );
};

export default ParentLayout;
