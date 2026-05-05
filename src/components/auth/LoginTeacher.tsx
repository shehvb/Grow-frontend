import { type FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Alone from "../../assets/ALONE 1.png";
import AuthTabs from "./AuthTabs";

interface School {
  id: number;
  name: string;
  school_code: string;
}


const GrowLogo: FC = () => (
  <div className="flex items-center gap-3">
    <div className="w-16 h-16 rounded-xl bg-white/60 border border-white/10 flex items-center justify-center shadow-lg">
      <img src={Alone} alt="" className="" />
    </div>
    <span className="text-white font-black text-2xl tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
      GROW
    </span>
  </div>
);

const LeftPanel: FC = () => (
  <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden"
    style={{
      background: "linear-gradient(135deg, #064e3b 0%, #047857 40%, #059669 70%, #10b981 100%)",
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
        <div key={i} className="star absolute w-1.5 h-1.5 rounded-full bg-emerald-300/60" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.4}s` }} />
      ))}
    </div>

    <div className="absolute bottom-32 right-8 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute top-20 left-8 w-48 h-48 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

    <GrowLogo />

    <div className="flex-1 flex items-center justify-center py-8">
      <svg viewBox="0 0 320 260" className="w-full max-w-xs drop-shadow-2xl" fill="none">
        {[200, 160, 120, 80].map((y, i) => (
          <line key={i} x1="20" y1={y} x2="300" y2={y} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        ))}
        <line x1="20" y1="210" x2="300" y2="210" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />

        {[
          { x: 30, h: 40, colors: ["#34d399", "#6ee7b7"] },
          { x: 65, h: 70, colors: ["#34d399", "#6ee7b7"] },
          { x: 100, h: 90, colors: ["#10b981", "#34d399"] },
          { x: 135, h: 115, colors: ["#059669", "#10b981"] },
          { x: 170, h: 140, colors: ["#059669", "#10b981"] },
          { x: 205, h: 165, colors: ["#047857", "#059669"] },
          { x: 240, h: 195, colors: ["#065f46", "#047857"] },
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

        <path className="arrow-path" d="M31 200 Q102 182 162 142 Q222 105 274 55" stroke="#a7f3d0" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M265 52 L278 52 L275 65" stroke="#a7f3d0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M30 205 Q130 185 240 130 Q265 118 278 105" stroke="rgba(167,243,208,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="6 4" fill="none" />
      </svg>
    </div>

    <div>
      <h2 className="text-white text-3xl font-black leading-tight mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
        Empowering our<br />educators.
      </h2>
      <p className="text-emerald-100 text-sm leading-relaxed max-w-xs">
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
    const fetchData = async () => {
      try {
        // TODO: Replace with new backend API
        // const res = await fetch("http://127.0.0.1:8000/students/schools/");
        // if (res.ok) setSchools(await res.json());

        // MOCK DATA:
        await new Promise(resolve => setTimeout(resolve, 500));
        setSchools([
          { id: 1, name: "Springfield Elementary", school_code: "SPR-001" },
          { id: 2, name: "Westside High School", school_code: "WHS-002" },
        ]);
      } catch (err) {
        console.error("Failed to load schools", err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedSchoolCode) {
      setError("Please choose your school");
      return;
    }

    setLoading(true);

    try {
      // TODO: Replace with new backend API
      /*
      const response = await fetch("http://127.0.0.1:8000/accounts/login/", { ... });
      const data = await response.json();
      */

      // MOCK DATA:
      await new Promise(resolve => setTimeout(resolve, 800));
      const data = {
        success: true,
        access: "mock_access_token",
        refresh: "mock_refresh_token",
        user_id: 1,
        username: "Demo Teacher",
        role: "teacher"
      };

      if (email && password) {
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        localStorage.setItem("user", JSON.stringify({
          user_id: data.user_id,
          username: data.username,
          role: data.role
        }));

        alert(`✅ Login successful! Welcome ${data.username}`);

        // Redirect لـ Teacher Dashboard
        navigate("/teacher/dashboard");
      } else {
        setError((data as any).message || "Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      setError("Cannot connect to server. Make sure Django is running.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col justify-between min-h-screen bg-white p-10 lg:p-16">
      <div className="lg:hidden flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center">
          <span className="text-white font-black text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>G</span>
        </div>
        <span className="font-black text-xl text-emerald-700" style={{ fontFamily: "'Playfair Display', serif" }}>GROW</span>
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            Welcome, Educator
          </h1>
          <p className="text-slate-400 text-sm font-semibold" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Ready to lead and inspire today?
          </p>
        </div>

        <AuthTabs currentRole="teacher" onRoleChange={(r) => navigate(`/login/${r}`)} />

        {/* School Selector */}
        <div className="mb-4">
          <label className="block text-slate-700 font-extrabold text-sm mb-2" style={{ fontFamily: "'Nunito', sans-serif" }}>
            School Selector
          </label>
          <select
            value={selectedSchoolCode}
            onChange={(e) => setSelectedSchoolCode(e.target.value)}
            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
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
            Username
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
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
              className="w-full px-4 py-3.5 pr-12 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            />
            <button
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPass ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              )}
            </button>
          </div>
        </div>

        <div className="flex justify-end mb-4">
          <button type="button" onClick={() => navigate('/forgot-password')} className="text-emerald-600 font-black text-sm hover:text-emerald-800 transition-colors" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Forget password?
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-semibold">
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-4 rounded-2xl font-black text-white text-base transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            fontFamily: "'Nunito', sans-serif",
            background: "linear-gradient(135deg, #047857 0%, #059669 100%)",
            boxShadow: "0 8px 32px rgba(4,120,87,0.35)",
          }}
        >
          {loading ? "Logging in..." : "Log In"}
        </button>

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
        {/* </div> */}

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
    <div className="min-h-screen grid lg:grid-cols-[45%_55%]" style={{ fontFamily: "'Nunito', sans-serif" }}>
      <LeftPanel />
      <LoginForm />
    </div>
  );
};

export default LoginTeacher;
