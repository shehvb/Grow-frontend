import { type FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupLayout from "./SignupLayout";

const SignupParent: FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreed) {
      return alert("Please agree to the Terms of Services");
    }

    if (!fullName || !email || !password) {
      return alert("Please fill all fields");
    }

    setLoading(true);

    try {
      // TODO: Replace with new backend API
      /*
      const response = await fetch("http://127.0.0.1:8000/accounts/signup/", { ... });
      const data = await response.json();
      */

      // MOCK DATA:
      await new Promise(resolve => setTimeout(resolve, 800));

      if (email && password && fullName) {
        alert("✅ Account created successfully!");
        navigate("/login/parent");        // بعد التسجيل يروح لصفحة Login Parent
      } else {
        // لو فيه error (مثل email موجود مسبقاً)
        alert("Signup failed. Try again.");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Network error. Make sure Django server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignupLayout loginPath="/login/parent">
      <h1 className="text-4xl font-black text-slate-900 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
        Create your<br />account
      </h1>
      <p className="text-slate-500 text-sm mb-10 font-medium">
        Join GROW today to unlock AI-powered learning tools.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-slate-900 font-black text-xs mb-2">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-slate-900 font-black text-xs mb-2">Email address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-slate-900 font-black text-xs mb-2">Password</label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPass ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              )}
            </button>
          </div>
        </div>

        <div className="flex items-start gap-3 mt-4 mb-6">
          <input
            type="checkbox"
            id="terms"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500 cursor-pointer"
          />
          <label htmlFor="terms" className="text-xs font-bold text-slate-700 leading-snug cursor-pointer">
            By creating this account, you agree with{" "}
            <a href="#" className="text-orange-500 hover:underline">Terms of Services</a>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-xl font-black text-white text-sm transition-all hover:-translate-y-0.5"
          style={{
            background: "linear-gradient(to right, #f97316, #ea580c)",
            boxShadow: "0 4px 14px rgba(234,88,12,0.3)"
          }}
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>
      </form>

      <div className="flex items-center gap-4 my-8">
        <div className="flex-1 h-px bg-slate-200" />
        <span className="text-slate-400 text-[10px] tracking-wider font-extrabold uppercase">OR REGISTER WITH EMAIL</span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      <div className="flex gap-4">
        <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 font-black text-slate-700 text-xs hover:bg-slate-50 transition-colors">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Google
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 font-black text-slate-700 text-xs hover:bg-slate-50 transition-colors">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Facebook
        </button>
      </div>
    </SignupLayout>
  );
};

export default SignupParent;
