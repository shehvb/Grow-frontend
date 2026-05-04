import { useState } from "react";
import type { FC } from "react";
import { FiChevronDown, FiPlus } from "react-icons/fi";
import { useParentStore } from "../../../store/parentStore";
import { useNavigate } from "react-router-dom";

const StudentSelector: FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { students, selectedStudentId, selectStudent } = useParentStore();

  const currentStudent = students.find((s) => s.id === selectedStudentId);

  if (!currentStudent || students.length === 0) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-[#E5E7EB] px-4 py-2.5 rounded-full shadow-sm hover:shadow transition-shadow min-w-[220px]"
      >
        <div className="w-8 h-8 rounded-full bg-[#9CA3AF] flex items-center justify-center text-sm border-2 border-white shadow-sm overflow-hidden">
          {currentStudent.avatar ? (
            <img src={currentStudent.avatar} alt={currentStudent.name} className="w-full h-full object-cover" />
          ) : (
            "👤"
          )}
        </div>
        <div className="text-left flex-1">
          <p className="font-bold text-slate-800 text-sm">
            {currentStudent.name} <span className="font-normal text-slate-500">(Grade {currentStudent.gradeLevel})</span>
          </p>
        </div>
        <FiChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && students.length > 1 && (
        <div className="absolute top-full mt-2 left-0 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
          <div className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-wider">
            Switch Student
          </div>
          {students.map((student) => (
            <button
              key={student.id}
              onClick={() => {
                selectStudent(student.id);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors text-left ${
                student.id === currentStudent.id ? "bg-blue-50/50" : ""
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-[#9CA3AF] flex items-center justify-center text-sm border-2 border-white shadow-sm overflow-hidden">
                {student.avatar ? (
                  <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                ) : (
                  "👤"
                )}
              </div>
              <div>
                <p className="font-bold text-slate-800 text-sm">{student.name}</p>
                <p className="text-xs text-slate-500">Grade {student.gradeLevel}</p>
              </div>
            </button>
          ))}
          
          <div className="border-t border-slate-100 mt-1 pt-1">
            <button
              onClick={() => {
                navigate("/parent/add-student");
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors text-left text-blue-600"
            >
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center border-2 border-dashed border-blue-200 shadow-sm">
                <FiPlus className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-sm">Add New Student</p>
                <p className="text-[10px] text-blue-400 font-medium uppercase tracking-tighter">Register link</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentSelector;