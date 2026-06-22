import { useEffect } from "react";
import type { FC } from "react";
import { FiSave } from "react-icons/fi";
import { motion } from "framer-motion";
import { useParentStore } from "../../store/parentStore";
import MyProfileCard from "./components/settings/MyProfileCard";
import LinkedStudentsCard from "./components/settings/LinkedStudentsCard";
import NotificationsCard from "./components/settings/NotificationsCard";
import AiTutorSettingsCard from "./components/settings/AiTutorSettingsCard";

const SettingsPage: FC = () => {
  const { dashboardSummary, fetchSettings } = useParentStore();

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  if (!dashboardSummary || !dashboardSummary.parentProfile) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F8F9FA]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-[#0062FF]"></div>
      </div>
    );
  }

  const { parentProfile, linkedStudents, notificationPrefs, aiTutorSettings } = dashboardSummary;

  return (
    <div className="w-full space-y-8 pb-10 mt-6 relative px-4 sm:px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>

          <h1 className="text-5xl font-black text-[#0F172A] tracking-tight">Settings</h1>
          <p className="text-slate-500 font-medium mt-3 text-lg">
            Manage your profile, linked students, and notification preferences.
          </p>
        </div>
        <div>
          <button className="px-8 py-3.5 bg-[#1600D5] text-white rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-md">
            <FiSave size={18} /> Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
         {/* Left Column (Main) */}
         <motion.div 
           initial={{ y: 10, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ duration: 0.5, ease: "easeOut" }}
           className="xl:col-span-2 space-y-8"
         >
            {parentProfile && (
               <MyProfileCard profile={parentProfile} />
            )}
            
            {linkedStudents && (
               <LinkedStudentsCard students={linkedStudents} />
            )}
         </motion.div>

         {/* Right Column (Sidebar equivalent) */}
         <motion.div 
           initial={{ y: 10, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
           className="xl:col-span-1 space-y-8"
         >
            {notificationPrefs && (
               <NotificationsCard preferences={notificationPrefs} />
            )}

            {aiTutorSettings && (
               <AiTutorSettingsCard settings={aiTutorSettings} />
            )}
         </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;
