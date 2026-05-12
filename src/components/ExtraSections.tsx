import { type FC } from "react";
import { FadeUp, StatCard, SectionHeader } from "./UI";
import { SECURITY_PROTOCOLS, STATS } from "../components/data";
import { RiSettings4Line, RiGraduationCapLine, RiLinkM, RiBarChartBoxLine, RiEarthLine, RiTwitterXLine } from "react-icons/ri";
import Logo from "../assets/Logo.png";

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
  <section id="for-school" className="py-24 px-6 md:px-12 bg-slate-50">
    <div className="max-w-[1400px] mx-auto">
      <FadeUp>
        <div className="bg-[#3b6dbf] rounded-[2rem] p-12 md:p-16 text-center shadow-xl">
          <h2 className="font-display text-4xl md:text-5xl font-black mb-4 text-white">
            Partner With GROW
          </h2>
          <p className="text-blue-100 text-base mb-12">
            Bring your school into a smarter digital learning environment!
          </p>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-12 text-left">
            <div className="bg-white/10 hover:bg-white/20 transition-colors border border-white/10 rounded-2xl p-5 flex items-center gap-4 text-white">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <RiSettings4Line className="text-lg" />
              </div>
              <span className="font-bold text-sm">Full control over students and teachers</span>
            </div>
            <div className="bg-white/10 hover:bg-white/20 transition-colors border border-white/10 rounded-2xl p-5 flex items-center gap-4 text-white">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <RiGraduationCapLine className="text-lg" />
              </div>
              <span className="font-bold text-sm">Structured education system</span>
            </div>
            <div className="bg-white/10 hover:bg-white/20 transition-colors border border-white/10 rounded-2xl p-5 flex items-center gap-4 text-white">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <RiLinkM className="text-lg" />
              </div>
              <span className="font-bold text-sm">Secure onboarding using codes & invitations</span>
            </div>
            <div className="bg-white/10 hover:bg-white/20 transition-colors border border-white/10 rounded-2xl p-5 flex items-center gap-4 text-white">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <RiBarChartBoxLine className="text-lg" />
              </div>
              <span className="font-bold text-sm">Performance tracking and reporting</span>
            </div>
          </div>

          <button className="px-8 py-3.5 rounded-xl bg-white text-blue-600 font-black text-sm shadow-xl hover:-translate-y-1 transition-all mb-4">
            Apply as a School
          </button>
          <p className="text-blue-200 text-xs font-medium">
            Custom features available tailored to your school
          </p>
        </div>
      </FadeUp>
    </div>
  </section>
);

// ── Footer ────────────────────────────────────────────────────────────────────
export const Footer: FC = () => (
  <footer className="bg-white py-16 px-6 md:px-12 border-t border-slate-100">
    <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-12 justify-between">
      {/* Brand Column */}
      <div className="max-w-sm">
        <div className="flex items-center gap-3 mb-6">
          <img src={Logo} alt="Grow logo" className="h-10 object-contain" />
        </div>
        <p className="text-slate-500 text-sm mb-8 leading-relaxed">
          Empowering schools to connect learning, streamline management, and build stronger educational communities.
        </p>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors">
            <RiEarthLine className="text-lg" />
          </button>
          <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors">
            <RiTwitterXLine className="text-lg" />
          </button>
        </div>
      </div>

      {/* Links Columns */}
      <div className="flex gap-16 flex-wrap">
        <div>
          <h4 className="font-black text-slate-800 text-sm mb-6">Platform</h4>
          <ul className="flex flex-col gap-4 list-none p-0 m-0">
            <li><a href="#" className="text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors no-underline">About</a></li>
            <li><a href="#" className="text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors no-underline">Features</a></li>
            <li><a href="#" className="text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors no-underline">For School</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-black text-slate-800 text-sm mb-6">Support</h4>
          <ul className="flex flex-col gap-4 list-none p-0 m-0">
            <li><a href="#" className="text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors no-underline">Help Center</a></li>
            <li><a href="#" className="text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors no-underline">Contact Us</a></li>
            <li><a href="#" className="text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors no-underline">System Status</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-black text-slate-800 text-sm mb-6">Legal</h4>
          <ul className="flex flex-col gap-4 list-none p-0 m-0">
            <li><a href="#" className="text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors no-underline">Privacy Policy</a></li>
            <li><a href="#" className="text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors no-underline">Terms of Service</a></li>
            <li><a href="#" className="text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors no-underline">Cookie Policy</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);
