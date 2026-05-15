import type { FC } from "react";
import { useState, useEffect } from "react";
import { 
  FiMail, 
  FiCheckCircle, 
  FiSave,
  FiAlertCircle
} from "react-icons/fi";
import { teacherService, type NotificationPrefs } from "../../../../services/teacherService";
import { toast } from "react-hot-toast";

const NotificationSettingsPage: FC = () => {
  const [prefs, setPrefs] = useState<NotificationPrefs | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPrefs = async () => {
      try {
        const data = await teacherService.getNotificationPrefs();
        setPrefs(data);
      } catch (error) {
        toast.error("Failed to load notification settings");
      }
    };
    fetchPrefs();
  }, []);

  const handleToggle = (key: keyof NotificationPrefs) => {
    if (!prefs) return;
    setPrefs({ ...prefs, [key]: !prefs[key] });
  };

  const handleSave = async () => {
    if (!prefs) return;
    setIsLoading(true);
    try {
      await teacherService.updateNotificationPrefs(prefs);
      toast.success("Preferences updated successfully!");
    } catch (error) {
      toast.error("Failed to update preferences");
    } finally {
      setIsLoading(false);
    }
  };

  if (!prefs) return <div className="p-20 text-center text-slate-400 font-bold">Loading...</div>;

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-slate-800 tracking-tight">
          Notification <span className="text-blue-600">Center</span>
        </h1>
        <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">
          Control how and when you want to be notified
        </p>
      </div>

      <div className="max-w-2xl bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 space-y-10">
        <div className="space-y-6">
          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-orange-50 rounded-2xl text-orange-500 group-hover:scale-110 transition-transform">
                <FiMail size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-black text-slate-800">Email Notifications</h4>
                <p className="text-xs font-bold text-slate-400">Receive weekly summaries and important updates</p>
              </div>
            </div>
            <button 
              onClick={() => handleToggle('email_notifications')}
              className={`w-14 h-8 rounded-full relative transition-colors duration-300 ${prefs.email_notifications ? 'bg-blue-600' : 'bg-slate-200'}`}
            >
              <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${prefs.email_notifications ? 'translate-x-6' : 'translate-x-0'} shadow-sm`} />
            </button>
          </div>

          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-blue-50 rounded-2xl text-blue-500 group-hover:scale-110 transition-transform">
                <FiCheckCircle size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-black text-slate-800">Submission Alerts</h4>
                <p className="text-xs font-bold text-slate-400">Get notified immediately when a student submits work</p>
              </div>
            </div>
            <button 
              onClick={() => handleToggle('submission_alerts')}
              className={`w-14 h-8 rounded-full relative transition-colors duration-300 ${prefs.submission_alerts ? 'bg-blue-600' : 'bg-slate-200'}`}
            >
              <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${prefs.submission_alerts ? 'translate-x-6' : 'translate-x-0'} shadow-sm`} />
            </button>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-[2rem] flex gap-4 items-start border border-slate-100">
          <FiAlertCircle className="text-blue-500 mt-1 shrink-0" size={20} />
          <p className="text-xs font-bold text-slate-500 leading-relaxed">
            Changing these settings will affect how the platform communicates with you. We recommend keeping submission alerts active to stay on top of your grading!
          </p>
        </div>

        <button 
          onClick={handleSave}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 bg-slate-800 text-white py-5 rounded-[1.5rem] font-black text-lg hover:bg-blue-600 transition-all shadow-xl shadow-slate-100 disabled:opacity-70"
        >
          <FiSave size={20} />
          {isLoading ? "Saving..." : "Save Preferences"}
        </button>
      </div>
    </div>
  );
};

export default NotificationSettingsPage;
