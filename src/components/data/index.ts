import { RiChatAiFill, RiBookOpenFill, RiGraduationCapFill, RiBankFill, RiTeamFill, RiEyeFill } from "react-icons/ri";
import { TbBrandGoogleAnalytics, TbLayoutDashboardFilled } from "react-icons/tb";
import { GoGoal } from "react-icons/go";
import learn1  from "../../assets/learn.png"
import learn2  from "../../assets/learn1.png"
import learn3  from "../../assets/Effortless Classroom Management.png"

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
    icon: RiChatAiFill,
    title: "AI Tutor Support",
    desc: "Instant, 24/7 learning support tailored to the student's current curriculum and pace.",
    bgColor: "bg-[#e6ebff] text-blue-600",
    borderHover: "hover:border-blue-300",
  },
  {
    icon: RiBookOpenFill,
    title: "Teacher Tools",
    desc: "Teachers create assignments, quizzes, and manage learning content easily.",
    bgColor: "bg-[#e0f2fe] text-[#0ea5e9]",
    borderHover: "hover:border-sky-300",
  },
  {
    icon: TbLayoutDashboardFilled,
    title: "Parent Dashboard",
    desc: "A dedicated view for parents to monitor attendance, homework completion, and grades.",
    bgColor: "bg-[#f3e8ff] text-[#a855f7]",
    borderHover: "hover:border-purple-300",
  },
  {
    icon: RiGraduationCapFill,
    title: "Smart Learning Experience",
    desc: "Students access lessons, assignments, and quizzes with ease.",
    bgColor: "bg-[#ffedd5] text-[#f97316]",
    borderHover: "hover:border-orange-300",
  },
];

export const STEPS: Step[] = [
  {
    icon: RiBankFill,
    title: "School Joins GROW",
    desc: "Admins register their school and set up grades, subjects, and teachers.",
    grad: "from-[#326ce5] to-blue-500",
  },
  {
    icon: RiTeamFill,
    title: "Students & Teachers Get Access",
    desc: "Accounts are created securely using school-managed system (codes or invitations).",
    grad: "from-[#ff8800] to-orange-400",
  },
  {
    icon: RiEyeFill,
    title: "Learning & Monitoring",
    desc: "Students access lessons and tasks, teachers manage content, parents track progress.",
    grad: "from-[#22c55e] to-[#16a34a]",
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
    desc: "Interactive modules that make studying feel like a game and provide instant homework assistance.",
    items: [
      "Daily XP Goals & Streaks",
      "Instant Homework Help",
      "Interactive Quizzes",
    ],
  },
  {
    tag: "For Parents",
    image: learn2,
    tagColor: "bg-orange-400",
    illustration: "🏡",
    bgGrad: "from-orange-100 to-amber-200",
    dotColor: "bg-orange-400",
    title: "Total Transparency & Peace",
    desc: "Parents receive weekly reports and real-time alerts to monitor attendance and grades from a dedicated dashboard.",
    items: [
      "Real-time Performance Tracking",
      "Smart Alert System",
      "Detailed Weekly Reports",
    ],
  },
  {
    tag: "For School",
    image: learn3,
    tagColor: "bg-amber-400",
    illustration: "🏫",
    bgGrad: "from-amber-50 to-yellow-100",
    dotColor: "bg-amber-400",
    title: "Effortless Classroom Management",
    desc: "Everything teachers need to build courses, monitor student performance, and run their classes.",
    items: [
      "Create assignments & quizzes",
      "Manage lessons & study materials",
      "Track student performance",
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
