import  { type FC , useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useScrolled } from "../components/hooks";
import { NAV_LINKS } from "../components/data";
import Logo from "../assets/Logo.png"

const Navbar: FC = () => {
  const navigate = useNavigate();
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // If we are at the top (Hero section), no active state
      if (scrollPosition < 200) {
        setActiveSection("");
        return;
      }

      const spyPosition = scrollPosition + 250;
      let currentSection = "";

      for (const link of NAV_LINKS) {
        const id = link.toLowerCase().replace(/ /g, "-");
        const element = document.getElementById(id);
        if (element) {
          const { offsetTop } = element;
          if (spyPosition >= offsetTop) {
            currentSection = id;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-white/85 backdrop-blur-md border-b border-slate-100 transition-shadow duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      {/* Logo */}
      <a href="#" className="flex items-center gap-3 no-underline w-56">
        <img src={Logo} alt=" grow logo" className="w-32 "  />
      </a>

      {/* Desktop Links */}
      <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
        {NAV_LINKS.map((link) => {
          const id = link.toLowerCase().replace(/ /g, "-");
          const isActive = activeSection === id;
          return (
            <li key={link}>
              <a
                href={`#${id}`}
                className={`font-bold text-sm transition-all duration-300 no-underline relative group ${
                  isActive ? "text-blue-600 scale-105" : "text-slate-500 hover:text-blue-600"
                }`}
              >
                {link}
                <span className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 transition-transform duration-300 rounded-full ${
                  isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`} />
              </a>
            </li>
          );
        })}
      </ul>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/login/parent')} className="hidden md:block px-5 py-2 rounded-xl border-2 border-slate-200 text-slate-700 font-bold text-sm hover:border-blue-400 hover:text-blue-600 transition-all">
          Login
        </button>
        <button onClick={() => navigate('/signup/student')} className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-500 hover:-translate-y-0.5 transition-all">
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
            {NAV_LINKS.map((link) => {
              const id = link.toLowerCase().replace(/ /g, "-");
              const isActive = activeSection === id;
              return (
                <li key={link}>
                  <a
                    href={`#${id}`}
                    onClick={() => setMenuOpen(false)}
                    className={`block font-bold text-sm py-2 no-underline transition-colors ${
                      isActive ? "text-blue-600" : "text-slate-600 hover:text-blue-600"
                    }`}
                  >
                    {link}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
