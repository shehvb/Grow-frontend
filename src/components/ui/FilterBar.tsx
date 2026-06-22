import type { FC } from "react";
import { motion } from "framer-motion";

export type FilterType = "all" | "in_progress" | "completed" 
// | "archives"
;

interface FilterBarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const filters: { key: FilterType; label: string }[] = [
  { key: "all", label: "All Courses" },
  { key: "in_progress", label: "In Progress" },
  { key: "completed", label: "Completed" },
  // { key: "archives", label: "Archives" },
];

const FilterBar: FC<FilterBarProps> = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="flex flex-nowrap overflow-x-auto no-scrollbar gap-2 sm:gap-3 mb-6 sm:mb-10 pb-2 sm:pb-0">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.key;
        return (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`relative px-6 py-2 rounded-full font-bold transition-colors duration-200 ${
              isActive ? "text-white" : "bg-white text-slate-400 hover:bg-slate-50 hover:text-slate-600 shadow-sm"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeFilterCapsule"
                className="absolute inset-0 bg-[#1600D5] rounded-full z-0"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{filter.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default FilterBar;

