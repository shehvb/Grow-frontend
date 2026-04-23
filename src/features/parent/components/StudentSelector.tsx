import { useState } from "react";
import type { FC } from "react";
import { FiChevronDown } from "react-icons/fi";

interface Student {
  id: number;
  full_name: string;
  student_id: string;
  grade: string;
}

interface StudentSelectorProps {
  students: Student[];
  currentStudent: Student | null;
  onSwitch: (student: Student) => void;
}

const StudentSelector: FC<StudentSelectorProps> = ({ students, currentStudent, onSwitch }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!currentStudent || students.length === 0) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-sm hover:shadow border border-slate-200 min-w-[240px]"
      >
        <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-xl">
          👤
        </div>
        <div className="text-left">
          <p className="font-semibold text-[#0F172A]">{currentStudent.full_name}</p>
          <p className="text-xs text-slate-500">{currentStudent.grade}</p>
        </div>
        <FiChevronDown className={`w-5 h-5 text-slate-400 transition-transform ml-auto ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && students.length > 1 && (
        <div className="absolute top-full mt-2 right-0 w-72 bg-white rounded-3xl shadow-xl border border-slate-100 py-2 z-50">
          <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            Switch Student
          </div>
          {students.map((student) => (
            <button
              key={student.id}
              onClick={() => {
                onSwitch(student);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left ${student.id === currentStudent.id ? "bg-blue-50" : ""
                }`}
            >
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-lg">
                👤
              </div>
              <div>
                <p className="font-medium">{student.full_name}</p>
                <p className="text-xs text-slate-500">Grade {student.grade}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentSelector;