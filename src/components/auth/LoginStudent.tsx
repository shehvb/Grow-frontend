import { type FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Alone from "../../assets/ALONE 1.png";
import AuthTabs from "./AuthTabs";

interface School {
  id: number;
  name: string;
  school_code: string;
}


// ─── Floating XP / achievement badges for the student panel ──────────────────
const Badge: FC<{ emoji: string; text: string; className?: string; delay?: string }> = ({
  emoji, text, className = "", delay = "0s",
}) => (
  <div
    className={`absolute flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl px-3.5 py-2 text-white text-xs font-black shadow-lg ${className}`}
    style={{ animation: `floatBob 3s ease-in-out ${delay} infinite`, fontFamily: "'Nunito', sans-serif" }}
  >
    <span className="text-base">{emoji}</span>
    {text}
  </div>
);

// ─── Left Panel (student theme — vibrant, energetic) ─────────────────────────
const StudentLeftPanel: FC = () => (
  <div
    className="relative hidden h-screen lg:flex flex-col justify-between p-12 overflow-hidden"
    style={{
      background: "linear-gradient(135deg, rgb(15, 27, 107) 0%, rgb(26, 47, 160) 40%, rgb(45, 27, 138) 70%, rgb(76, 29, 149) 100%)",
    }}
  >
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Playfair+Display:wght@700;800;900&display=swap');
      @keyframes floatBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      @keyframes spinSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      @keyframes pop { 0%{transform:scale(0.8);opacity:0} 100%{transform:scale(1);opacity:1} }
      @keyframes progressFill { from{width:0} to{width:var(--w)} }
      .pop { animation: pop .5s cubic-bezier(.34,1.56,.64,1) both; }
      .pop1 { animation-delay:.1s; }
      .pop2 { animation-delay:.25s; }
      .pop3 { animation-delay:.4s; }
      .pop4 { animation-delay:.55s; }
      .spin-slow { animation: spinSlow 20s linear infinite; }
    `}</style>

    {/* Decorative ring */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-white/10 spin-slow pointer-events-none" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-white/8 spin-slow pointer-events-none" style={{ animationDirection: "reverse" }} />

    {/* Glow blobs */}
    <div className="absolute top-20 right-10 w-56 h-56 bg-pink-400/20 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute bottom-28 left-6 w-48 h-48 bg-blue-300/20 rounded-full blur-3xl pointer-events-none" />

    {/* Floating achievement badges */}
    <Badge emoji="🏆" text="+45 XP Today!" className="top-24 right-8 pop pop1" delay="0s" />
    <Badge emoji="🔥" text="7 Day Streak!" className="top-44 left-4 pop pop2" delay="0.3s" />
    <Badge emoji="⭐" text="Math Master" className="bottom-56 right-6 pop pop3" delay="0.6s" />
    {/* <Badge emoji="📈" text="Top 10% Class" className="bottom-40 left-2 pop pop4" delay="0.9s" /> */}

    {/* Logo */}
    <div className="flex items-center gap-3 relative z-10">
      <div className="w-16 h-16 rounded-xl bg-white/60  border border-white/10 flex items-center justify-center shadow-lg">
        <img src={Alone} alt="" className="" />
      </div>
      <span className="text-white font-black text-2xl tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>GROW</span>
    </div>

    {/* Center: Student dashboard preview card */}
    <div className="flex-1 flex items-center justify-center py-6 relative z-10">
      <div className="w-full max-w-xs bg-white/12 backdrop-blur-md border border-white/20 rounded-3xl p-5 shadow-2xl">
        {/* Card header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center font-black text-white text-lg">
            S
          </div>
          <div>
            <p className="text-white font-black text-sm">Sarah Ahmed</p>
            <p className="text-white/60 text-xs font-semibold">Grade 9 · All Subjects</p>
          </div>
          <div className="ml-auto bg-emerald-400/20 border border-emerald-400/30 rounded-full px-2.5 py-0.5">
            <span className="text-emerald-300 text-xs font-black">Level 12 🌟</span>
          </div>
        </div>

        {/* XP bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs font-black text-white/70 mb-1.5">
            <span>XP Progress</span><span>2,340 / 3,000</span>
          </div>
          <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-400" style={{ width: "78%" }} />
          </div>
        </div>

        {/* Subject mini-stats */}
        {[
          { label: "Mathematics", pct: 92, color: "from-blue-400 to-cyan-400" },
          { label: "Science", pct: 78, color: "from-purple-400 to-pink-400" },
          { label: "English", pct: 85, color: "from-emerald-400 to-teal-400" },
        ].map((s) => (
          <div key={s.label} className="mb-3">
            <div className="flex justify-between text-xs font-bold text-white/60 mb-1">
              <span>{s.label}</span><span>{s.pct}%</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className={`h-full rounded-full bg-gradient-to-r ${s.color}`} style={{ width: `${s.pct}%` }} />
            </div>
          </div>
        ))}

        {/* Badges row */}
        <div className="flex gap-2 mt-4">
          {["🧪", "📚", "🎯", "💡"].map((e, i) => (
            <div key={i} className="w-9 h-9 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-base">
              {e}
            </div>
          ))}
          <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-xs font-black text-white/60">
            +8
          </div>
        </div>
      </div>
    </div>

    {/* Bottom text */}
    <div className="relative z-10">
      <h2 className="text-white text-3xl font-black leading-tight mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
        Learn. Earn. Grow.<br />Every Single Day.
      </h2>
      <p className="text-blue-200 text-sm leading-relaxed max-w-xs">
        Complete challenges, earn XP, and track your progress. Your AI tutor is always here to help you level up.
      </p>
    </div>
  </div>
);

// ─── Right Panel — Student Login Form ────────────────────────────────────────
const StudentLoginForm: FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [studentId, setStudentId] = useState("");
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
    setError("");

    if (!selectedSchoolCode) {
      setError("Please choose your school");
      return;
    }

    if (!studentId.trim() || !password) {

      setError("Please enter Student ID and password");
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
        access: "mock_student_token",
        refresh: "mock_student_refresh",
        user_id: 2,
        username: studentId || "Demo Student",
        role: "student"
      };

      if (studentId && password) {
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        localStorage.setItem("user", JSON.stringify({
          user_id: data.user_id,
          username: data.username,
          role: data.role
        }));

        alert(`✅ Login successful! Welcome ${data.username}`);

        // Redirect لـ Student Dashboard
        navigate("/student/dashboard");
      } else {
        setError(data.message || "Invalid Student ID or password");
      }
    } catch (error) {
      console.error(error);
      setError("Cannot connect to server. Make sure Django is running on port 8000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-screen bg-white p-10 lg:p-16 h-screen">
      {/* Mobile logo */}
      <div className="lg:hidden flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
          <span className="text-white font-black text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>G</span>
        </div>
        <span className="font-black text-xl text-blue-700" style={{ fontFamily: "'Playfair Display', serif" }}>GROW</span>
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full ">
        {/* Heading */}
        <div className="mb-8">
          {/* Level badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-full px-4 py-1.5 mb-4">
            <span className="text-base">🎮</span>
            <span className="text-blue-600 font-black text-xs" style={{ fontFamily: "'Nunito', sans-serif" }}>Student Portal</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            Welcome Back!
          </h1>
          <p className="text-slate-400 text-sm font-semibold" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Ready to continue your learning adventure? 🚀
          </p>
        </div>

        {/* Role selector */}
        <AuthTabs currentRole="student" onRoleChange={(r) => navigate(`/login/${r}`)} />

        {/* School Selector */}
        <div className="mb-4">
          <label className="block text-slate-700 font-extrabold text-sm mb-2" style={{ fontFamily: "'Nunito', sans-serif" }}>
            School Selector
          </label>
          <select
            value={selectedSchoolCode}
            onChange={(e) => setSelectedSchoolCode(e.target.value)}
            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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

        {/* Username */}
        <div className="mb-4">
          <label className="block text-slate-700 font-extrabold text-sm mb-2" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Username
          </label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Enter your Code"
            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          />
        </div>

        {/* Email */}


        {/* <div className="mb-4">
          <label className="block text-slate-700 font-black text-sm mb-2" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          />
        </div> */}

        {/* Password */}


        <div className="mb-2">
          <label className="block text-slate-700 font-extrabold text-sm mb-2" style={{ fontFamily: "'Nunito', sans-serif" }}>
            password
          </label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3.5 pr-12 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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

        {/* Forgot */}
        <div className="flex justify-end mb-4">
          <button type="button" onClick={() => navigate('/forgot-password')} className="text-blue-600 font-black text-sm hover:text-blue-800 transition-colors" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Forget password?
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-semibold">
            {error}
          </div>
        )}

        {/* Submit — student gradient */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-4 rounded-2xl font-black text-white text-base transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            fontFamily: "'Nunito', sans-serif",
            background: "linear-gradient(135deg, rgb(15, 27, 107) 0%, rgb(26, 47, 160) 40%, rgb(45, 27, 138) 70%, rgb(76, 29, 149) 100%)",
            boxShadow: "0 8px 32px rgba(26, 47, 160, 0.4)",
          }}
        >
          {loading ? "Logging in..." : "Log In 🚀"}
        </button>

        {/* Divider */}
        {/* OAuth */}
        {/* <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-slate-400 text-xs font-bold" style={{ fontFamily: "'Nunito', sans-serif" }}>Or continue with</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          <button className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border-2 border-slate-200 bg-white font-black text-slate-700 text-sm hover:border-blue-300 hover:bg-slate-50 transition-all" style={{ fontFamily: "'Nunito', sans-serif" }}>
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google
          </button>
          <button className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border-2 border-slate-200 bg-white font-black text-slate-700 text-sm hover:border-blue-300 hover:bg-slate-50 transition-all" style={{ fontFamily: "'Nunito', sans-serif" }}>
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook
          </button> */}
        {/* </div> */}
        {/* 
        <p className="text-center text-slate-500 text-sm" style={{ fontFamily: "'Nunito', sans-serif" }}>
          Don't have an account?{" "}
          <button type="button" onClick={() => navigate('/signup/student')} className="text-blue-600 font-black hover:text-blue-800 transition-colors">Sign Up</button>
        </p> */}
      </div>

      {/* Footer */}
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

// ─── Page ─────────────────────────────────────────────────────────────────────
const LoginStudent: FC = () => {
  return (
    <div className="min-h-screen grid lg:grid-cols-[45%_55%]" style={{ fontFamily: "'Nunito', sans-serif" }}>
      <StudentLeftPanel />
      <StudentLoginForm />
    </div>
  );
};

export default LoginStudent;
