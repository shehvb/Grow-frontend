import type { FC, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import StudentTopNav from "../components/layout/StudentTopNav";
import PageContainer from "../components/layout/PageContainer";

interface CourseLayoutProps {
  children?: ReactNode;
}

const CourseLayout: FC<CourseLayoutProps> = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#F8F9FA]">
      <StudentTopNav />
      <PageContainer className="flex-1 overflow-y-auto w-full pt-10 px-4 md:px-10 pb-20">
        <Outlet />
      </PageContainer>
    </div>
  );
};

export default CourseLayout;
