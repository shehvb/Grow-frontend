import { type FC, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Alone from "../../assets/ALONE 1.png";
import AuthTabs from "./AuthTabs";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/authStore";
import { authApi } from "../../services/authApi";
import { IoIosEyeOff ,IoIosEye } from "react-icons/io";

interface School {
  id: number;
  name: string;
  school_code: string;
}


const GrowLogo: FC = () => (
  <Link to="/" className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity w-fit z-10 relative">
    <div className="w-16 h-16 rounded-xl bg-white/60 border border-white/10 flex items-center justify-center shadow-lg">
      <img src={Alone} alt="" className="" />
    </div>
    <span className="text-white font-black text-2xl tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
      GROW
    </span>
  </Link>
);

const LeftPanel: FC = () => (
  <div className="relative hidden h-screen lg:flex flex-col justify-between p-12 overflow-hidden"
    style={{
      background: "linear-gradient(135deg, #312e81 0%, #3730a3 40%, #4338ca 70%, #4f46e5 100%)",
    }}
  >
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Playfair+Display:wght@700;800;900&display=swap');
      @keyframes barRise { from { transform: scaleY(0); opacity: 0; } to { transform: scaleY(1); opacity: 1; } }
      @keyframes arrowDraw { from { stroke-dashoffset: 300; } to { stroke-dashoffset: 0; } }
      @keyframes floatStar { 0%,100% { transform: translateY(0) scale(1); opacity:.7; } 50% { transform: translateY(-8px) scale(1.2); opacity:1; } }
      .bar { transform-origin: bottom; animation: barRise .8s cubic-bezier(.34,1.56,.64,1) both; }
      .bar1 { animation-delay: .1s; }
      .bar2 { animation-delay: .2s; }
      .bar3 { animation-delay: .3s; }
      .bar4 { animation-delay: .4s; }
      .bar5 { animation-delay: .5s; }
      .bar6 { animation-delay: .6s; }
      .bar7 { animation-delay: .7s; }
      .arrow-path { stroke-dasharray: 300; animation: arrowDraw 1.4s ease 0.8s both; }
      .star { animation: floatStar 3s ease-in-out infinite; }
    `}</style>

    <div className="absolute inset-0 pointer-events-none">
      {[
        [12, 15], [25, 40], [70, 20], [80, 55], [40, 70], [60, 80], [15, 65], [85, 35],
      ].map(([x, y], i) => (
        <div key={i} className="star absolute w-1.5 h-1.5 rounded-full bg-indigo-300/60" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.4}s` }} />
      ))}
    </div>

    <div className="absolute bottom-32 right-8 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute top-20 left-8 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

    <GrowLogo />

    <div className="flex-1 flex items-center justify-center py-8">
      <svg viewBox="0 0 320 260" className="w-full max-w-xs drop-shadow-2xl" fill="none">
        {[200, 160, 120, 80].map((y, i) => (
          <line key={i} x1="20" y1={y} x2="300" y2={y} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        ))}
        <line x1="20" y1="210" x2="300" y2="210" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />

        {[
          { x: 30, h: 40, colors: ["#818cf8", "#a5b4fc"] },
          { x: 65, h: 70, colors: ["#818cf8", "#a5b4fc"] },
          { x: 100, h: 90, colors: ["#6366f1", "#818cf8"] },
          { x: 135, h: 115, colors: ["#4f46e5", "#6366f1"] },
          { x: 170, h: 140, colors: ["#4f46e5", "#6366f1"] },
          { x: 205, h: 165, colors: ["#4338ca", "#4f46e5"] },
          { x: 240, h: 195, colors: ["#3730a3", "#4338ca"] },
        ].map((b, i) => (
          <g key={i}>
            <defs>
              <linearGradient id={`bg${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={b.colors[1]} stopOpacity="0.9" />
                <stop offset="100%" stopColor={b.colors[0]} stopOpacity="0.5" />
              </linearGradient>
            </defs>
            <rect className={`bar bar${i + 1}`} x={b.x} y={210 - b.h} width="28" height={b.h} rx="4" fill={`url(#bg${i})`} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          </g>
        ))}

        <path className="arrow-path" d="M31 200 Q102 182 162 142 Q222 105 274 55" stroke="#c7d2fe" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M265 52 L278 52 L275 65" stroke="#c7d2fe" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M30 205 Q130 185 240 130 Q265 118 278 105" stroke="rgba(199,210,254,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="6 4" fill="none" />
      </svg>
    </div>

    <div>
      <h2 className="text-white text-3xl font-black leading-tight mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
        Empowering our<br />educators.
      </h2>
      <p className="text-indigo-100 text-sm leading-relaxed max-w-xs">
        Manage your courses, assist students across subjects, and deliver excellence with real-time class analytics.
      </p>
    </div>
  </div>
);

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [schools, setSchools] = useState<School[]>([]);
  const [selectedSchoolCode, setSelectedSchoolCode] = useState("");

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const data = await authApi.getSchools();
        setSchools(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load schools", err);
        // Fallback for UI if backend is not ready
        setSchools([
          { id: 1, name: "Springfield Elementary", school_code: "SPR-001" },
          { id: 2, name: "Westside High School", school_code: "WHS-002" },
        ]);
      }
    };
    fetchSchools();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!selectedSchoolCode) {
      setError("Please choose your school");
      return;
    }

    if (!email.trim() || !password) {
      setError("Please enter your email and password");
      return;
    }

    setLoading(true);

    try {
      const login = useAuthStore.getState().login;
      const school = schools.find(s => s.school_code === selectedSchoolCode);
      await login({ 
        school_id: school?.id,
        email: email.trim().toLowerCase(), 
        password,
        role: 'teacher'
      });

      const user = useAuthStore.getState().user;

      if (user?.role !== 'teacher') {
        setError("This account is not registered as a Teacher. Please use the correct login portal.");
        useAuthStore.getState().logout();
        return;
      }

      // alert(`✅ Login successful! Welcome ${user?.first_name || user?.username || 'Teacher'}`);
      toast.success(`Welcome back, ${user?.first_name || user?.username || 'Teacher'}!`);
      navigate("/teacher/dashboard");
    } catch (err: any) {
      console.error(err);
      const msg = err.response?.data?.detail || "Invalid credentials or cannot connect to server.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col justify-between h-screen overflow-y-auto bg-white p-10 lg:p-16">
      <Link to="/" className="lg:hidden flex items-center gap-3 mb-8 cursor-pointer hover:opacity-90 transition-opacity">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center">
          <span className="text-white font-black text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>G</span>
        </div>
        <span className="font-black text-xl text-indigo-700" style={{ fontFamily: "'Playfair Display', serif" }}>GROW</span>
      </Link>

      <div className="flex-1 flex flex-col justify-start pt-12 lg:pt-20 max-w-md mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            Welcome, Back
          </h1>
          <p className="text-slate-400 text-sm font-semibold" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Ready to lead and inspire today?
          </p>
        </div>

        <AuthTabs currentRole="teacher" onRoleChange={(r) => navigate(`/login/${r}`)} />
        <form onSubmit={handleSubmit}>
          {/* School Selector */}
          <div className="mb-4">
            <label className="block text-slate-700 font-extrabold text-sm mb-2" style={{ fontFamily: "'Nunito', sans-serif" }}>
              School Selector
            </label>
            <select
              value={selectedSchoolCode}
              onChange={(e) => setSelectedSchoolCode(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              <option value="">Choose your school...</option>
              {schools.map((school) => (
                <option key={school.id} value={school.school_code}>
                  {school.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-slate-700 font-black text-sm mb-2" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            />
          </div>

          <div className="mb-2">
            <label className="block text-slate-700 font-black text-sm mb-2" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3.5 pr-12 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPass ? (
                  <IoIosEyeOff className="w-5 h-5" />
                ) : (
                  <IoIosEye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-end mb-4">
            <button type="button" onClick={() => navigate('/forgot-password')} className="text-indigo-600 font-black text-sm hover:text-indigo-800 transition-colors" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Forget password?
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-semibold">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl font-black text-white text-base transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
            style={{
              fontFamily: "'Nunito', sans-serif",
              background: "linear-gradient(135deg, #4f46e5 0%, #3f39cf 100%)",
              boxShadow: "0 8px 32px rgba(79,70,229,0.35)",
            }}
          >
            {loading ? "Educating..." : "Log In"}
          </button>
        </form>

        {/* <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-slate-400 text-xs font-bold" style={{ fontFamily: "'Nunito', sans-serif" }}>Or continue with</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          <button className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border-2 border-slate-200 bg-white font-black text-slate-700 text-sm hover:border-emerald-300 hover:bg-slate-50 transition-all" style={{ fontFamily: "'Nunito', sans-serif" }}>
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google
          </button>
          <button className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border-2 border-slate-200 bg-white font-black text-slate-700 text-sm hover:border-emerald-300 hover:bg-slate-50 transition-all" style={{ fontFamily: "'Nunito', sans-serif" }}>
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook
          </button> */}
        <p className="text-center text-slate-500 text-sm mt-6" style={{ fontFamily: "'Nunito', sans-serif" }}>
          Don't have an account?{" "}
          <button type="button" onClick={() => navigate('/signup/teacher')} className="text-indigo-600 font-black hover:text-indigo-800 transition-colors">Sign Up</button>
        </p>
      </div>

      <div className="flex justify-center gap-6 mt-8">
        {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((l) => (
          <a key={l} href="#" className="text-slate-400 text-xs font-bold hover:text-slate-600 transition-colors" style={{ fontFamily: "'Nunito', sans-serif" }}>
            {l}
          </a>
        ))}
      </div>
    </div>
  );
};

const LoginTeacher: FC = () => {
  return (
    <div className="min-h-screen h-screen grid lg:grid-cols-[45%_55%] overflow-hidden" style={{ fontFamily: "'Nunito', sans-serif" }}>
      <LeftPanel />
      <LoginForm />
    </div>
  );
};

export default LoginTeacher;
