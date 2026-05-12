import type { FC } from 'react';
import { RiParentLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { PiChalkboardTeacherFill } from "react-icons/pi";

export type AuthRole = 'student' | 'parent' | 'teacher';

interface AuthTabsProps {
  currentRole: AuthRole;
  onRoleChange: (role: AuthRole) => void;
}

const AuthTabs: FC<AuthTabsProps> = ({ currentRole, onRoleChange }) => {
  return (
    <div className="mb-7">
      <label className="block text-slate-700 font-black text-sm mb-2" style={{ fontFamily: "'Nunito', sans-serif" }}>
        Select your role
      </label>
      <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-2xl">
        <button
          type="button"
          onClick={() => onRoleChange('student')}
          className={`flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl font-black text-xs md:text-sm transition-all duration-200 ${currentRole === 'student'
              ? 'bg-white text-sky-500 shadow-md'
              : 'text-slate-400 hover:text-slate-600'
            }`}
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          <span className="text-lg "><FaUser /></span> Student
        </button>
        <button
          type="button"
          onClick={() => onRoleChange('parent')}
          className={`flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl font-black text-xs md:text-sm transition-all duration-200 ${currentRole === 'parent'
              ? 'bg-white text-blue-900 shadow-md'
              : 'text-slate-400 hover:text-slate-600'
            }`}
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          <span className="text-lg"><RiParentLine />
          </span> Parent
        </button>
        <button
          type="button"
          onClick={() => onRoleChange('teacher')}
          className={`flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl font-black text-xs md:text-sm transition-all duration-200 ${currentRole === 'teacher'
              ? 'bg-white text-indigo-600 shadow-md'
              : 'text-slate-400 hover:text-slate-600'
            }`}
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          <span className="text-lg"><PiChalkboardTeacherFill /></span> Teacher
        </button>
      </div>
    </div>
  );
};

export default AuthTabs;
