import  { type FC } from "react";
import { useNavigate } from "react-router-dom";
import growLand from "../assets/Grow-land.png";

const Hero: FC = () => {
  const navigate = useNavigate();
  return (
  <section className="pt-36 pb-20 px-6 md:px-12 max-w-[1400px] mx-auto grid md:grid-cols-2 gap-16 items-center relative">
    {/* Background glow */}
    <div className="absolute top-20 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40 pointer-events-none" />

    {/* Left content */}
    <div className="animate-fade-up">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-black mb-6">
        School-Based Learning Platform
      </div>

      <h1 className="font-display text-5xl md:text-[3.5rem] font-black leading-tight mb-6 text-slate-800">
        Empowering Schools.<br />
        <span className="text-blue-600 relative inline-block">
          Connecting Learning.
          <span className="absolute bottom-1 left-0 right-0 h-2 bg-blue-100 -z-10 rounded" />
        </span>
      </h1>

      <p className="text-slate-500 text-base leading-relaxed mb-8 max-w-md">
        A centralized platform where schools manage education, students track progress, and parents stay informed in real time.
      </p>

      <div className="flex gap-4 flex-wrap">
        <button onClick={() => navigate('/login/student')} className="px-8 py-4 rounded-2xl bg-blue-600 text-white font-black text-base shadow-xl shadow-blue-200 hover:-translate-y-1 hover:shadow-blue-300 transition-all">
          Get Started &gt;
        </button>
      </div>
    </div>

    {/* Right — dashboard card */}
    <div className="relative flex justify-center items-center">
      {/* Top Left Glow */}
      <div className="absolute top-0 -left-10 w-64 h-64 bg-[#1600D5] rounded-full blur-[120px] opacity-30 pointer-events-none" />
      {/* Bottom Right Glow */}
      <div className="absolute bottom-0 -right-10 w-64 h-64 bg-[#FF8000] rounded-full blur-[120px] opacity-30 pointer-events-none" />
      <img src={growLand} alt="Grow Learning Platform" className="w-full max-w-2xl object-contain drop-shadow-2xl animate-float relative z-10" />
    </div>
  </section>
  );
};

export default Hero;
