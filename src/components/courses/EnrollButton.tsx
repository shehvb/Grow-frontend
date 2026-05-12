import type { FC } from "react";
import { useState } from "react";
import { useCourseStore } from "../../store/useCourseStore";

interface EnrollButtonProps {
  courseId: number;
  onEnrollSuccess?: () => void;
}

const EnrollButton: FC<EnrollButtonProps> = ({ courseId, onEnrollSuccess }) => {
  const { enrollInCourse, isLoading, error, clearError } = useCourseStore();
  const [localError, setLocalError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleEnroll = async () => {
    clearError();
    setLocalError(null);
    setSuccess(false);
    
    try {
      await enrollInCourse(courseId);
      setSuccess(true);
      if (onEnrollSuccess) onEnrollSuccess();
    } catch (err: any) {
      const apiError = err.response?.status;
      if (apiError === 409) {
        setLocalError("You are already enrolled in this course.");
      } else if (apiError === 403) {
        setLocalError("You do not have permission to enroll. (Students only)");
      } else {
        setLocalError(error || "Failed to enroll. Please try again.");
      }
    }
  };

  if (success) {
    return (
      <button 
        disabled 
        className="px-6 py-2 bg-emerald-100 text-emerald-700 font-bold rounded-xl cursor-not-allowed"
      >
        Enrolled
      </button>
    );
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <button 
        onClick={handleEnroll}
        disabled={isLoading}
        className="px-6 py-2 bg-[#1600D5] text-white font-bold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-blue-100"
      >
        {isLoading ? "Enrolling..." : "Enroll Now"}
      </button>
      {localError && (
        <span className="text-xs font-bold text-red-500 mt-1">{localError}</span>
      )}
    </div>
  );
};

export default EnrollButton;
