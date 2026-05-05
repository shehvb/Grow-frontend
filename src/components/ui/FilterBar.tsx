import type { FC } from "react";

export type FilterType = "all" | "in_progress" | "completed" | "archives";

interface FilterBarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const filters: { key: FilterType; label: string }[] = [
  { key: "all", label: "All Courses" },
  { key: "in_progress", label: "In Progress" },
  { key: "completed", label: "Completed" },
  { key: "archives", label: "Archives" },
];

const FilterBar: FC<FilterBarProps> = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="flex flex-nowrap overflow-x-auto no-scrollbar gap-2 sm:gap-3 mb-6 sm:mb-10 pb-2 sm:pb-0">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`px-6 py-2 rounded-full font-bold transition-colors ${activeFilter === filter.key
              ? "bg-[#1600D5] text-white"
              : "bg-white text-slate-400 hover:bg-slate-50 hover:text-slate-600 shadow-sm"
            }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
