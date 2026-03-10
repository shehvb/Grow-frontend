import  { type FC } from "react";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "./UI";
import { PROGRESS_BARS } from "../components/data";

const Hero: FC = () => {
  const navigate = useNavigate();
  return (
  <section className="pt-36 pb-20 px-8 md:px-16 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative">
    {/* Background glow */}
    <div className="absolute top-20 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40 pointer-events-none" />

    {/* Left content */}
    <div className="animate-fade-up">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-black mb-6">
        <span className="w-2 h-2 rounded-full bg-blue-500 inline-block animate-pulse" />
        Trusted by 50,000+ Families
      </div>

      <h1 className="font-display text-5xl md:text-[3.5rem] font-black leading-tight mb-6 text-slate-800">
        Stay Updated on Your{" "}
        <span className="text-blue-600 relative inline-block">
          Child's Learning,
          <span className="absolute bottom-1 left-0 right-0 h-2 bg-blue-100 -z-10 rounded" />
        </span>{" "}
        Empower Their Growth
      </h1>

      <p className="text-slate-500 text-base leading-relaxed mb-8 max-w-md">
        Monitor your child's performance, study habits, strengths, and areas
        that need support. Get clear insights that help you guide them to better
        results every day.
      </p>

      <div className="flex gap-4 flex-wrap">
        <button onClick={() => navigate('/login/student')} className="px-8 py-4 rounded-2xl bg-blue-600 text-white font-black text-base shadow-xl shadow-blue-200 hover:-translate-y-1 hover:shadow-blue-300 transition-all">
          Get Started
        </button>
        <button onClick={() => navigate('/login/parent')} className="px-8 py-4 rounded-2xl bg-orange-400 text-white font-black text-base shadow-xl shadow-orange-200 hover:-translate-y-1 transition-all">
          Sign Up Free
        </button>
      </div>
    </div>

    {/* Right — dashboard card */}
    <div className="relative">
      {/* Floating badge top */}
      <div className="absolute -top-5 -left-8 bg-white rounded-2xl px-4 py-2.5 shadow-xl text-sm font-black text-amber-500 flex items-center gap-2 z-10 animate-float">
        🏆 +45 XP Today!
      </div>

      <div className="bg-white rounded-3xl p-7 shadow-2xl shadow-slate-200 border border-slate-100 relative overflow-hidden">
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-orange-400 rounded-t-3xl" />

        {/* Student header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-black text-lg">
            A
          </div>
          <div>
            <p className="font-black text-slate-800 text-sm">John Doe</p>
            <p className="text-xs text-slate-400 font-semibold">Grade 8 · Science & Math</p>
          </div>
          <span className="ml-auto bg-emerald-50 text-emerald-600 text-xs font-black px-3 py-1 rounded-full border border-emerald-100">
            On Track ✓
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {(
            [
              ["92%", "Attendance"],
              ["87", "Avg Score"],
              ["1.2k", "XP Earned"],
            ] as const
          ).map(([v, l]) => (
            <div key={l} className="bg-slate-50 rounded-2xl p-3 text-center">
              <span className="block text-2xl font-black text-blue-600">{v}</span>
              <span className="text-xs text-slate-400 font-bold">{l}</span>
            </div>
          ))}
        </div>

        {/* Progress */}
        <h5 className="text-xs font-black text-slate-600 mb-3 uppercase tracking-wide">
          Subject Progress
        </h5>
        {PROGRESS_BARS.map((bar) => (
          <ProgressBar key={bar.label} {...bar} />
        ))}
      </div>

      {/* Floating badge bottom */}
      <div className="absolute -bottom-4 -right-6 bg-white rounded-2xl px-4 py-2.5 shadow-xl text-sm font-black text-emerald-500 flex items-center gap-2 z-10 animate-float-delay">
        📈 Up 12% this week
      </div>
    </div>
  </section>
  );
};

export default Hero;
