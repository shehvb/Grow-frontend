import { type FC, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoIosEyeOff, IoIosEye } from "react-icons/io";
import { FiShield } from "react-icons/fi";
import { useAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";

// Use the imported logo image if available, else a placeholder
import Alone from "../../assets/ALONE 1.png";

const GrowLogo: FC = () => (
  <Link to="/" className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity w-fit z-10 relative">
    <div className="w-10 h-10 rounded bg-white flex items-center justify-center">
      <img src={Alone} alt="Grow Logo" className="w-8 h-8 object-contain" />
    </div>
    <span className="text-[#1600D5] font-black text-2xl tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
      Grow
    </span>
  </Link>
);

const LoginAdmin: FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedUsername = username.trim();

    if (!trimmedUsername || !password) {
      toast.error("Please enter your username and password");
      return;
    }

    // Username regex: Alphanumeric and underscores, dots, dashes, plus, or @, 3 to 150 characters
    const usernameRegex = /^[\w.@+-]{3,150}$/;
    if (!usernameRegex.test(trimmedUsername)) {
      toast.error("Username must be 3-150 characters long and can only contain letters, numbers, underscores, dots, dashes, plus, or @ signs.");
      return;
    }

    setLoading(true);

    try {
      const login = useAuthStore.getState().login;
      await login({ username: trimmedUsername, password, role: 'school_admin' });

      const user = useAuthStore.getState().user;

      if (user?.role !== 'school_admin') {
        toast.error("This account is not authorized as a School Admin.");
        useAuthStore.getState().logout();
        return;
      }

      toast.success(`Welcome back, Admin!`);
      navigate("/admin");
    } catch (err: unknown) {
      console.error(err);
      const error = err as { response?: { data?: { detail?: string } } };
      const msg = error.response?.data?.detail || "Invalid credentials or cannot connect to server.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#e5e7eb]" style={{ fontFamily: "'Inter', 'Nunito', sans-serif" }}>
      {/* Top Navbar */}
      <div className="w-full bg-white h-16 flex items-center px-8 shadow-sm">
        <GrowLogo />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="bg-white w-full max-w-lg rounded-2xl p-10 border-2 border-[#4b8eff] shadow-lg">
          <h1 className="text-3xl font-bold text-black mb-2">School Admin Login</h1>
          <p className="text-gray-500 text-sm mb-8">
            Access your school management dashboard securely.
          </p>

          {/* Banner */}
          <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-xl p-4 flex items-center gap-4 mb-8">
            <FiShield className="text-[#3b82f6] w-6 h-6" />
            <div className="flex flex-col">
              <span className="text-black font-bold text-sm">Secure Admin Access</span>
              <span className="text-[#2563eb] text-xs">All login attempts are monitored and logged</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-black font-bold text-sm mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-4 py-3.5 rounded-lg border-none bg-[#f3f4f6] text-black placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] transition-all"
              />
            </div>

            <div>
              <label className="block text-black font-bold text-sm mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3.5 pr-12 rounded-lg border-none bg-[#f3f4f6] text-black placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPass ? <IoIosEyeOff className="w-5 h-5" /> : <IoIosEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#3b82f6] focus:ring-[#3b82f6]"
                />
                <span className="text-black text-sm font-medium">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-[#2563eb] text-sm font-bold hover:underline">
                Forget password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-4 rounded-lg font-bold text-white text-base transition-all bg-[#3b82f6] hover:bg-[#2563eb] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging In..." : "Log In"}
            </button>
          </form>

          <div className="mt-8 border-t border-gray-200 pt-6 flex items-center justify-center gap-2 text-gray-500">
            <FiShield className="w-4 h-4" />
            <span className="text-sm font-medium">Authorized school administrators only.</span>
          </div>
        </div>

        <div className="mt-8 text-black font-medium text-sm">
          Need help accessing your account?{" "}
          <Link to="/support" className="text-[#2563eb] font-bold hover:underline">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
