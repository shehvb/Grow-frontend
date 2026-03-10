import React, { FC } from "react";
import { FadeUp, StatCard, SectionHeader } from "./UI";
import { SECURITY_PROTOCOLS, STATS, FOOTER_LINKS } from "../data";

// ── Security ──────────────────────────────────────────────────────────────────
export const Security: FC = () => (
  <section
    id="security"
    className="py-24 px-8 md:px-16 bg-gradient-to-br from-blue-900 to-indigo-950"
  >
    <div className="max-w-5xl mx-auto">
      <SectionHeader
        label="🔒 Trust & Safety"
        title="Security Protocols"
        sub="Your child's data and privacy are our highest priority. Enterprise-grade protection built into every layer."
        dark
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SECURITY_PROTOCOLS.map((s, i) => (
          <FadeUp key={s.title} delay={i * 80}>
            <div className="bg-white/[0.08] backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/[0.12] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl mb-4">
                {s.icon}
              </div>
              <h4 className="text-white font-black text-sm mb-2">{s.title}</h4>
              <p className="text-blue-200 text-xs leading-relaxed mb-4 flex-1">
                {s.desc}
              </p>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-black">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                {s.status}
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);

// ── Stats ─────────────────────────────────────────────────────────────────────
export const Stats: FC = () => (
  <section className="py-24 px-8 md:px-16 bg-slate-50">
    <div className="max-w-5xl mx-auto">
      <SectionHeader
        label="Our Impact"
        title="Trusted at Scale"
        sub="Real results from real families and students across the globe."
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {STATS.map((s, i) => (
          <StatCard key={s.label} {...s} delay={i * 80} />
        ))}
      </div>
    </div>
  </section>
);

// ── CTA ───────────────────────────────────────────────────────────────────────
export const CTA: FC = () => (
  <section className="py-24 px-8 text-center bg-white">
    <FadeUp>
      <div className="max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-500 text-xs font-black mb-6">
          🚀 Join 50,000+ families today
        </div>
        <h2 className="font-display text-5xl font-black mb-6 leading-tight text-slate-800">
          Ready to{" "}
          <span className="text-blue-600">Grow</span> Together?
        </h2>
        <p className="text-slate-400 text-base leading-relaxed mb-10 max-w-lg mx-auto">
          Start your free trial today. No credit card required. See your child's
          progress transform in the first week.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button className="px-10 py-4 rounded-2xl bg-blue-600 text-white font-black text-base shadow-xl shadow-blue-200 hover:-translate-y-1 hover:shadow-blue-300 transition-all">
            Get Started Free
          </button>
          <button className="px-10 py-4 rounded-2xl border-2 border-slate-200 text-slate-600 font-black text-base hover:border-blue-300 hover:text-blue-600 transition-all">
            View Demo
          </button>
        </div>
      </div>
    </FadeUp>
  </section>
);

// ── Footer ────────────────────────────────────────────────────────────────────
export const Footer: FC = () => (
  <footer className="bg-slate-900 text-white py-16 px-8 text-center">
    <p className="font-display text-3xl font-black mb-4 bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
      Grow
    </p>
    <p className="text-slate-400 text-sm mb-8 max-w-md mx-auto">
      Empowering every child's learning journey with AI-driven insights and
      family transparency.
    </p>
    <ul className="flex justify-center gap-8 list-none mb-10 flex-wrap p-0 m-0">
      {FOOTER_LINKS.map((l) => (
        <li key={l}>
          <a
            href="#"
            className="text-slate-400 hover:text-white text-sm font-bold transition-colors no-underline"
          >
            {l}
          </a>
        </li>
      ))}
    </ul>
    <div className="flex justify-center gap-4 mb-10 flex-wrap">
      <button className="px-8 py-3 rounded-xl bg-blue-600 text-white font-black text-sm shadow-lg hover:-translate-y-0.5 transition-all">
        Get Started Free
      </button>
      <button className="px-8 py-3 rounded-xl bg-orange-400 text-white font-black text-sm shadow-lg hover:-translate-y-0.5 transition-all">
        View Demo
      </button>
    </div>
    <p className="text-slate-600 text-xs">
      © 2026 Grow Learning Inc. All rights reserved.
    </p>
  </footer>
);
