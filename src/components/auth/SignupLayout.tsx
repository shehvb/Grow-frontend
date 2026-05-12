import { type FC, type ReactNode } from "react";
import { Link } from "react-router-dom";
// import growLogo from "../../assets/Grow logo.png";
import Logo from "../../assets/Logo.png";
import signup from "../../assets/GROW SIGNUP.png";


interface SignupLayoutProps {
  children: ReactNode;
  loginPath: string;
}

const SignupLayout: FC<SignupLayoutProps> = ({ children, loginPath }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <header className="flex items-center justify-between w-full px-4 sm:px-8 lg:px-12 h-14 sm:h-24 overflow-hidden border-b border-slate-100 relative z-20 bg-white">
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity shrink-0 relative">
          <img src={Logo} alt="Grow" className=" h-10 object-contain " />
        </Link>
        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-semibold text-slate-500 relative z-30 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-xl">
          <span className="hidden sm:inline whitespace-nowrap">Already have an account ?</span>
          <Link to={loginPath} className="px-4 py-2 sm:px-5 sm:py-2 whitespace-nowrap text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors font-bold shadow-sm bg-white">
            Log In
          </Link>
        </div>
      </header>

      <div className="flex-1 grid lg:grid-cols-[45%_55%]">
        {/* Form Container */}
        <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-20 py-10 lg:py-12">
          <div className="max-w-md w-full mx-auto">
            {children}
          </div>
        </div>

        {/* Right Panel */}
        <div className="relative hidden lg:flex flex-col justify-end p-12  border-l border-slate-100">
          {/* <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay" /> */}
          {/*  */}
          <img src={signup} alt="" className="absolute inset-0 bg-cover bg-center w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0231]/100 to-transparent" />

          <div className="relative z-10 text-white">
            <h2 className="text-4xl font-black mb-4 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Unlock your full<br />academic potential.
            </h2>
            <p className="text-slate-200 text-base mb-12 max-w-md font-medium" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Personalized dashboards for students and real-time insights for parents. Join the community that's reshaping education.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/20">
              <div>
                <h3 className="font-bold mb-1.5 text-sm">Smart Learning<br />Dashboard</h3>
                <p className="text-slate-300 text-[11px] leading-relaxed">Real-time academic tracking</p>
              </div>
              <div>
                <h3 className="font-bold mb-1.5 text-sm">AI-Powered<br />Tutoring</h3>
                <p className="text-slate-300 text-[11px] leading-relaxed">Personalized study support</p>
              </div>
              <div>
                <h3 className="font-bold mb-1.5 text-sm">Parent<br />Insights</h3>
                <p className="text-slate-300 text-[11px] leading-relaxed">Live performance monitoring</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupLayout;
