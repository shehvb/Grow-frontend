import { useState } from "react";
import type { FC } from "react";
import { FiBell } from "react-icons/fi";
import { motion } from "framer-motion";
import type { NotificationPreferences } from "../../../../types/parent";

interface NotificationsCardProps {
  preferences: NotificationPreferences;
}

const NotificationsCard: FC<NotificationsCardProps> = ({ preferences }) => {
  const [prefs, setPrefs] = useState(preferences);

  const togglePref = (key: keyof NotificationPreferences) => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white rounded-[24px] p-8 border border-slate-100 shadow-sm relative w-full mb-6">
      <div className="flex items-center gap-3 mb-8">
         <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#1600D5]">
            <FiBell size={24} />
         </div>
         <h2 className="text-xl font-bold text-slate-800 tracking-tight">Notifications</h2>
      </div>

      <div className="space-y-6">
         {/* Email Summaries */}
         <div className="flex items-center justify-between">
            <div>
               <h3 className="font-bold text-slate-800 text-base">Email Summaries</h3>
               <p className="text-sm font-medium text-slate-500">Weekly progress reports</p>
            </div>
            <button 
              onClick={() => togglePref('emailSummaries')}
              className={`w-14 h-8 rounded-full transition-colors relative flex items-center px-1 ${prefs.emailSummaries ? "bg-[#1600D5] justify-end" : "bg-slate-300 justify-start"}`}
            >
               <motion.div 
                 layout
                 transition={{ type: "spring", stiffness: 700, damping: 30 }}
                 className="w-6 h-6 bg-white rounded-full shadow-sm" 
               />
            </button>
         </div>

         {/* Real-time Alerts */}
         <div className="flex items-center justify-between">
            <div>
               <h3 className="font-bold text-slate-800 text-base">Real-time Alerts</h3>
               <p className="text-sm font-medium text-slate-500">For grades and absences</p>
            </div>
            <button 
              onClick={() => togglePref('realtimeAlerts')}
              className={`w-14 h-8 rounded-full transition-colors relative flex items-center px-1 ${prefs.realtimeAlerts ? "bg-[#1600D5] justify-end" : "bg-slate-300 justify-start"}`}
            >
               <motion.div 
                 layout
                 transition={{ type: "spring", stiffness: 700, damping: 30 }}
                 className="w-6 h-6 bg-white rounded-full shadow-sm" 
               />
            </button>
         </div>

         {/* AI Recommendations */}
         <div className="flex items-center justify-between">
            <div>
               <h3 className="font-bold text-slate-800 text-base">AI Recommendations</h3>
               <p className="text-sm font-medium text-slate-500">Personalized study tips</p>
            </div>
            <button 
              onClick={() => togglePref('aiRecommendations')}
              className={`w-14 h-8 rounded-full transition-colors relative flex items-center px-1 ${prefs.aiRecommendations ? "bg-[#1600D5] justify-end" : "bg-slate-300 justify-start"}`}
            >
               <motion.div 
                 layout
                 transition={{ type: "spring", stiffness: 700, damping: 30 }}
                 className="w-6 h-6 bg-white rounded-full shadow-sm" 
               />
            </button>
         </div>
      </div>
    </div>
  );
};

export default NotificationsCard;
