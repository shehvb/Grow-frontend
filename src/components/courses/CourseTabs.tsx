import type { FC } from "react";

export type TabType = "lessons" | "quizzes" | "assignments";

interface CourseTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
  { id: "lessons", label: "Lessons", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h2v14H4zm14-4H8c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-3 12h-4v-2h4v2zm0-4h-4V8h4v2z"/></svg> },
  { id: "quizzes", label: "Quizzes", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/></svg> },
  { id: "assignments", label: "Assignments", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14H7v-2h3v2zm4-4H7v-2h7v2zm3-4H7V7h10v2z"/></svg> }
];

const CourseTabs: FC<CourseTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="bg-white rounded-[16px] px-8 pt-4 mb-8 shadow-sm border border-white flex items-center gap-8">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 pb-4 text-sm font-black transition-colors relative ${
              isActive
                ? "text-[#1600D5]"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {tab.icon}
            {tab.label}
            {isActive && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1600D5] rounded-t-full"></div>
            )}
          </button>
        );
      })}
    </div>
  );
};


export default CourseTabs;
