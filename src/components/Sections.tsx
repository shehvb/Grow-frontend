import  { type FC } from "react";
import { FadeUp, SectionHeader } from "./UI";
import { FEATURES, STEPS, AUDIENCE_CARDS } from "../components/data";
// import learn1 from "../assets/learn.png"

// ── Features ──────────────────────────────────────────────────────────────────
export const Features: FC = () => (
  <section id="features" className="py-24 px-6 md:px-12 bg-slate-50">
    <div className="max-w-[1400px] mx-auto">
      <SectionHeader
        label="Core Features"
        title="Everything You Need to Succeed"
        sub="Powered by advanced algorithms and intuitive design, built for students, parents, and educators."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {FEATURES.map((f, i) => (
          <FadeUp key={f.title} delay={i * 80}>
            <div
              className={`bg-white rounded-xl p-6 border border-slate-200 ${f.borderHover} hover:shadow-md transition-all duration-300 cursor-default h-full`}
            >
              <div
                className={`w-12 h-12 ${f.bgColor} rounded-[0.6rem] flex items-center justify-center text-2xl mb-5`}
              >
                {typeof f.icon === "string" ? f.icon : <f.icon  />}
              </div>
              <h3 className="font-bold text-[15px] mb-2 text-slate-900">{f.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{f.desc}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);

// ── How It Works ──────────────────────────────────────────────────────────────
export const HowItWorks: FC = () => (
  <section id="how-it-works" className="py-24 px-6 md:px-12">
    <div className="max-w-[1400px] mx-auto">
      <SectionHeader
        label="Simple Process"
        title="How Grow Works"
        sub="Three simple steps from learning to insight — our AI does the heavy lifting."
      />
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 ">
        {/* Connector line */}
        <div className="absolute top-[50%] -translate-y-1/2 left-0 right-0 h-0.5 bg-slate-200 hidden md:block z-0" />

        {STEPS.map((s, i) => (
          <FadeUp key={s.title} delay={i * 120}>
            <div className={`text-center relative bg-white border ${i === 1 ? 'border-blue-500 shadow-[0_0_0_1px_rgba(59,130,246,1)]' : 'border-slate-200'} rounded-xl w-full p-8 z-10 min-h-[14rem] flex flex-col justify-start`}>
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.grad} flex items-center justify-center text-2xl text-white mx-auto mb-6 flex-shrink-0`}
              >
                {typeof s.icon === "string" ? s.icon : <s.icon />}
              </div>
              <h3 className="font-black text-sm mb-3 text-slate-800">{s.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{s.desc}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);

// ── Audience ──────────────────────────────────────────────────────────────────
export const Audience: FC = () => (
  <section id="for-parents" className="py-24 px-6 md:px-12 bg-slate-50">
    <div className="max-w-[1400px] mx-auto">
      <SectionHeader
        label="Built For Everyone"
        title="Designed for Students & Parents"
        sub="Whether you're a student chasing goals or a parent seeking peace of mind, Grow has you covered."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {AUDIENCE_CARDS.map((card, i) => (
          <FadeUp key={card.tag} delay={i * 100}>
            <div
              id={card.tag === "For Students" ? "for-students" : undefined}
              className={`rounded-[2rem] p-6 bg-gradient-to-br ${card.bgGrad} relative overflow-hidden flex flex-col`}
            >
              <div className="relative mb-6">
                <img src={card.image} alt="" className="rounded-[1.5rem] w-full h-48 object-cover shadow-sm bg-white" />
                <span
                  className={`absolute top-4 left-4 ${card.tagColor} text-white text-[10px] font-black px-3 py-1 rounded-full`}
                >
                  {card.tag}
                </span>
              </div>
              <h3 className="font-display text-2xl font-black mb-3 text-slate-900 leading-tight">
                {card.title}
              </h3>
              <p className="text-slate-500 text-xs mb-6 font-medium leading-relaxed">
                {card.desc}
              </p>
              <ul className="space-y-3 list-none p-0 m-0">
                {card.items.map((item: string) => (
                  <li
                  key={item}
                  className="flex items-start gap-3 text-[13px] font-bold text-slate-700"
                  >
                    <span
                      className={`w-[18px] h-[18px] rounded-full ${card.dotColor} flex-shrink-0 flex items-center justify-center text-white text-[10px] mt-0.5`}
                    >
                      ✓
                    </span>
                    <span className="leading-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);
