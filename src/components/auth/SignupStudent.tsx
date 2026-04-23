import { type FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupLayout from "./SignupLayout";

const SignupStudent: FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return alert("Please agree to the Terms of Services");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/student/dashboard"); // placeholder for backend
    }, 800);
  };

  return (
    <SignupLayout loginPath="/login/student">
      <h1 className="text-4xl font-black text-slate-900 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
        Create your<br />account
      </h1>
      <p className="text-slate-500 text-sm mb-10 font-medium">
        Join GROW today to unlock AI-powered learning tools and track your progress.
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
           <label className="block text-slate-900 font-black text-xs mb-2">Student ID</label>
          <input
            type="text"
            placeholder="e.g. STU-2024-0042"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
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
        <span className="text-slate-400 text-[10px] tracking-wider font-extrabold uppercase">OR REGISTER WITH STUDENT ID</span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      <div className="flex gap-4">
        <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 font-black text-slate-700 text-xs hover:bg-slate-50 transition-colors">
          School Portal
        </button>
      </div>
    </SignupLayout>
  );
};

export default SignupStudent;
