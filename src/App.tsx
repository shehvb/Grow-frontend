import {type FC } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { Features, HowItWorks, Audience } from "./components/Sections";
import { Security, Stats, CTA, Footer } from "./components/ExtraSections";
import LoginParent from "./components/auth/LoginParent";
import LoginStudent from "./components/auth/LoginStudent";

// Landing Page Component
const LandingPage: FC = () => (
  <div className="font-sans bg-white text-slate-800 overflow-x-hidden">
    <Navbar />
    <Hero />
    <Features />
    <HowItWorks />
    <Audience />
    <Security />
    <Stats />
    <CTA />
    <Footer />
  </div>
);

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login/parent" element={<LoginParent />} />
      <Route path="/login/student" element={<LoginStudent />} />
    </Routes>
  );
};

export default App;
