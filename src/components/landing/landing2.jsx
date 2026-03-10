import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// ── Hooks ──────────────────────────────────────────────
function useInView(threshold = 0.15) {
const ref = useRef(null);
const [visible, setVisible] = useState(false);
useEffect(() => {
    const obs = new IntersectionObserver(
    ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
    { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
}, [threshold]);
return [ref, visible];
}

function useCountUp(target, active, suffix = "") {
const [val, setVal] = useState("0" + suffix);
useEffect(() => {
    if (!active) return;
    let start = null;
    const duration = 1600;
    const isFloat = String(target).includes(".");
    const tick = (ts) => {
    if (!start) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    const e = 1 - Math.pow(1 - p, 3);
    const n = isFloat
        ? (e * parseFloat(target)).toFixed(1)
        : Math.floor(e * parseFloat(target));
    setVal(n + suffix);
    if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
}, [active, target, suffix]);
return val;
}

// ── Data ───────────────────────────────────────────────
const features = [
{ icon: "🤖", title: "AI Tutor Support", desc: "Instant, 24/7 learning support tailored to the student's current curriculum and pace.", color: "bg-blue-50", border: "hover:border-blue-300" },
{ icon: "📊", title: "Performance Analytics", desc: "Deep dive into grades and habits with easy-to-read charts that highlight improvement areas.", color: "bg-emerald-50", border: "hover:border-emerald-300" },
{ icon: "👨‍👩‍👧", title: "Parent Dashboard", desc: "A dedicated view for parents to monitor attendance, homework completion, and grades.", color: "bg-purple-50", border: "hover:border-purple-300" },
{ icon: "🏆", title: "Goals & Rewards", desc: "Gamified system where students earn XP and rewards for consistent study habits.", color: "bg-amber-50", border: "hover:border-amber-300" },
];

const steps = [
{ num: "1", title: "Student Learns", desc: "Student completes quizzes, assignments, and watches lessons on the platform.", grad: "from-blue-500 to-blue-400" },
{ num: "2", title: "AI Analyzes", desc: "Our AI engine processes performance data to identify strengths and weaknesses in real time.", grad: "from-blue-600 to-purple-500" },
{ num: "3", title: "Parents Get Insights", desc: "Parents receive clear, actionable reports and real-time alerts on their child's progress.", grad: "from-orange-400 to-amber-400" },
];

const security = [
{ icon: "🔐", title: "End-to-End Encryption", desc: "All student data is encrypted in transit and at rest using AES-256 standards.", status: "Active & Enforced" },
{ icon: "👤", title: "Role-Based Access Control", desc: "Students, parents, and teachers each have strictly defined data permissions.", status: "Active & Enforced" },
{ icon: "🛡️", title: "COPPA & FERPA Compliant", desc: "Fully compliant with US child privacy regulations. We never sell student data.", status: "Certified Compliant" },
{ icon: "🔑", title: "Multi-Factor Authentication", desc: "Parent and teacher accounts are protected with MFA beyond passwords.", status: "Active & Enforced" },
{ icon: "🕵️", title: "24/7 Threat Monitoring", desc: "Continuous detection of anomalies and suspicious activity with auto-lockout.", status: "Monitoring Live" },
{ icon: "🗑️", title: "Data Retention & Deletion", desc: "Parents can request full data deletion at any time. GDPR-ready by design.", status: "GDPR Ready" },
];

const stats = [
{ val: "50", suffix: "k+", label: "Active Families" },
{ val: "98", suffix: "%", label: "Parent Satisfaction" },
{ val: "2.4", suffix: "M", label: "Lessons Completed" },
{ val: "34", suffix: "%", label: "Average Grade Boost" },
];

// ── Sub-components ─────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }) {
const [ref, visible] = useInView();
return (
    <div
    ref={ref}
    style={{ transitionDelay: `${delay}ms` }}
    className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
    >
    {children}
    </div>
);
}

function ProgressBar({ label, pct, color }) {
const [ref, visible] = useInView(0.3);
return (
    <div className="mb-3">
    <div className="flex justify-between text-xs font-bold mb-1.5 text-slate-600">
        <span>{label}</span><span>{pct}%</span>
    </div>
    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
        ref={ref}
        style={{ width: visible ? `${pct}%` : "0%", transition: "width 1s ease" }}
        className={`h-full rounded-full ${color}`}
        />
    </div>
    </div>
);
}

function StatCard({ val, suffix, label, delay }) {
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
}

// ── Main Component ─────────────────────────────────────
// export default function GrowLanding() {
const [scrolled, setScrolled] = useState(false);
const [menuOpen, setMenuOpen] = useState(false);
const navigate = useNavigate();

useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
}, []);

