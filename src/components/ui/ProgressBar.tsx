import type { FC } from "react";

interface ProgressBarProps {
  progress: number;
  className?: string;
}

const ProgressBar: FC<ProgressBarProps> = ({ progress, className = "" }) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={`w-full h-2 bg-slate-200 rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full bg-emerald-500 rounded-full transition-all duration-300"
        style={{ width: `${clampedProgress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
