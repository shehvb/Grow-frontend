import  {type  FC } from "react";
import { FadeUp, SectionHeader } from "./UI";
import { FEATURES, STEPS, AUDIENCE_CARDS } from "../data";

// ── Features ──────────────────────────────────────────────────────────────────
export const Features: FC = () => (
  <section id="features" className="py-24 px-8 md:px-16 bg-slate-50">
    <div className="max-w-5xl mx-auto">
      <SectionHeader
        label="Core Features"
        title="Everything You Need to Succeed"
        sub="Powered by advanced algorithms and intuitive design, built for students, parents, and educators."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {FEATURES.map((f, i) => (
          <FadeUp key={f.title} delay={i * 80}>
            <div
              className={`bg-white rounded-2xl p-6 border border-slate-100 ${f.borderHover} hover:-translate-y-2 hover:shadow-lg transition-all duration-300 cursor-default h-full`}
            >
              <div
                className={`w-12 h-12 ${f.bgColor} rounded-2xl flex items-center justify-center text-2xl mb-5`}
              >
                {f.icon}
              </div>
              <h3 className="font-black text-sm mb-2 text-slate-800">{f.title}</h3>
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
  <section id="how-it-works" className="py-24 px-8 md:px-16">
    <div className="max-w-4xl mx-auto">
      <SectionHeader
        label="Simple Process"
        title="How Grow Works"
        sub="Three simple steps from learning to insight — our AI does the heavy lifting."
      />
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
        {/* Connector line */}
        <div className="absolute top-10 left-[calc(16.66%+20px)] right-[calc(16.66%+20px)] h-0.5 bg-gradient-to-r from-blue-500 to-orange-400 hidden md:block" />

        {STEPS.map((s, i) => (
          <FadeUp key={s.title} delay={i * 120}>
            <div className="text-center relative z-10">
              <div
                className={`w-20 h-20 rounded-full bg-gradient-to-br ${s.grad} flex items-center justify-center font-display text-3xl font-black text-white shadow-xl mx-auto mb-6`}
              >
                {s.num}
              </div>
              <h3 className="font-black text-base mb-3 text-slate-800">{s.title}</h3>
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
  <section id="for-parents" className="py-24 px-8 md:px-16 bg-slate-50">
    <div className="max-w-5xl mx-auto">
      <SectionHeader
        label="Built For Everyone"
        title="Designed for Students & Parents"
        sub="Whether you're a student chasing goals or a parent seeking peace of mind, Grow has you covered."
      />
      <div className="grid md:grid-cols-2 gap-6">
        {AUDIENCE_CARDS.map((card, i) => (
          <FadeUp key={card.tag} delay={i * 100}>
            <div
              id={card.tag === "For Students" ? "for-students" : undefined}
              className={`rounded-3xl p-10 bg-gradient-to-br ${card.bgGrad} relative overflow-hidden min-h-72 flex flex-col justify-end`}
            >
              <span
                className={`absolute top-6 left-6 ${card.tagColor} text-white text-xs font-black px-3 py-1 rounded-full`}
              >
                {card.tag}
              </span>
              <span className="absolute top-12 right-6 text-8xl opacity-20 -rotate-12 select-none">
                {card.illustration}
              </span>
              <h3 className="font-display text-2xl font-black mb-4 text-slate-800">
                {card.title}
              </h3>
              <ul className="space-y-2 list-none p-0 m-0">
                {card.items.map((item : string) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm font-bold text-slate-700"
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${card.dotColor} flex-shrink-0`}
                    />
                    {item}
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
