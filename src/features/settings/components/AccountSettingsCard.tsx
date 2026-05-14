import type { FC } from "react";
import { FiUser } from "react-icons/fi";

interface AccountSettingsCardProps {
  studentName: string;
}

const AccountSettingsCard: FC<AccountSettingsCardProps> = ({ studentName }) => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-blue-50 rounded-lg">
          <FiUser className="w-5 h-5 text-[#1600D5]" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Account Settings</h3>
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-8">
        {/* Full Name */}
        <div className="relative">
          <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] uppercase font-bold tracking-wider text-slate-400 z-10">Full Name</label>
          <input 
            type="text" 
            defaultValue={studentName}
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm font-medium outline-none focus:border-[#1600D5] transition-colors"
          />
        </div>

        {/* Email Address */}
        <div className="relative">
          <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] uppercase font-bold tracking-wider text-slate-400 z-10">Email Address</label>
          <input 
            type="text" 
            defaultValue="muhamed.fawzi@gmail.com"
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm font-medium outline-none focus:border-[#1600D5] transition-colors"
          />
        </div>

        {/* id */}
        <div className="relative">
          <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] uppercase font-bold tracking-wider text-slate-400 z-10">id</label>
          <input 
            type="text" 
            defaultValue="stu-826526"
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm font-medium outline-none focus:border-[#1600D5] transition-colors"
          />
        </div>

        {/* Grade */}
        <div className="relative">
          <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] uppercase font-bold tracking-wider text-slate-400 z-10">Grade</label>
          <input 
            type="text" 
            defaultValue="Grade 5"
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm font-medium outline-none focus:border-[#1600D5] transition-colors"
          />
        </div>

        {/* Preferred Language */}
        <div className="relative">
          <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] uppercase font-bold tracking-wider text-slate-400 z-10">Preferred Language</label>
          <select 
            defaultValue="English (United States)"
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm font-medium outline-none focus:border-[#1600D5] transition-colors appearance-none"
          >
            <option value="English (United States)">English (United States)</option>
            <option value="Arabic">Arabic</option>
            <option value="French">French</option>
          </select>
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-800 pointer-events-none w-4 h-4">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </span>
        </div>

        {/* School */}
        <div className="relative">
          <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] uppercase font-bold tracking-wider text-slate-400 z-10">School</label>
          <input 
            type="text" 
            defaultValue="elqawmua"
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm font-medium outline-none focus:border-[#1600D5] transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 mt-auto pt-6">
        <button className="px-6 py-2.5 text-slate-500 font-bold text-sm hover:text-slate-700 transition-colors">
          Cancel
        </button>
        <button className="px-8 py-2.5 bg-[#1600D5] text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-shadow shadow-lg shadow-blue-500/20">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AccountSettingsCard;