return (
    <div className="font-sans bg-white text-slate-800 overflow-x-hidden">
    {/* Google Fonts */}
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Playfair+Display:wght@700;800&display=swap');
        body { font-family: 'Nunito', sans-serif; }
        .font-display { font-family: 'Playfair Display', serif; }
        @keyframes floatBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.8)} }
        .float { animation: floatBob 3s ease-in-out infinite; }
        .float-delay { animation: floatBob 3s ease-in-out infinite; animation-delay: -1.5s; }
        .pulse-dot { animation: pulse-dot 1.5s ease infinite; }
    `}</style>

    {/* ── NAV ── */}
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-4 bg-white/85 backdrop-blur-md border-b border-slate-100 transition-shadow duration-300 ${scrolled ? "shadow-md" : ""}`}>
        <a href="#" className="flex items-center gap-3 no-underline">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-orange-400 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-200">G</div>
        <span className="font-black text-xl text-blue-600 font-display">Grow</span>
        </a>

        <ul className="hidden md:flex items-center gap-8 list-none">
        {["Features", "How it Works", "For Parents", "For Students", "Security"].map(link => (
            <li key={link}>
            <a href={`#${link.toLowerCase().replace(/ /g, "-")}`}
                className="text-slate-500 hover:text-blue-600 font-700 text-sm font-bold transition-colors no-underline relative group">
                {link}
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
            </a>
            </li>
        ))}
        </ul>

        <div className="flex items-center gap-3">
        <button onClick={() => navigate('/login/parent')} className="hidden md:block px-5 py-2 rounded-xl border-2 border-slate-200 text-slate-700 font-bold text-sm hover:border-blue-400 hover:text-blue-600 transition-all">Login</button>
        <button onClick={() => navigate('/login/student')} className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-500 hover:-translate-y-0.5 transition-all">Get Started</button>
        </div>
    </nav>

    {/* ── HERO ── */}
    <section className="pt-36 pb-20 px-8 md:px-16 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative">
        {/* Glow */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40 pointer-events-none" />

        <div>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-black mb-6 animate-[fadeUp_.5s_ease_both]">
            <span className="w-2 h-2 rounded-full bg-blue-500 pulse-dot inline-block" />
            Trusted by 50,000+ Families
        </div>

        <h1 className="font-display text-5xl md:text-6xl font-black leading-tight mb-6 text-slate-800">
            Stay Updated on Your{" "}
            <span className="text-blue-600 relative">
            Child's Learning,
            <span className="absolute bottom-1 left-0 right-0 h-2 bg-blue-100 -z-10 rounded" />
            </span>{" "}
            Empower Their Growth
        </h1>

        <p className="text-slate-500 text-base leading-relaxed mb-8 max-w-md">
            Monitor your child's performance, study habits, strengths, and areas that need support. Get clear insights that help you guide them to better results every day.
        </p>

        <div className="flex gap-4">
            <button onClick={() => navigate('/login/student')} className="px-8 py-4 rounded-2xl bg-blue-600 text-white font-black text-base shadow-xl shadow-blue-200 hover:-translate-y-1 hover:shadow-blue-300 transition-all">Get Started</button>
            <button onClick={() => navigate('/login/parent')} className="px-8 py-4 rounded-2xl bg-orange-400 text-white font-black text-base shadow-xl shadow-orange-200 hover:-translate-y-1 transition-all">Sign Up Free</button>
        </div>
        </div>

        {/* Hero Card */}
        <div className="relative">
        <div className="float absolute -top-5 -left-8 bg-white rounded-2xl px-4 py-2.5 shadow-xl text-sm font-black text-amber-500 flex items-center gap-2 z-10">
            🏆 +45 XP Today!
        </div>

        <div className="bg-white rounded-3xl p-7 shadow-2xl shadow-slate-200 border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-orange-400 rounded-t-3xl" />

            <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-black text-lg">A</div>
            <div>
                <p className="font-black text-slate-800 text-sm">Alex Johnson</p>
                <p className="text-xs text-slate-400 font-semibold">Grade 8 · Science & Math</p>
            </div>
            <span className="ml-auto bg-emerald-50 text-emerald-600 text-xs font-black px-3 py-1 rounded-full border border-emerald-100">On Track ✓</span>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
            {[["92%","Attendance"],["87","Avg Score"],["1.2k","XP Earned"]].map(([v,l]) => (
                <div key={l} className="bg-slate-50 rounded-2xl p-3 text-center">
                <span className="block text-2xl font-black text-blue-600">{v}</span>
                <span className="text-xs text-slate-400 font-bold">{l}</span>
                </div>
            ))}
            </div>

            <h5 className="text-xs font-black text-slate-600 mb-3 uppercase tracking-wide">Subject Progress</h5>
            <ProgressBar label="Mathematics" pct={88} color="bg-gradient-to-r from-blue-500 to-blue-400" />
            <ProgressBar label="Science" pct={74} color="bg-gradient-to-r from-orange-400 to-amber-400" />
            <ProgressBar label="English" pct={91} color="bg-gradient-to-r from-emerald-500 to-teal-400" />
        </div>

        <div className="float-delay absolute -bottom-4 -right-6 bg-white rounded-2xl px-4 py-2.5 shadow-xl text-sm font-black text-emerald-500 flex items-center gap-2 z-10">
            📈 Up 12% this week
        </div>
        </div>
    </section>

    {/* ── FEATURES ── */}
    <section id="features" className="py-24 px-8 md:px-16 bg-slate-50">
        <div className="max-w-5xl mx-auto">
        <FadeUp><p className="text-center text-blue-600 font-black text-xs uppercase tracking-widest mb-3">Core Features</p></FadeUp>
        <FadeUp delay={80}><h2 className="font-display text-4xl font-black text-center mb-4">Everything You Need to Succeed</h2></FadeUp>
        <FadeUp delay={160}><p className="text-center text-slate-400 text-sm max-w-lg mx-auto mb-14 leading-relaxed">Powered by advanced algorithms and intuitive design, built for students, parents, and educators.</p></FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
            <FadeUp key={f.title} delay={i * 80}>
                <div className={`bg-white rounded-2xl p-6 border border-slate-100 ${f.border} hover:-translate-y-2 hover:shadow-lg transition-all duration-300 cursor-default`}>
                <div className={`w-12 h-12 ${f.color} rounded-2xl flex items-center justify-center text-2xl mb-5`}>{f.icon}</div>
                <h3 className="font-black text-sm mb-2">{f.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{f.desc}</p>
                </div>
            </FadeUp>
            ))}
        </div>
        </div>
    </section>

    {/* ── HOW IT WORKS ── */}
    <section id="how-it-works" className="py-24 px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
        <FadeUp><p className="text-center text-blue-600 font-black text-xs uppercase tracking-widest mb-3">Simple Process</p></FadeUp>
        <FadeUp delay={80}><h2 className="font-display text-4xl font-black text-center mb-4">How Grow Works</h2></FadeUp>
        <FadeUp delay={160}><p className="text-center text-slate-400 text-sm max-w-md mx-auto mb-16 leading-relaxed">Three simple steps from learning to insight — our AI does the heavy lifting.</p></FadeUp>

        <div className="relative grid grid-cols-3 gap-8">
            <div className="absolute top-10 left-[calc(16.66%+20px)] right-[calc(16.66%+20px)] h-0.5 bg-gradient-to-r from-blue-500 to-orange-400 hidden md:block" />
            {steps.map((s, i) => (
            <FadeUp key={s.title} delay={i * 120}>
                <div className="text-center relative z-10">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${s.grad} flex items-center justify-center font-display text-3xl font-black text-white shadow-xl mx-auto mb-6`}>{s.num}</div>
                <h3 className="font-black text-base mb-3">{s.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{s.desc}</p>
                </div>
            </FadeUp>
            ))}
        </div>
        </div>
    </section>

    {/* ── AUDIENCE ── */}
    <section id="for-parents" className="py-24 px-8 md:px-16 bg-slate-50">
        <div className="max-w-5xl mx-auto">
        <FadeUp><p className="text-center text-blue-600 font-black text-xs uppercase tracking-widest mb-3">Built For Everyone</p></FadeUp>
        <FadeUp delay={80}><h2 className="font-display text-4xl font-black text-center mb-4">Designed for Students & Parents</h2></FadeUp>
        <FadeUp delay={160}><p className="text-center text-slate-400 text-sm max-w-md mx-auto mb-14 leading-relaxed">Whether you're a student chasing goals or a parent seeking peace of mind, Grow has you covered.</p></FadeUp>

        <div className="grid md:grid-cols-2 gap-6">
            <FadeUp id="for-students">
            <div className="rounded-3xl p-10 bg-gradient-to-br from-blue-100 to-blue-200 relative overflow-hidden min-h-72 flex flex-col justify-end">
                <span className="absolute top-6 left-6 bg-blue-600 text-white text-xs font-black px-3 py-1 rounded-full">For Students</span>
                <span className="absolute top-12 right-6 text-8xl opacity-20 rotate-[-10deg]">🎓</span>
                <h3 className="font-display text-2xl font-black mb-4">Gamified Learning & AI Assistance</h3>
                <ul className="space-y-2">
                {["Daily XP Goals & Streaks","Instant Homework Help from AI","Interactive Quizzes & Challenges","Personalized Study Plans"].map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />{item}
                    </li>
                ))}
                </ul>
            </div>
            </FadeUp>

            <FadeUp delay={100}>
            <div className="rounded-3xl p-10 bg-gradient-to-br from-orange-100 to-amber-200 relative overflow-hidden min-h-72 flex flex-col justify-end">
                <span className="absolute top-6 left-6 bg-orange-400 text-white text-xs font-black px-3 py-1 rounded-full">For Parents</span>
                <span className="absolute top-12 right-6 text-8xl opacity-20 rotate-[-10deg]">🏡</span>
                <h3 className="font-display text-2xl font-black mb-4">Total Transparency & Peace of Mind</h3>
                <ul className="space-y-2">
                {["Real-time Performance Tracking","Smart Alert System","Detailed Weekly Reports","Direct Teacher Communication"].map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-orange-400 flex-shrink-0" />{item}
                    </li>
                ))}
                </ul>
            </div>
            </FadeUp>
        </div>
        </div>
    </section>

    {/* ── SECURITY ── */}
    <section id="security" className="py-24 px-8 md:px-16 bg-gradient-to-br from-blue-900 to-indigo-950">
        <div className="max-w-5xl mx-auto">
        <FadeUp><p className="text-center text-blue-300 font-black text-xs uppercase tracking-widest mb-3">🔒 Trust & Safety</p></FadeUp>
        <FadeUp delay={80}><h2 className="font-display text-4xl font-black text-center text-white mb-4">Security Protocols</h2></FadeUp>
        <FadeUp delay={160}><p className="text-center text-blue-300 text-sm max-w-md mx-auto mb-14 leading-relaxed">Your child's data and privacy are our highest priority. Enterprise-grade protection built into every layer.</p></FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {security.map((s, i) => (
            <FadeUp key={s.title} delay={i * 80}>
                <div className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/12 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl mb-4">{s.icon}</div>
                <h4 className="text-white font-black text-sm mb-2">{s.title}</h4>
                <p className="text-blue-200 text-xs leading-relaxed mb-4">{s.desc}</p>
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-black">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot inline-block" />
                    {s.status}
                </div>
                </div>
            </FadeUp>
            ))}
        </div>
        </div>
    </section>

    {/* ── STATS ── */}
    <section className="py-24 px-8 md:px-16 bg-slate-50">
        <div className="max-w-5xl mx-auto">
        <FadeUp><p className="text-center text-blue-600 font-black text-xs uppercase tracking-widest mb-3">Our Impact</p></FadeUp>
        <FadeUp delay={80}><h2 className="font-display text-4xl font-black text-center mb-14">Trusted at Scale</h2></FadeUp>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((s, i) => <StatCard key={s.label} {...s} delay={i * 80} />)}
        </div>
        </div>
    </section>

    {/* ── CTA ── */}
    <section className="py-24 px-8 text-center bg-white">
        <FadeUp>
        <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-500 text-xs font-black mb-6">
            🚀 Join 50,000+ families today
            </div>
            <h2 className="font-display text-5xl font-black mb-6 leading-tight">
            Ready to <span className="text-blue-600">Grow</span> Together?
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-10 max-w-lg mx-auto">
            Start your free trial today. No credit card required. See your child's progress transform in the first week.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
            <button onClick={() => navigate('/login/student')} className="px-10 py-4 rounded-2xl bg-blue-600 text-white font-black text-base shadow-xl shadow-blue-200 hover:-translate-y-1 hover:shadow-blue-300 transition-all">
                Get Started Free
            </button>
            <button className="px-10 py-4 rounded-2xl border-2 border-slate-200 text-slate-600 font-black text-base hover:border-blue-300 hover:text-blue-600 transition-all">
                View Demo
            </button>
            </div>
        </div>
        </FadeUp>
    </section>

    {/* ── FOOTER ── */}
    <footer className="bg-slate-900 text-white py-16 px-8 text-center">
        <p className="font-display text-3xl font-black mb-4 bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">Grow</p>
        <p className="text-slate-400 text-sm mb-8">Empowering every child's learning journey with AI-driven insights and family transparency.</p>
        <ul className="flex justify-center gap-8 list-none mb-10 flex-wrap">
        {["Features","Pricing","Privacy Policy","Terms","Contact"].map(l => (
            <li key={l}><a href="#" className="text-slate-400 hover:text-white text-sm font-bold transition-colors no-underline">{l}</a></li>
        ))}
        </ul>
        <div className="flex justify-center gap-4 mb-10">
        <button onClick={() => navigate('/login/student')} className="px-8 py-3 rounded-xl bg-blue-600 text-white font-black text-sm shadow-lg hover:-translate-y-0.5 transition-all">Get Started Free</button>
        <button className="px-8 py-3 rounded-xl bg-orange-400 text-white font-black text-sm shadow-lg hover:-translate-y-0.5 transition-all">View Demo</button>
        </div>
        <p className="text-slate-600 text-xs">© 2026 Grow Learning Inc. All rights reserved.</p>
    </footer>
    </div>
);


export default GrowLanding;