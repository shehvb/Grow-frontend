import type { FC } from "react";
import { FiUser } from "react-icons/fi";
import type { StudentProfileData } from "../../../types/parent";

interface AccountSettingsCardProps {
  profile: StudentProfileData;
  studentName: string;
}

const AccountSettingsCard: FC<AccountSettingsCardProps> = ({ profile, studentName }) => {
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
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Full Name</label>
          <div className="px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl">
            <span className="text-slate-800 text-sm font-medium">{studentName}</span>
          </div>
        </div>

        {/* Email Address */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Email Address</label>
          <div className="px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl flex items-center justify-between">
            <span className="text-slate-800 text-sm font-medium">{profile.email}</span>
          </div>
        </div>

        {/* Phone Number */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Phone Number</label>
          <div className="px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl">
            <span className="text-slate-800 text-sm font-medium">{profile.phone}</span>
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Password</label>
          <div className="px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl flex items-center justify-between">
            <span className="text-slate-800 text-sm font-medium">********</span>
          </div>
          <button className="text-[#1600D5] text-xs font-bold hover:underline self-end mt-1 inline-block w-full text-right">Change Password</button>
        </div>

        {/* Preferred Language */}
        <div className="space-y-1.5 col-span-2">
          <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Preferred Language</label>
          <div className="px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl flex items-center justify-between cursor-pointer hover:border-slate-300 transition-colors">
            <span className="text-slate-800 text-sm font-medium">{profile.preferredLanguage}</span>
            <span className="text-slate-400">▼</span>
          </div>
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
