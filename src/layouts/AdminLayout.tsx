import { Link, Outlet, useLocation } from "react-router-dom";
import { FiGrid, FiFileText } from "react-icons/fi";
import logo from "../assets/Logo.png";

export default function AdminLayout() {
  const location = useLocation();

  const navLinks = [
    { name: "Dashboard", path: "/admin", icon: FiGrid },
    { name: "Reports", path: "/admin/reports", icon: FiFileText },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FB] font-display">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-gray-100 h-[72px] flex items-center px-6 lg:px-10 justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2">
          {/* Mock Logo */}
          <Link to="/admin" className="flex items-center gap-1.5 cursor-pointer">
            <img src={logo} alt="Grow Logo" className="h-8" />
          </Link>
          <div className="h-6 w-px bg-gray-200 mx-4"></div>
          <span className="text-sm font-medium text-gray-500">School Admin</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path === "/admin" && location.pathname.startsWith("/admin/class"));
            const Icon = link.icon;
            
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-2 text-sm font-bold transition-colors ${
                  isActive ? "text-orange-500" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <Icon className="w-5 h-5" />
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600 cursor-pointer hover:bg-gray-200 transition-colors">
            AD
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
