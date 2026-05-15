import { type FC, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Alone from "../../assets/ALONE 1.png";
import AuthTabs from "./AuthTabs";
import { useAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";


// ─── Logo SVG (matches uploaded logo: dark-blue G + arrows) ──────────────────
const GrowLogo: FC = () => (
  <Link to="/" className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity w-fit z-10 relative">
    <div className="w-16 h-16 rounded-xl bg-white/60 border border-white/10 flex items-center justify-center shadow-lg">
      <img src={Alone} alt="" />
    </div>
    <span
      className="text-white font-black text-2xl tracking-wide"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      GROW
    </span>
  </Link>
);

// ─── Left Panel (Mock UI component) ──────────────────────────────────────────
const LeftPanel: FC = () => (
  <div
    className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden"
    style={{
      background: "linear-gradient(135deg, #1e3a8a 0%, #312e81 40%, #4338ca 70%, #6366f1 100%)",
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
        [15, 20], [25, 45], [75, 15], [85, 60], [45, 80], [65, 90], [10, 70], [90, 40],
      ].map(([x, y], i) => (
        <div
          key={i}
          className="star absolute w-1.5 h-1.5 rounded-full bg-blue-300/60"
          style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.4}s` }}
        />
      ))}
    </div>

    <div className="absolute bottom-32 right-8 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute top-20 left-8 w-48 h-48 bg-purple-400/10 rounded-full blur-3xl pointer-events-none" />

    <GrowLogo />

    <div className="flex-1 flex items-center justify-center py-8">
      <svg viewBox="0 0 320 260" className="w-full max-w-xs drop-shadow-2xl" fill="none">
        {[200, 160, 120, 80].map((y, i) => (
          <line key={i} x1="20" y1={y} x2="300" y2={y} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        ))}
        <line x1="20" y1="210" x2="300" y2="210" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />

        {[
          { x: 30, h: 40, colors: ["#60a5fa", "#93c5fd"] },
          { x: 65, h: 70, colors: ["#60a5fa", "#93c5fd"] },
          { x: 100, h: 90, colors: ["#3b82f6", "#60a5fa"] },
          { x: 135, h: 115, colors: ["#2563eb", "#3b82f6"] },
          { x: 170, h: 140, colors: ["#2563eb", "#3b82f6"] },
          { x: 205, h: 165, colors: ["#1d4ed8", "#2563eb"] },
          { x: 240, h: 195, colors: ["#1e40af", "#1d4ed8"] },
        ].map((b, i) => (
          <g key={i}>
            <defs>
              <linearGradient id={`bg${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={b.colors[1]} stopOpacity="0.9" />
                <stop offset="100%" stopColor={b.colors[0]} stopOpacity="0.5" />
              </linearGradient>
            </defs>
            <rect
              className={`bar bar${i + 1}`}
              x={b.x}
              y={210 - b.h}
              width="28"
              height={b.h}
              rx="4"
              fill={`url(#bg${i})`}
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
            />
          </g>
        ))}

        <path
          className="arrow-path"
          d="M31 200 Q102 182 162 142 Q222 105 274 55"
          stroke="#bfdbfe"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M265 52 L278 52 L275 65"
          stroke="#bfdbfe"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M30 205 Q130 185 240 130 Q265 118 278 105"
          stroke="rgba(191,219,254,0.5)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="6 4"
          fill="none"
        />
      </svg>
    </div>

    <div>
      <h2
        className="text-white text-3xl font-black leading-tight mb-3"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Track your child's<br />success.
      </h2>
      <p className="text-blue-100 text-sm leading-relaxed max-w-xs">
        Monitor academic performance, attendance, and behavioral growth in one unified dashboard.
      </p>
    </div>
  </div>
);

// ─── Right Panel — Login Form ─────────────────────────────────────────────────
const LoginForm: FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<'google' | 'facebook' | null>(null);


  const handleOAuthLogin = async (provider: 'google' | 'facebook') => {
    setOauthLoading(provider);
    try {
      // Note: In a full implementation, the SDK (Google Identity Services / Facebook SDK)
      // is called here to get an access_token from the social provider, then we exchange
      // it with our backend.
      toast.error(`${provider === 'google' ? 'Google' : 'Facebook'} login requires SDK setup. Please use email/password.`);
    } catch (err: any) {
      const msg = err.response?.data?.detail || `${provider} login failed. Please try again.`;
      toast.error(msg);
    } finally {
      setOauthLoading(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const login = useAuthStore.getState().login;
      await login({ email, password });

      const user = useAuthStore.getState().user;

      if (user?.role !== 'parent') {
        setError("This account is not registered as a Parent. Please use the correct login portal.");
        useAuthStore.getState().logout();
        return;
      }

      toast.success("Welcome back!");
      navigate("/parent/dashboard");
    } catch (error: any) {
      console.error(error);
      const msg = error.response?.data?.detail || "Invalid email or password";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-screen bg-white p-10 lg:p-16">
      {/* Top spacer / mobile logo */}
      <Link to="/" className="lg:hidden flex items-center gap-3 mb-8 cursor-pointer hover:opacity-90 transition-opacity">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
          <span className="text-white font-black text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>G</span>
        </div>
        <span className="font-black text-xl text-blue-700" style={{ fontFamily: "'Playfair Display', serif" }}>GROW</span>
      </Link>

      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        {/* Heading */}
        <div className="mb-8">
          <h1
            className="text-3xl font-black text-slate-900 mb-1"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Welcome Back
          </h1>
          <p className="text-slate-400 text-sm font-semibold" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Continue your learning journey.
          </p>
        </div>

        {/* Role selector */}
        <AuthTabs currentRole="parent" onRoleChange={(r) => navigate(`/login/${r}`)} />

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
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
          </div>

          {/* Password */}
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

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl font-black text-white text-base transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              fontFamily: "'Nunito', sans-serif",
              background: "linear-gradient(135deg, #1a2fa0 0%, #2d1b8a 100%)",
              boxShadow: "0 8px 32px rgba(26,47,160,0.35)",
            }}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-slate-400 text-xs font-bold" style={{ fontFamily: "'Nunito', sans-serif" }}>Or continue with</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* OAuth buttons */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <button
            onClick={() => handleOAuthLogin('google')}
            disabled={oauthLoading !== null}
            className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border-2 border-slate-200 bg-white font-black text-slate-700 text-sm hover:border-blue-300 hover:bg-slate-50 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            {oauthLoading === 'google' ? (
              <div className="w-5 h-5 border-2 border-slate-300 border-t-blue-500 rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            )}
            Google
          </button>
          <button
            onClick={() => handleOAuthLogin('facebook')}
            disabled={oauthLoading !== null}
            className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border-2 border-slate-200 bg-white font-black text-slate-700 text-sm hover:border-blue-300 hover:bg-slate-50 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            {oauthLoading === 'facebook' ? (
              <div className="w-5 h-5 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            )}
            Facebook
          </button>
        </div>

        {/* Sign up link */}
        <p className="text-center text-slate-500 text-sm" style={{ fontFamily: "'Nunito', sans-serif" }}>
          Don't have an account?{" "}
          <button type="button" onClick={() => navigate('/signup/parent')} className="text-blue-600 font-black hover:text-blue-800 transition-colors">
            Sign Up
          </button>
        </p>
      </div>

      {/* Footer links */}
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

const LoginParent: FC = () => {
  return (
    <div className="min-h-screen grid lg:grid-cols-[45%_55%]" style={{ fontFamily: "'Nunito', sans-serif" }}>
      <LeftPanel />
      <LoginForm />
    </div>
  );
};

export default LoginParent;
