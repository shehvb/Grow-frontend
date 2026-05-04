import { type FC } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import { Features, HowItWorks, Audience } from "../components/Sections";

import { CTA, Footer } from "../components/ExtraSections";

const LandingPage: FC = () => (
  <div className="font-sans bg-white text-slate-800 overflow-x-hidden">
    <Navbar />
    <Hero />
    <HowItWorks />
    <Features />
    <Audience />

    <CTA />
    <Footer />
  </div>
);

export default LandingPage;