import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  FiX, FiMessageSquare, FiSearch, FiCode, FiFolder, FiLogOut, 
  FiPieChart, FiBookOpen, FiCheckSquare, FiCpu, FiSettings 
} from "react-icons/fi";
import Logo from "../../assets/Logo.png";
import { useAIStore } from "../../store/aiStore";

const mainNavItems = [
  { id: 'new-chat', label: "New chat", icon: <FiMessageSquare /> },
  { id: 'search-chats', label: "Search chats", icon: <FiSearch /> },
  { id: 'codex', label: "Codex", icon: <FiCode /> },
  { id: 'projects', label: "Projects", icon: <FiFolder /> },
];

const appNavItems = [
  { path: "/student/dashboard", label: "Dashboard", icon: <FiPieChart /> },
  { path: "/student/courses", label: "Courses", icon: <FiBookOpen /> },
  { path: "/student/tasks", label: "Tasks", icon: <FiCheckSquare /> },
  { path: "/student/ai-tutor", label: "AI Tutor", icon: <FiCpu /> },
  { path: "/student/settings", label: "Settings", icon: <FiSettings /> },
];

interface AITutorSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AITutorSidebar: React.FC<AITutorSidebarProps> = ({ isOpen, onClose }) => {
  const { chats, activeChatId, setActiveChat, newChat, searchQuery, setSearchQuery } = useAIStore();
  const [isSearchActive, setIsSearchActive] = useState(false);

  const filteredHistory = chats.filter(chat => 
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <div className="p-6 pb-2 border-slate-100 flex items-center justify-between">
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
        
        <nav className="flex-1 p-4 overflow-y-auto">
          {/* Main App Navigation (Visible on mobile to fix missing nav) */}
          <div className="mb-6 lg:hidden">
            <h3 className="px-4 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Main Menu</h3>
            <ul className="space-y-1">
              {appNavItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all font-bold text-sm ${
                        isActive
                          ? "text-white bg-[#FF8000] shadow-sm"
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                      }`
                    }
                  >
                    <span className="text-xl md:text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-slate-100 mx-4" />
          </div>

          <ul className="space-y-4 mb-8 mt-4">
            {mainNavItems.map((item) => (
              <li key={item.id}>
                {item.id === 'search-chats' ? (
                  <div className="relative group">
                    <div className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all font-semibold ${isSearchActive ? 'bg-slate-50 ring-1 ring-[#1600D5]' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 cursor-pointer'}`}>
                      <span className="text-xl md:text-lg"><FiSearch /></span>
                      <input 
                        type="text"
                        placeholder="Search chats"
                        className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-400 font-semibold"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsSearchActive(true)}
                        onBlur={() => setIsSearchActive(false)}
                      />
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      if (item.id === 'new-chat') newChat();
                      onClose();
                    }}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-900 w-full text-left"
                  >
                    <span className="text-xl md:text-lg">{item.icon}</span>
                    <span className="text-sm">{item.label}</span>
                  </button>
                )}
              </li>
            ))}
          </ul>
          
          <div className="px-4 mb-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">History</h3>
          </div>
          <ul className="space-y-2">
            {filteredHistory.map((chat) => (
              <li key={chat.id}>
                <button
                  onClick={() => {
                    setActiveChat(chat.id);
                    onClose();
                  }}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all font-bold text-sm w-full text-left ${
                    activeChatId === chat.id
                      ? "text-white bg-[#1600D5] shadow-sm"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span className="truncate">{chat.title}</span>
                </button>
              </li>
            ))}
            {filteredHistory.length === 0 && searchQuery && (
              <p className="px-4 py-2 text-xs text-slate-400 italic font-medium">No chats found...</p>
            )}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-slate-100 flex items-center gap-3 mt-auto">
          <div className="w-10 h-10 rounded-full bg-slate-400 flex items-center justify-center text-white font-bold shrink-0">
            <span className="w-9 h-9 rounded-full bg-gray-400 block border-2 border-white"></span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm text-slate-800 leading-tight truncate">Mazen Ali</p>
            <p className="text-xs text-slate-400 font-medium tracking-wide truncate">Student Account</p>
          </div>
          <button className="text-[#FF9500] p-2 hover:bg-orange-50 rounded-lg transition-colors shrink-0">
            <FiLogOut className="w-5 h-5" />
          </button>
        </div>
      </aside>
    </>
  );
};

export default AITutorSidebar;
