import type { FC } from "react";
import { FiEdit2 } from "react-icons/fi";
import { motion } from "framer-motion";

interface StudentProfileCardProps {
  studentName: string;
  user?: any;
}

const penVariants = {
  initial: { y: "100%", opacity: 0 },
  hover: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 200, damping: 12 } }
};

const StudentProfileCard: FC<StudentProfileCardProps> = ({ studentName, user }) => {
  return (
    <div className="space-y-6">
      {/* Profile Info */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center">
        <motion.div 
          className="relative mb-6 cursor-pointer overflow-hidden rounded-full group"
          initial="initial"
          whileHover="hover"
        >
          <div className="w-32 h-32 rounded-full bg-[#D9D9D9] flex items-center justify-center text-4xl text-slate-500 font-bold uppercase overflow-hidden">
            {user?.avatar ? (
              <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              studentName.charAt(0)
            )}
          </div>
          <motion.button 
            className="absolute inset-x-0 bottom-0 py-1.5 bg-[#1600D5]/90 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
            variants={penVariants}
          >
            <FiEdit2 className="w-3.5 h-3.5" />
          </motion.button>
        </motion.div>


        <h2 className="text-2xl font-bold text-slate-900 mb-1">{studentName}</h2>
        <p className="text-slate-500 text-sm mb-8">{user?.grade ? `Student • ${user.grade}` : "Student @ Grow Platform"}</p>

        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="bg-slate-100/80 rounded-2xl p-4 flex flex-col items-center justify-center">
            <span className="text-[#1600D5] font-black text-xl">{user?.total_xp || 0}</span>
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mt-1">Total XP</span>
          </div>
          <div className="bg-slate-100/80 rounded-2xl p-4 flex flex-col items-center justify-center">
            <span className="text-[#F97316] font-black text-xl">{user?.courses_count !== undefined ? user.courses_count : "Active"}</span>
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mt-1">{user?.courses_count !== undefined ? "Courses" : "Status"}</span>
          </div>
        </div>
      </div>

      {/* About Me */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-900 mb-4">About Me</h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          {user?.bio || "I am a student eager to learn new things every day! I enjoy participating in interactive quizzes and improving my knowledge base."}
        </p>
        <button className="text-[#1600D5] font-semibold text-sm flex items-center gap-1 hover:underline">
          Update bio <span className="text-lg">›</span>
        </button>
      </div>
    </div>
  );
};

export default StudentProfileCard;
