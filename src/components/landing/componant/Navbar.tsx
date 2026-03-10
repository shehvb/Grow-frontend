import  { type FC, useState } from "react";
import { useScrolled } from "../hooks";
import { NAV_LINKS } from "../data";

const Navbar: FC = () => {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-white/85 backdrop-blur-md border-b border-slate-100 transition-shadow duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      {/* Logo */}
      <a href="#" className="flex items-center gap-3 no-underline">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-orange-400 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-200">
          G
        </div>
        <span className="font-black text-xl text-blue-600 font-display">Grow</span>
      </a>

      {/* Desktop Links */}
      <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
        {NAV_LINKS.map((link) => (
          <li key={link}>
            <a
              href={`#${link.toLowerCase().replace(/ /g, "-")}`}
              className="text-slate-500 hover:text-blue-600 font-bold text-sm transition-colors no-underline relative group"
            >
              {link}
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
            </a>
          </li>
        ))}
      </ul>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button className="hidden md:block px-5 py-2 rounded-xl border-2 border-slate-200 text-slate-700 font-bold text-sm hover:border-blue-400 hover:text-blue-600 transition-all">
          Login
        </button>
        <button className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-500 hover:-translate-y-0.5 transition-all">
          Get Started
        </button>
        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 h-0.5 bg-slate-700 mb-1" />
          <div className="w-5 h-0.5 bg-slate-700 mb-1" />
          <div className="w-5 h-0.5 bg-slate-700" />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-lg md:hidden">
          <ul className="list-none m-0 p-4 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase().replace(/ /g, "-")}`}
                  onClick={() => setMenuOpen(false)}
                  className="block text-slate-600 hover:text-blue-600 font-bold text-sm py-2 no-underline transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
