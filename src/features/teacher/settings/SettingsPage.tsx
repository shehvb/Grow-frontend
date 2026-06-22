import type { FC } from "react";
import { useState, useEffect } from "react";
import { useAuthStore } from "../../../store/authStore";
import { 
  FiEdit2, 
  FiUser, 
  FiSliders, 
  FiChevronDown, 
  FiChevronRight
} from "react-icons/fi";
import { motion } from "framer-motion";
import { teacherService } from "../services/teacher.service";

// ─── Variant Dictionaries ────────────────────────────────────────────────────

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as any } }
};

const SettingsPage: FC = () => {
  const { user } = useAuthStore();
  const displayName = user?.first_name ? `${user.first_name} ${user.last_name || ""}` : "Teacher";

  const [formData, setFormData] = useState({
    fullName: displayName,
    email: user?.email || "Ahmed Mohamed", 
    school: "elqawmia",
    id: "663254",
    language: "English (United States)",
    bio: "",
    avatar: ""
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    missingAssignments: false,
    newSubmissions: true
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // We use Promise.all to fetch both simultaneously if possible, or sequential
        const [profileRes, notifRes] = await Promise.all([
          teacherService.getProfile().catch(() => null),
          teacherService.getNotifications().catch(() => null)
        ]);
        
        if (profileRes) {
          setFormData({
            fullName: profileRes.full_name || displayName,
            email: profileRes.email || user?.email || "",
            school: profileRes.school_name || "School",
            id: profileRes.teacher_id?.toString() || "0",
            language: profileRes.preferred_language || "English (United States)",
            bio: profileRes.bio || "",
            avatar: profileRes.avatar || ""
          });
        }
        
        if (notifRes) {
          setPreferences({
            emailNotifications: notifRes.emailNotifications !== undefined ? notifRes.emailNotifications : true,
            missingAssignments: notifRes.missingAssignments !== undefined ? notifRes.missingAssignments : false,
            newSubmissions: notifRes.newSubmissions !== undefined ? notifRes.newSubmissions : true
          });
        }
      } catch (err) {
        console.error("Failed to fetch settings", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user, displayName]);

  const handleSaveProfile = async () => {
    try {
      // Exclude read-only fields per API spec
      const payload = {
        bio: formData.bio,
        avatar: formData.avatar,
        preferred_language: formData.language
      };
      await teacherService.updateProfile(payload);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to save profile", err);
      alert("Failed to update profile.");
    }
  };

  const handleTogglePreference = async (key: keyof typeof preferences) => {
    const newValue = !preferences[key];
    setPreferences({ ...preferences, [key]: newValue });
    try {
      await teacherService.updateNotifications({ [key]: newValue });
    } catch (err) {
      console.error("Failed to update notification preference", err);
      // Revert on failure
      setPreferences({ ...preferences, [key]: !newValue });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="visible" className="space-y-8 pb-20">
      {/* Header Area */}
      <motion.div variants={sectionVariants} className="space-y-1">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Profile & Settings</h1>
        <p className="text-slate-400 font-medium">Account Overview</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column: Profile Info */}
        <div className="lg:w-[320px] shrink-0 space-y-6">
          {/* Profile Card */}
          <motion.div variants={sectionVariants} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="w-32 h-32 rounded-full bg-[#D9D9D9]"></div>
              <button className="absolute bottom-1 right-1 w-8 h-8 bg-[#FF8000] text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white hover:bg-orange-600 transition-colors">
                <FiEdit2 className="w-4 h-4" />
              </button>
            </div>
            <h2 className="text-xl font-black text-slate-800 mb-1 uppercase tracking-wide">
               {displayName}
            </h2>
            <p className="text-sm font-bold text-slate-400 capitalize">{user?.role || "Teacher"} Account</p>
          </motion.div>

          {/* About Me Card */}
          <motion.div variants={sectionVariants} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-4">
            <h3 className="text-base font-black text-slate-800">About Me</h3>
            <p className="text-sm font-medium text-slate-500 leading-relaxed">
              Passionate Math teacher with 8 years of experience.
            </p>
            <button className="text-[#FF8000] text-sm font-bold flex items-center gap-1 hover:text-orange-600 transition-colors pt-4">
              Update bio <FiChevronRight />
            </button>
          </motion.div>
        </div>

        {/* Right Column: Settings */}
        <div className="flex-1 space-y-6">
          {/* Account Settings Form */}
          <motion.div variants={sectionVariants} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-8">
            <h3 className="text-lg font-black text-slate-800 flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-full bg-orange-100 text-[#FF8000] flex items-center justify-center">
                <FiUser />
              </div>
              Account Settings
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="relative">
                <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] uppercase font-bold tracking-wider text-slate-400 z-10">Full Name</label>
                <input 
                  type="text" 
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm font-medium outline-none focus:border-[#FF8000] transition-colors"
                />
              </div>

              <div className="relative">
                <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] uppercase font-bold tracking-wider text-slate-400 z-10">Email Address</label>
                <input 
                  type="text" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm font-medium outline-none focus:border-[#FF8000] transition-colors"
                />
              </div>

              <div className="relative">
                <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] uppercase font-bold tracking-wider text-slate-400 z-10">School</label>
                <input 
                  type="text" 
                  value={formData.school}
                  onChange={(e) => setFormData({...formData, school: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm font-medium outline-none focus:border-[#FF8000] transition-colors"
                />
              </div>

              <div className="relative">
                <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] uppercase font-bold tracking-wider text-slate-400 z-10">Id</label>
                <input 
                  type="text" 
                  value={formData.id}
                  onChange={(e) => setFormData({...formData, id: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm font-medium outline-none focus:border-[#FF8000] transition-colors"
                />
              </div>

              <div className="relative">
                <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] uppercase font-bold tracking-wider text-slate-400 z-10">Preferred Language</label>
                <select 
                  value={formData.language}
                  onChange={(e) => setFormData({...formData, language: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm font-medium outline-none focus:border-[#FF8000] transition-colors appearance-none"
                >
                  <option value="English (United States)">English (United States)</option>
                  <option value="Arabic">Arabic</option>
                  <option value="French">French</option>
                </select>
                <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-800 pointer-events-none stroke-[3] w-4 h-4" />
              </div>
            </div>

            <div className="flex items-center justify-end gap-6 pt-6">
              <button className="text-slate-500 font-bold text-sm hover:text-slate-800 transition-colors">
                Cancel
              </button>
              <button 
                onClick={handleSaveProfile}
                className="px-8 py-3 bg-[#FF8000] text-white font-bold rounded-xl shadow-lg shadow-orange-100 hover:bg-orange-600 hover:-translate-y-0.5 transition-all text-sm"
              >
                Save Changes
              </button>
            </div>
          </motion.div>

          {/* Learning Preferences */}
          <motion.div variants={sectionVariants} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-8">
            <h3 className="text-lg font-black text-slate-800 flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-full bg-orange-100 text-[#FF8000] flex items-center justify-center">
                <FiSliders />
              </div>
              Learning Preferences
            </h3>
            
            <div className="space-y-8">
              {/* Toggle 1 */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">Email Notifications</h4>
                  <p className="text-xs text-slate-400">Weekly progress summaries and reminders</p>
                </div>
                <button 
                  onClick={() => handleTogglePreference('emailNotifications')}
                  className={`w-14 h-7 rounded-full p-1 transition-colors flex ${preferences.emailNotifications ? 'bg-[#FF8000] justify-end' : 'bg-slate-300 justify-start'}`}
                >
                  <motion.div layout transition={{ type: "spring", stiffness: 500, damping: 30 }} className="w-5 h-5 bg-white rounded-full shadow-sm" />
                </button>
              </div>

              {/* Toggle 2 */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">Missing assignments</h4>
                  <p className="text-xs text-slate-400">Activate assignment submission</p>
                </div>
                <button 
                  onClick={() => handleTogglePreference('missingAssignments')}
                  className={`w-14 h-7 rounded-full p-1 transition-colors flex ${preferences.missingAssignments ? 'bg-[#FF8000] justify-end' : 'bg-slate-300 justify-start'}`}
                >
                  <motion.div layout transition={{ type: "spring", stiffness: 500, damping: 30 }} className="w-5 h-5 bg-white rounded-full shadow-sm" />
                </button>
              </div>

              {/* Toggle 3 */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">New submissions</h4>
                  <p className="text-xs text-slate-400">Activate to send notifications for new submissions</p>
                </div>
                <button 
                  onClick={() => handleTogglePreference('newSubmissions')}
                  className={`w-14 h-7 rounded-full p-1 transition-colors flex ${preferences.newSubmissions ? 'bg-[#FF8000] justify-end' : 'bg-slate-300 justify-start'}`}
                >
                  <motion.div layout transition={{ type: "spring", stiffness: 500, damping: 30 }} className="w-5 h-5 bg-white rounded-full shadow-sm" />
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
};

export default SettingsPage;
