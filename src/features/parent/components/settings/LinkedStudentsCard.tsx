import type { FC } from "react";
import { FiEye, FiSettings, FiPlus } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import type { LinkedStudent } from "../../../../types/parent";

interface LinkedStudentsCardProps {
  students: LinkedStudent[];
}

const LinkedStudentsCard: FC<LinkedStudentsCardProps> = ({ students }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-[24px] p-8 border border-slate-100 shadow-sm relative w-full">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-lg flex items-center justify-center text-[#1600D5]">
              <FaGraduationCap size={28} />
           </div>
           <h2 className="text-xl font-bold text-slate-800 tracking-tight">Linked Students</h2>
        </div>
        <button 
          onClick={() => navigate("/parent/add-student")}
          className="bg-orange-100 text-orange-500 hover:bg-orange-200 transition-colors px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2"
        >
           <FiPlus /> Add Student
        </button>
      </div>

      <div className="space-y-4">
         {students.map((student) => (
            <div key={student.id} className="flex items-center justify-between border border-slate-200 rounded-2xl p-4 cursor-pointer hover:border-[#1600D5]/40 transition-colors">
               <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl font-black ${
                      student.name.startsWith("M") ? "bg-indigo-100 text-[#1600D5]" : "bg-orange-100 text-orange-500"
                  }`}>
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">{student.name}</h3>
                    <p className="text-sm font-medium text-slate-500">Grade {student.grade} • Class {student.grade === 5 ? '9A' : '8C'}</p>
                  </div>
               </div>
               <div className="flex items-center gap-4 mr-2">
                  <button className="text-slate-400 hover:text-slate-700 transition-colors">
                     <FiEye size={24} />
                  </button>
                  <button className="text-slate-400 hover:text-slate-700 transition-colors">
                     <FiSettings size={22} />
                  </button>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
};

export default LinkedStudentsCard;
