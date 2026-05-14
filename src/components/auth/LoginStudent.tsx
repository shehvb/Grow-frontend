import { type FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Alone from "../../assets/ALONE 1.png";
import AuthTabs from "./AuthTabs";
import { useAuthStore } from "../../store/authStore";
import { authApi } from "../../services/authApi";
import toast from "react-hot-toast";
import { IoIosEyeOff ,IoIosEye } from "react-icons/io";

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

    if (!studentId.trim() || !password) {
      setError("Please enter your Student ID (email) and password");
      return;
    }

    setLoading(true);

    try {
      const login = useAuthStore.getState().login;
      // Note: The backend schema expects "email" and "password".
      await login({ email: studentId, password });

      const user = useAuthStore.getState().user;

      if (user?.role !== 'student') {
        setError("This account is not registered as a Student. Please use the correct login portal.");
        useAuthStore.getState().logout();
        return;
      }

      toast.success(`Welcome back, ${user?.first_name || user?.username || 'Student'}!`);
      navigate("/student/dashboard");
    } catch (err: any) {
      console.error(err);
      const msg = err.response?.data?.detail || err.response?.data?.message || "Invalid credentials or cannot connect to server.";
      setError(msg);
      toast.error(msg);
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

      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        {/* Heading */}
        <div className="mb-8">
          {/* <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-full px-4 py-1.5 mb-4"> */}
            {/* <span className="text-blue-600 font-black text-xs" style={{ fontFamily: "'Nunito', sans-serif" }}>Student Portal</span> */}
          {/* </div> */}
          <h1 className="text-3xl font-black text-slate-900 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            Welcome Back!
          </h1>
          <p className="text-slate-400 text-sm font-semibold" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Ready to continue your learning adventure?
          </p>
        </div>

        {/* Role selector */}
        <AuthTabs currentRole="student" onRoleChange={(r) => navigate(`/login/${r}`)} />

        <form onSubmit={handleSubmit}>
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
              <option value="">Select your school</option>
              {schools.map((s) => (
                <option key={s.id} value={s.school_code}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Student ID */}
          <div className="mb-4">
            <label className="block text-slate-700 font-extrabold text-sm mb-2" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Email
            </label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="block text-slate-700 font-extrabold text-sm mb-2" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Password
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

          {/* Forgot password */}
          <div className="flex justify-end mb-6">
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-blue-600 font-extrabold text-sm hover:text-blue-800 transition-colors"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              Forget password?
            </button>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-semibold">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl font-black text-white text-base transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
            style={{
              fontFamily: "'Nunito', sans-serif",
              background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
              boxShadow: "0 8px 32px rgba(37,99,235,0.35)",
            }}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-center text-slate-500 text-sm" style={{ fontFamily: "'Nunito', sans-serif" }}>
          Don't have an account?{" "}
          <button type="button" onClick={() => navigate('/signup/student')} className="text-blue-600 font-black hover:text-blue-800 transition-colors">
            Sign Up
          </button>
        </p>
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

const LoginStudent: FC = () => {
  return (
    <div className="min-h-screen grid lg:grid-cols-[45%_55%]">
      <StudentLeftPanel />
      <StudentLoginForm />
    </div>
  );
};

export default LoginStudent;
