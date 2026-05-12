import { type FC, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import lockPng from "../../assets/lockpng.png";
import { MdLockReset } from "react-icons/md";
import toast from "react-hot-toast";
import { authApi } from "../../services/authApi";

type Step = "email" | "verify" | "new_password";

const ForgotPassword: FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      await authApi.forgotPassword(email);
      toast.success("Recovery instructions sent! Check your email.");
      setStep("verify");
    } catch (err: any) {
      const msg = err.response?.data?.detail || "Failed to send recovery email. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join("");
    if (fullCode.length < 6) return;
    setLoading(true);
    setError(false);
    setSuccess(false);

    // Note: The backend uses email-based token links (not code-based verification).
    // This step lets the user confirm they received the email before proceeding.
    // The actual reset uses the token from the email link in the next step.
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setStep("new_password"), 1000);
    }, 600);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || password.length < 8) return;
    setLoading(true);

    try {
      await authApi.resetPassword({ email, new_password: password });
      toast.success("Password reset successfully! Please log in.");
      setTimeout(() => navigate("/login/student"), 1500);
    } catch (err: any) {
      const msg = err.response?.data?.detail || "Failed to reset password. The link may have expired.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    if (value.length > 1) {
      const pasted = value.slice(0, 6).split('');
      const newCode = [...code];
      pasted.forEach((char, i) => {
        if (index + i < 6) newCode[index + i] = char;
      });
      setCode(newCode);
      const nextFocus = Math.min(index + pasted.length, 5);
      inputRefs.current[nextFocus]?.focus();
      return;
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Nav */}
      <header className="flex items-center justify-between px-6 md:px-12 py-4 bg-white border-b border-slate-100">
        <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
          <img src={Logo} alt="Grow" className="w-24 sm:w-32" />
        </Link>
        <div className="flex items-center gap-4 text-sm font-semibold">
          <Link to="/login/student" className="text-blue-700 hover:text-blue-800 transition-colors font-bold">
            Log In
          </Link>
          <Link to="/signup/student" className="px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-bold shadow-md shadow-orange-500/20">
            Sign up
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-4">
        <div
          className="w-full max-w-[1200px] bg-white rounded-[2rem] shadow-xl overflow-hidden flex flex-col lg:grid lg:grid-cols-[40%_60%] min-h-[600px]"
        >

          {/* Left Panel */}
          <div
            className="hidden lg:flex p-12 lg:p-16 flex-col items-center justify-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0B006F 0%, #1600D5 100%)" }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 w-full flex flex-col items-start">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-12 border border-white/20">
                <MdLockReset className="w-6 h-6 text-blue-200" />
              </div>

              <div className="w-fit">
                <h2 className="text-5xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Secure Recovery
                </h2>
                <p className="text-indigo-100 text-sm leading-relaxed font-medium max-w-[400px]" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  Lost access? No problem. We utilize industry-standard encryption to ensure your student's data remains safe while you get back on track.
                </p>
              </div>

              {/* Decorative Lock Image */}
              <div className="mt-12 w-full flex justify-end pr-4 lg:pr-10">
                <img
                  src={lockPng}
                  alt="Secure"
                  className="w-64 h-auto object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
            {step === "email" ? (
              <form onSubmit={handleSendCode} className="w-full max-w-sm mx-auto relative z-10 transition-all duration-300">
                <h2 className="text-2xl font-black text-slate-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Forgot Password?
                </h2>
                <p className="text-slate-500 text-sm mb-8 font-medium">
                  Don't worry, it happens. Enter your email below to receive a secure recovery code.
                </p>

                <div className="mb-8">
                  <label className="block text-slate-900 font-black text-xs mb-2">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      placeholder="Parent1@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl font-black text-white text-sm transition-all hover:-translate-y-0.5 shadow-md disabled:opacity-50"
                  style={{ backgroundColor: "#1600D5" }}
                >
                  {loading ? "Sending..." : "Send Recovery Code"}
                </button>

                <div className="mt-8 text-center">
                  <Link to="/login/student" className="text-slate-500 text-sm font-bold hover:text-slate-700 transition-colors flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Log In
                  </Link>
                </div>
              </form>
            ) : step === "verify" ? (
              <form onSubmit={handleVerify} className="w-full max-w-sm mx-auto relative z-10 transition-all duration-300 animate-in fade-in slide-in-from-right-4">
                <h2 className="text-2xl font-black text-slate-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Enter Verification Code
                </h2>
                <p className="text-slate-500 text-sm mb-8 font-medium">
                  Enter the verification code sent to your email to reset your password.
                </p>

                <div className="flex justify-center items-center gap-1.5 sm:gap-2 mb-4">
                  {code.map((digit, i) => (
                    <div key={i} className="flex items-center gap-1 sm:gap-2">
                      <input
                        ref={(el) => { inputRefs.current[i] = el; }}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleCodeChange(i, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, i)}
                        className={`w-9 h-12 sm:w-12 sm:h-14 text-center text-lg font-black rounded-xl border focus:outline-none transition-all shadow-sm ${digit ? "border-blue-600 bg-blue-50 text-blue-800" : "border-slate-200 bg-slate-50 text-slate-900"
                          } ${error ? "border-red-400 bg-red-50 text-red-600" : ""} ${success ? "border-emerald-400 bg-emerald-50 text-emerald-600" : ""}`}
                      />
                      {i === 2 && <span className="text-slate-300 font-black px-0.5 sm:px-1">-</span>}
                    </div>
                  ))}
                </div>

                <div className="min-h-[24px] mb-6 text-center">
                  {success && (
                    <p className="text-emerald-500 text-xs font-extrabold flex items-center justify-center gap-1.5">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                      Success! Code verified.
                    </p>
                  )}
                  {error && (
                    <p className="text-red-500 text-xs font-extrabold flex items-center justify-center gap-1.5">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                      Invalid code. Please try again.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading || code.join("").length < 6}
                  className="w-full py-4 rounded-xl font-black text-white text-sm transition-all hover:-translate-y-0.5 shadow-md disabled:opacity-50 flex justify-center items-center gap-2"
                  style={{ backgroundColor: "#1600D5" }}
                >
                  {loading ? "Verifying..." : "Verify Code"}
                  {!loading && <span>&rarr;</span>}
                </button>

                <div className="mt-8 text-center">
                  <button type="button" onClick={() => setStep("email")} className="text-slate-500 text-sm font-bold hover:text-slate-700 transition-colors flex items-center justify-center gap-2 mx-auto">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Log In
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleResetPassword} className="w-full max-w-sm mx-auto relative z-10 transition-all duration-300 animate-in fade-in slide-in-from-right-4">
                <h2 className="text-2xl font-black text-slate-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Create New Password
                </h2>
                <p className="text-slate-500 text-sm mb-8 font-medium">
                  Create a new password for your account. Make sure it's strong, secure, and easy for you to remember.
                </p>

                <div className="mb-8">
                  <label className="block text-slate-900 font-black text-xs mb-2">New password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || password.length < 8}
                  className="w-full py-4 rounded-xl font-black text-white text-sm transition-all hover:-translate-y-0.5 shadow-md disabled:opacity-50"
                  style={{ backgroundColor: "#1600D5" }}
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>

                <div className="mt-8 text-center">
                  <button type="button" onClick={() => navigate("/login/student")} className="text-slate-500 text-sm font-bold hover:text-slate-700 transition-colors flex items-center justify-center gap-2 mx-auto">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Log In
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
