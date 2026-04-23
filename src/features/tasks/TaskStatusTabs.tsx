import type { FC } from "react";
import type { TaskCategory } from "../../mock/tasks.mock";

interface TaskStatusTabsProps {
  activeCategory: TaskCategory;
  onCategoryChange: (category: TaskCategory) => void;
}

const categories: { key: TaskCategory; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "upcoming", label: "Upcoming" },
  { key: "overdue", label: "Overdue" },
];

const TaskStatusTabs: FC<TaskStatusTabsProps> = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="flex gap-2 mb-6">
      {categories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onCategoryChange(cat.key)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeCategory === cat.key
              ? "bg-emerald-500 text-white"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default TaskStatusTabs;
