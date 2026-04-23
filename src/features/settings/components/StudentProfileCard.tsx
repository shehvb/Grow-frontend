import type { FC } from "react";
import { FiEdit2 } from "react-icons/fi";
import type { StudentProfileData } from "../../../types/parent";

interface StudentProfileCardProps {
  profile: StudentProfileData;
  studentName: string;
  gradeLevel: number;
}

const StudentProfileCard: FC<StudentProfileCardProps> = ({ profile, studentName, gradeLevel }) => {
  return (
    <div className="space-y-6">
      {/* Profile Info */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center">
        <div className="relative mb-6">
          <div className="w-32 h-32 rounded-full bg-slate-200 border-4 border-white shadow-sm overflow-hidden">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${studentName}`} 
              alt={studentName}
              className="w-full h-full object-cover"
            />
          </div>
          <button className="absolute bottom-1 right-1 p-2 bg-[#1600D5] text-white rounded-full border-2 border-white shadow-sm hover:bg-blue-700 transition-colors">
            <FiEdit2 className="w-4 h-4" />
          </button>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-1">{studentName}</h2>
        <p className="text-slate-500 text-sm mb-8">Grade {gradeLevel} • St. Mary's Elementary</p>

        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="bg-[#E7F0FF] rounded-2xl p-4 flex flex-col items-center justify-center">
            <span className="text-[#1600D5] font-bold text-xl">{profile.totalXp.toLocaleString()}</span>
            <span className="text-[#1600D5] text-[10px] uppercase font-bold tracking-wider opacity-70">Total XP</span>
          </div>
          <div className="bg-[#FFF4E5] rounded-2xl p-4 flex flex-col items-center justify-center">
            <span className="text-[#F97316] font-bold text-xl">{profile.coursesCount}</span>
            <span className="text-[#F97316] text-[10px] uppercase font-bold tracking-wider opacity-70">Courses</span>
          </div>
        </div>
      </div>

      {/* About Me */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-900 mb-4">About Me</h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          {profile.bio}
        </p>
        <button className="text-[#1600D5] font-semibold text-sm flex items-center gap-1 hover:underline">
          Update bio <span className="text-lg">›</span>
        </button>
      </div>
    </div>
  );
};

export default StudentProfileCard;
