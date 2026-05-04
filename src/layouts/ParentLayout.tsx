import { useState, useEffect } from "react";
import type { FC } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import ParentSidebar from "../components/layout/ParentSidebar";
import Topbar from "../components/layout/Topbar";
import PageContainer from "../components/layout/PageContainer";
import { useParentStore } from "../store/parentStore";
import { FiMessageSquare } from "react-icons/fi";
import StudentSelector from "../features/parent/components/StudentSelector";

const ParentLayout: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { fetchStudents } = useParentStore();
  const location = useLocation();

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
        
        {/* Floating Message Button */}
        {!location.pathname.includes('/communication') && (
          <Link 
            to="/parent/communication/chat"
            className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-[#FF8000] text-white flex items-center justify-center flex-shrink-0 shadow-xl z-50 transition-all hover:scale-105 hover:bg-[#e67300] focus:outline-none focus:ring-4 focus:ring-orange-300"
          >
            <FiMessageSquare className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-blue-500 border-2 border-white rounded-full"></span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ParentLayout;
