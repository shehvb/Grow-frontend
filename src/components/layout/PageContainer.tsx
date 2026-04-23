import type { FC, ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

const PageContainer: FC<PageContainerProps> = ({ children, className = "" }) => {
  return (
    <main className={`p-6 bg-[#F3F3F3] ${className}`}>
      {children}
    </main>
  );
};

export default PageContainer;
