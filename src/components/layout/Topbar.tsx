import type { FC, ReactNode } from "react";
import { FiBell } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

interface TopbarProps {
  title?: string;
  onMenuToggle: () => void;
  isMenuOpen: boolean;
  children?: ReactNode;
  showSearch?: boolean;
}

const Topbar: FC<TopbarProps> = ({ title = "GROW Learning Platform", onMenuToggle, isMenuOpen, children, showSearch = true }) => {
  const location = useLocation();
  const isParent = location.pathname.startsWith("/parent");
  const notificationPath = isParent ? "/parent/notifications" : "/student/notifications";

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 shrink-0">
      <div className="flex items-center gap-3 w-full md:w-auto">
        <button
          onClick={onMenuToggle}
          className="md:hidden p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors shrink-0"
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-6 flex flex-col justify-center items-center">
            <span 
              className={`absolute block h-0.5 bg-slate-700 transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 w-6' : 'rotate-0 w-6 -translate-y-1.5'}`} 
            />
            <span 
              className={`absolute block h-0.5 bg-slate-700 transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0 w-6' : 'opacity-100 w-6'}`} 
            />
            <span 
              className={`absolute block h-0.5 bg-slate-700 transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 w-6' : 'rotate-0 w-6 translate-y-1.5'}`} 
            />
          </div>
        </button>
        {!children && <h2 className="text-xl font-semibold text-slate-800 truncate">{title}</h2>}
        {children && <div className="flex-1 flex justify-start w-full">{children}</div>}
      </div>
      <div className="flex items-center gap-4 ml-4">
        {/* Search Bar Removed */}
        {/* Notification Bell */}
        <Link to={notificationPath} className="relative p-2.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors bg-white border border-slate-200 block">
          <FiBell className="w-5 h-5 text-[#0062FF]" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </Link>
        {/* Profile Avatar (Mock) */}
        {!showSearch && (
          <div className="w-9 h-9 rounded-full bg-slate-400 shrink-0 border-2 border-white shadow-sm flex items-center justify-center text-white">
          </div>
        )}
      </div>
    </header>
  );
};

export default Topbar;
