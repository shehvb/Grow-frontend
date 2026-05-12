import { type FC, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SignupLayout from "./SignupLayout";
import { useAuthStore } from "../../store/authStore";
import { FaGraduationCap } from "react-icons/fa";
import { RiParentFill } from "react-icons/ri";
import { FaUserTie } from "react-icons/fa";

type AuthRole = "student" | "parent" | "teacher";

const Signup: FC = () => {
  const navigate = useNavigate();
  const { role } = useParams<{ role: string }>();
  
  // Ensure the role is valid, default to student
  const currentRole: AuthRole = ["student", "parent", "teacher"].includes(role || "") 
    ? (role as AuthRole) 
    : "student";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [schoolCode, setSchoolCode] = useState("");
  const [signupCode, setSignupCode] = useState("");

  const handleRoleChange = (newRole: AuthRole) => {
    navigate(`/signup/${newRole}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (!agreed) return alert("Please agree to the Term of Services");
    setLoading(true);

    try {
      const authStore = useAuthStore.getState();
      const names = fullName.trim().split(" ");
      const firstName = names[0] || fullName;
      const lastName = names.slice(1).join(" ") || "User";
      
      // The API only accepts lowercase alphanumeric and @/./+/-/_
      // We create a valid username from the email
      const safeUsername = email.split('@')[0].replace(/[^a-zA-Z0-9@.+-_]/g, '') || `user_${Date.now()}`;

      // 1. Register with strict API schema fields
      await authStore.register({
        username: safeUsername,
        email: email,
        password: password,
        role: currentRole,
      });

      // 2. Auto-login to get tokens
      await authStore.login({
        email: email,
        password: password
      });

      // 3. Update profile to set the Full Name
      await authStore.updateUserProfile({
        first_name: firstName,
        last_name: lastName
      });

      // 4. Use Enrollment Code if provided (for Students/Teachers)
      if (signupCode) {
        try {
          const { authApi } = await import("../../services/authApi");
          await authApi.useEnrollmentCode(signupCode);
        } catch (codeErr) {
          console.error("Failed to apply enrollment code:", codeErr);
          // Non-blocking error, user is still registered
        }
      }

      // 5. Redirect to respective dashboard
      if (currentRole === 'student') {
        navigate("/student/dashboard");
      } else if (currentRole === 'teacher') {
        navigate("/teacher/dashboard");
      } else {
        navigate("/parent/add-student");
      }
    } catch (error: any) {
      console.error(error);
      // alert(error.response?.data?.detail || "❌ Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignupLayout loginPath={`/login/${currentRole}`}>
      <h1 className="text-4xl font-black text-slate-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
        Create your<br />account
      </h1>
      <p className="text-slate-400 text-xs mb-8 font-semibold">
        Join GROW today to unlock AI-<br/>powered learning tools.
      </p>

      {/* Role Selector */}
      <div className="mb-6">
        <label className="block text-slate-900 font-bold text-xs mb-2">
          Select your role
        </label>
        <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100/80 rounded-2xl">
          <button
            type="button"
            onClick={() => handleRoleChange('student')}
            className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-extrabold text-sm transition-all duration-200 ${
              currentRole === 'student'
                ? 'bg-white text-orange-500 shadow-sm'
                : 'text-slate-400 hover:text-slate-600'
            }`}
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            <span className="text-lg"><FaGraduationCap /></span> Student
          </button>
          
          <button
            type="button"
            onClick={() => handleRoleChange('parent')}
            className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-extrabold text-sm transition-all duration-200 ${
              currentRole === 'parent'
                ? 'bg-white text-orange-500 shadow-sm'
                : 'text-slate-400 hover:text-slate-600'
            }`}
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            <span className="text-lg"><RiParentFill /></span> Parent
          </button>
          
          <button
            type="button"
            onClick={() => handleRoleChange('teacher')}
            className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-extrabold text-sm transition-all duration-200 ${
              currentRole === 'teacher'
                ? 'bg-white text-orange-500 shadow-sm'
                : 'text-slate-400 hover:text-slate-600'
            }`}
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            <span className="text-lg"><FaUserTie /></span> Teacher
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* School Selector - Only for Student & Teacher */}
        {(currentRole === 'student' || currentRole === 'teacher') && (
          <div>
            <label className="block text-slate-900 font-extrabold text-xs mb-1.5">School Selector</label>
            <select
              value={schoolCode}
              onChange={(e) => setSchoolCode(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all appearance-none"
              style={{ 
                backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394a3b8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem top 50%',
                backgroundSize: '0.65rem auto'
              }}
            >
              <option value="">Choose your school...</option>
              <option value="SPR-001">Springfield Elementary</option>
              <option value="WHS-002">Westside High School</option>
            </select>
          </div>
        )}

        {/* Full Name */}
        <div>
          <label className="block text-slate-900 font-extrabold text-xs mb-1.5">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
            required
          />
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-slate-900 font-extrabold text-xs mb-1.5">Email address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-slate-900 font-extrabold text-xs mb-1.5">Password</label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all pr-12 placeholder:text-slate-400"
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

        {/* Code - Only for Student & Teacher */}
        {(currentRole === 'student' || currentRole === 'teacher') && (
          <div>
            <label className="block text-slate-900 font-extrabold text-xs mb-1.5">Code</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter your code"
                value={signupCode}
                onChange={(e) => setSignupCode(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all pr-12 placeholder:text-slate-400"
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
        )}

        {/* Terms Checkbox */}
        <div className="flex items-start gap-2.5 mt-2 mb-4">
          <div className="relative flex items-center justify-center mt-0.5">
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="peer w-4 h-4 appearance-none rounded border border-orange-300 checked:bg-white cursor-pointer"
            />
            {agreed && (
              <svg className="w-3 h-3 absolute pointer-events-none text-orange-500" viewBox="0 0 14 14" fill="none">
                <path d="M1 7L5 11L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
            {!agreed && (
               <svg className="w-3 h-3 absolute pointer-events-none text-orange-500" viewBox="0 0 14 14" fill="none">
               <path d="M4 2V1M8 2V1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
             </svg>
            )}
          </div>
          <label htmlFor="terms" className="text-[10px] font-bold text-slate-800 leading-tight cursor-pointer">
            By creating this account , you have agree with{" "}
            <a href="#" className="text-orange-500 hover:underline">Term of Services</a>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 mt-2 rounded-xl font-black text-white text-sm transition-all hover:-translate-y-0.5"
          style={{
            background: "#f97316", // solid orange matching the mockup
            boxShadow: "0 4px 14px rgba(249, 115, 22, 0.25)"
          }}
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-slate-100" />
          <span className="text-slate-400 text-[10px] font-extrabold tracking-wider">OR REGISTER WITH EMAIL</span>
          <div className="flex-1 h-px bg-slate-100" />
        </div>

        <div className="grid grid-cols-2 gap-3 pb-4">
          <button type="button" className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border border-slate-200 bg-white font-black text-slate-700 text-[11px] hover:border-slate-300 transition-all shadow-sm">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google
          </button>
          <button type="button" className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border border-slate-200 bg-white font-black text-slate-700 text-[11px] hover:border-slate-300 transition-all shadow-sm">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook
          </button>
        </div>
      </form>
    </SignupLayout>
  );
};

export default Signup;
