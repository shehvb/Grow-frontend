import { useState } from "react";
import type { FC } from "react";
import { FiSliders } from "react-icons/fi";
import type { StudentLearningPreferences } from "../../../types/parent";

interface LearningPreferencesCardProps {
  preferences: StudentLearningPreferences;
}

const LearningPreferencesCard: FC<LearningPreferencesCardProps> = ({ preferences }) => {
  const [prefs, setPrefs] = useState(preferences);

  const togglePref = (key: keyof StudentLearningPreferences) => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 h-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-orange-50 rounded-lg">
          <FiSliders className="w-5 h-5 text-orange-500" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Learning Preferences</h3>
      </div>

      <div className="space-y-8">
        {/* Email Notifications */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-900 leading-tight">Email Notifications</h4>
            <p className="text-xs text-slate-400">Weekly progress summaries and reminders</p>
          </div>
          <button 
            onClick={() => togglePref('emailNotifications')}
            className={`w-14 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out ${prefs.emailNotifications ? 'bg-[#1600D5]' : 'bg-slate-200'}`}
          >
            <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out ${prefs.emailNotifications ? 'translate-x-7' : 'translate-x-0'}`} />
          </button>
        </div>

        {/* AI Assistant Proactivity */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-900 leading-tight">AI Assistant Proactivity</h4>
            <p className="text-xs text-slate-400">Allow AI to suggest topics during study</p>
          </div>
          <button 
            onClick={() => togglePref('aiProactivity')}
            className={`w-14 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out ${prefs.aiProactivity ? 'bg-[#1600D5]' : 'bg-slate-200'}`}
          >
            <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out ${prefs.aiProactivity ? 'translate-x-7' : 'translate-x-0'}`} />
          </button>
        </div>

        {/* Dark Mode */}
        {/* <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-900 leading-tight">Dark Mode</h4>
            <p className="text-xs text-slate-400">Adjust the interface for eye comfort</p>
          </div>
          <button 
            onClick={() => togglePref('darkMode')}
            className={`w-14 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out ${prefs.darkMode ? 'bg-[#1600D5]' : 'bg-slate-200'}`}
          >
            <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out ${prefs.darkMode ? 'translate-x-7' : 'translate-x-0'}`} />
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default LearningPreferencesCard;
