import { useState, useEffect } from "react";
import type { FC } from "react";
import { useAuthStore } from "../../store/authStore";
import { studentService } from "../../services/studentService";
import StudentProfileCard from "./components/StudentProfileCard";
import AccountSettingsCard from "./components/AccountSettingsCard";
import LearningPreferencesCard from "./components/LearningPreferencesCard";

const SettingsPage: FC = () => {
  const { user } = useAuthStore();
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const data = await studentService.getSettings();
        setSettings(data);
      } catch (error) {
        console.error("Failed to fetch student settings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const displayName = settings?.full_name || user?.full_name || (user?.first_name ? `${user.first_name} ${user.last_name || ""}` : (user?.username || "Student"));

  // Local preferences state (since it might not be in the backend yet)
  const defaultPrefs = { emailNotifications: true, aiProactivity: false, darkMode: false };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1600D5]"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 pb-12">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-1">Profile & Settings</h1>
        <p className="text-slate-400 font-medium tracking-tight">Account Overview</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column - Profile */}
        <div className="lg:col-span-4 h-full">
          <StudentProfileCard 
            studentName={displayName} 
            user={{ ...user, ...settings }}
          />
        </div>

        {/* Right Column - Account & Learning */}
        <div className="lg:col-span-8 flex flex-col gap-8 h-full">
          <div className="flex-1">
            <AccountSettingsCard 
              studentName={displayName} 
              user={{ ...user, ...settings }}
            />
          </div>
          <div className="lg:h-auto">
            <LearningPreferencesCard 
              preferences={defaultPrefs} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;


