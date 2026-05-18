import type { FC } from "react";
import { FiUser, FiCheckCircle } from "react-icons/fi";
import type { ParentProfile } from "../../../../types/parent";
import { useAuthStore } from "../../../../store/authStore";

interface MyProfileCardProps {
  profile: ParentProfile;
}

const MyProfileCard: FC<MyProfileCardProps> = ({ profile }) => {
  const { user } = useAuthStore();
  const displayName = user?.first_name ? `${user.first_name} ${user.last_name || ""}` : profile.fullName;
  
  return (
    <div className="bg-white rounded-[24px] p-8 border border-slate-100 shadow-sm relative w-full">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-full bg-[#1600D5] flex items-center justify-center text-white">
              <FiUser />
           </div>
           <h2 className="text-xl font-bold text-slate-800 tracking-tight">My profile</h2>
        </div>
        <div className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-md text-sm font-bold flex items-center gap-1.5">
           <FiCheckCircle /> Verified Parent
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
         <div className="flex-shrink-0">
            <div className="w-32 h-32 rounded-full bg-slate-200" />
         </div>

         <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            <div>
               <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
               <input type="text" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-bold focus:outline-none focus:border-[#0062FF]" defaultValue={displayName} />
            </div>
            <div>
               <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
               <input type="email" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-bold focus:outline-none focus:border-[#0062FF]" defaultValue={user?.email || profile.email} />
            </div>

         </div>
      </div>
    </div>
  );
};

export default MyProfileCard;
