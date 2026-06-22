import { useState } from "react";
import type { FC } from "react";
import { FiUser, FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import type { ParentProfile } from "../../../../types/parent";
import { useAuthStore } from "../../../../store/authStore";

interface MyProfileCardProps {
  profile: ParentProfile;
}

const AnimatedInput = ({ label, defaultValue, type = "text" }: { label: string, defaultValue: string, type?: string }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div>
       <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{label}</label>
       <div className="relative">
         <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: isFocused ? 1 : 0 }}
           transition={{ duration: 0.2 }}
           className="absolute inset-0 rounded-xl border-2 border-[#1600D5] shadow-[0_0_15px_rgba(22,0,213,0.3)] pointer-events-none"
         />
         <input 
           type={type} 
           className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-bold focus:outline-none relative bg-transparent z-10" 
           defaultValue={defaultValue} 
           onFocus={() => setIsFocused(true)}
           onBlur={() => setIsFocused(false)}
         />
       </div>
    </div>
  );
};

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
            <AnimatedInput label="Full Name" defaultValue={displayName} />
            <AnimatedInput label="Email Address" type="email" defaultValue={user?.email || profile.email} />
         </div>
      </div>
    </div>
  );
};

export default MyProfileCard;
