import { RiChatAiFill } from "react-icons/ri";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { GoGoal } from "react-icons/go";
import learn1  from "../../assets/learn.png"
import learn2  from "../../assets/learn1.png"


import type {
  Feature,
  Step,
  SecurityProtocol,
  Stat,
  SubjectProgress,
  AudienceCard,
} from "../types/index (2)";


export const FEATURES: Feature[] = [
  {
    icon: RiChatAiFill ,
    title: "AI Tutor Support",
    desc: "Instant, 24/7 learning support tailored to the student's current curriculum and pace.",
    bgColor: "bg-blue-50",
    borderHover: "hover:border-blue-300",
  },
  {
    icon: TbBrandGoogleAnalytics ,
    title: "Performance Analytics",
    desc: "Deep dive into grades and habits with easy-to-read charts that highlight improvement areas.",
    bgColor: "bg-emerald-50",
    borderHover: "hover:border-emerald-300",
  },
  {
    icon: TbLayoutDashboardFilled,
    title: "Parent Dashboard",
    desc: "A dedicated view for parents to monitor attendance, homework completion, and grades.",
    bgColor: "bg-purple-50",
    borderHover: "hover:border-purple-300",
  },
  {
    icon: GoGoal ,
    title: "Goals & Rewards",
    desc: "Gamified system where students earn XP and rewards for consistent study habits.",
    bgColor: "bg-amber-50",
    borderHover: "hover:border-amber-300",
  },
];

export const STEPS: Step[] = [
  {
    num: "1",
    title: "Student Learns",
    desc: "Student completes quizzes, assignments, and watches lessons on the platform.",
    grad: "from-blue-500 to-blue-400",
  },
  {
    num: "2",
    title: "AI Analyzes",
    desc: "Our AI engine processes performance data to identify strengths and weaknesses in real time.",
    grad: "from-blue-600 to-purple-500",
  },
  {
    num: "3",
    title: "Parents Get Insights",
    desc: "Parents receive clear, actionable reports and real-time alerts on their child's progress.",
    grad: "from-orange-400 to-amber-400",
  },
];

export const SECURITY_PROTOCOLS: SecurityProtocol[] = [
  {
    icon: "🔐",
    title: "End-to-End Encryption",
    desc: "All student data encrypted in transit and at rest using AES-256 standards.",
    status: "Active & Enforced",
  },
  {
    icon: "👤",
    title: "Role-Based Access Control",
    desc: "Students, parents, and teachers each have strictly defined data permissions.",
    status: "Active & Enforced",
  },
  {
    icon: "🛡️",
    title: "COPPA & FERPA Compliant",
    desc: "Fully compliant with US child privacy regulations. We never sell student data.",
    status: "Certified Compliant",
  },
  {
    icon: "🔑",
    title: "Multi-Factor Authentication",
    desc: "Parent and teacher accounts protected with MFA beyond standard passwords.",
    status: "Active & Enforced",
  },
  {
    icon: "🕵️",
    title: "24/7 Threat Monitoring",
    desc: "Continuous detection of anomalies and suspicious activity with auto-lockout.",
    status: "Monitoring Live",
  },
  {
    icon: "🗑️",
    title: "Data Retention & Deletion",
    desc: "Parents can request full data deletion at any time. GDPR-ready by design.",
    status: "GDPR Ready",
  },
];

export const STATS: Stat[] = [
  { val: "50", suffix: "k+", label: "Active Families" },
  { val: "98", suffix: "%", label: "Parent Satisfaction" },
  { val: "2.4", suffix: "M", label: "Lessons Completed" },
  { val: "34", suffix: "%", label: "Average Grade Boost" },
];

export const PROGRESS_BARS: SubjectProgress[] = [
  { label: "Mathematics", pct: 88, color: "bg-gradient-to-r from-blue-500 to-blue-400" },
  { label: "Science", pct: 74, color: "bg-gradient-to-r from-orange-400 to-amber-400" },
  { label: "English", pct: 91, color: "bg-gradient-to-r from-emerald-500 to-teal-400" },
];

export const AUDIENCE_CARDS: AudienceCard[] = [
  {
    tag: "For Students",
    tagColor: "bg-blue-600",
    image: learn1,
    illustration: "🎓",
    bgGrad: "from-blue-100 to-blue-200",
    dotColor: "bg-blue-500",
    title: "Gamified Learning & AI Assistance",
    items: [
      "Daily XP Goals & Streaks",
      "Instant Homework Help from AI",
      "Interactive Quizzes & Challenges",
      "Personalized Study Plans",
    ],
  },
  {
    tag: "For Parents",
    image: learn2,
    tagColor: "bg-orange-400",
    illustration: "🏡",
    bgGrad: "from-orange-100 to-amber-200",
    dotColor: "bg-orange-400",
    title: "Total Transparency & Peace of Mind",
    items: [
      "Real-time Performance Tracking",
      "Smart Alert System",
      "Detailed Weekly Reports",
      "Direct Teacher Communication",
    ],
  },
];

export const NAV_LINKS: string[] = [
  "Features",
  "How it Works",
  "For Parents",
  "For Students",
  "Security",
];

export const FOOTER_LINKS: string[] = [
  "Features",
  "Pricing",
  "Privacy Policy",
  "Terms",
  "Contact",
];
