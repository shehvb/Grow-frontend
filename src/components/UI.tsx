import { type FC, type ReactNode } from "react";
import { useInView, useCountUp } from "../components/hooks";
import type { SubjectProgress, Stat } from "../components/types/index (2)";

// ── FadeUp ────────────────────────────────────────────────────────────────────
interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const FadeUp: FC<FadeUpProps> = ({ children, delay = 0, className = "" }) => {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
};

// ── ProgressBar ───────────────────────────────────────────────────────────────
export const ProgressBar: FC<SubjectProgress> = ({ label, pct, color }) => {
  const [ref, visible] = useInView(0.3);
  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs font-bold mb-1.5 text-slate-600">
        <span>{label}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          ref={ref}
          style={{
            width: visible ? `${pct}%` : "0%",
            transition: "width 1s ease",
          }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </div>
  );
};

// ── StatCard ──────────────────────────────────────────────────────────────────
interface StatCardProps extends Stat {
  delay?: number;
}

export const StatCard: FC<StatCardProps> = ({ val, suffix, label, delay = 0 }) => {
  const [ref, visible] = useInView(0.3);
  const count = useCountUp(val, visible, suffix);

  return (
    <FadeUp delay={delay}>
      <div
        ref={ref}
        className="bg-white rounded-2xl p-8 text-center border border-slate-100 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300"
      >
        <span className="block text-5xl font-black bg-gradient-to-br from-blue-600 to-orange-400 bg-clip-text text-transparent mb-2">
          {count}
        </span>
        <p className="text-slate-500 font-semibold text-sm">{label}</p>
      </div>
    </FadeUp>
  );
};

// ── SectionHeader ─────────────────────────────────────────────────────────────
interface SectionHeaderProps {
  label: string;
  title: string;
  sub: string;
  dark?: boolean;
}

export const SectionHeader: FC<SectionHeaderProps> = ({ label, title, sub, dark = false }) => (
  <>
    <FadeUp>
      <p className={`text-center font-black text-xl uppercase tracking-widest mb-3 ${dark ? "text-blue-300" : "text-blue-600"}`}>
        {label}
      </p>
    </FadeUp>
    <FadeUp delay={80}>
      <h2 className={`font-display text-4xl font-black text-center mb-4 ${dark ? "text-white" : "text-slate-800"}`}>
        {title}
      </h2>
    </FadeUp>
    <FadeUp delay={160}>
      <p className={`text-center text-sm max-w-md mx-auto mb-14 leading-relaxed ${dark ? "text-blue-300" : "text-slate-400"}`}>
        {sub}
      </p>
    </FadeUp>
  </>
);
