import type { FC } from "react";
import { useState } from "react";
import { 
  FiEdit2, 
  FiUser, 
  FiSliders, 
  FiChevronDown, 
  FiChevronRight
} from "react-icons/fi";

const SettingsPage: FC = () => {
  const [formData, setFormData] = useState({
    fullName: "Ahmed",
    email: "663254", // From mockup
    phone: "+20 1254684364",
    password: "••••••••",
    language: "English (United States)"
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    missingAssignments: false,
    newSubmissions: true
  });

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      {/* Header Area */}
      <div className="space-y-1">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Profile & Settings</h1>
        <p className="text-slate-400 font-medium">Account Overview</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column: Profile Info */}
        <div className="lg:w-[320px] shrink-0 space-y-6">
          {/* Profile Card */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="w-32 h-32 rounded-full bg-slate-200"></div>
              <button className="absolute bottom-1 right-1 w-8 h-8 bg-[#FF8000] text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white hover:bg-orange-600 transition-colors">
                <FiEdit2 className="w-4 h-4" />
              </button>
            </div>
            <h2 className="text-xl font-black text-slate-800 mb-1">Mr.Ahmed</h2>
            <p className="text-sm font-bold text-slate-400">Math Teacher</p>
          </div>

          {/* About Me Card */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-4">
            <h3 className="text-base font-black text-slate-800">About Me</h3>
            <p className="text-sm font-medium text-slate-500 leading-relaxed">
              Passionate Math teacher with 8 years of experience.
            </p>
            <button className="text-[#FF8000] text-sm font-bold flex items-center gap-1 hover:text-orange-600 transition-colors pt-4">
              Update bio <FiChevronRight />
            </button>
          </div>
        </div>

        {/* Right Column: Settings */}
        <div className="flex-1 space-y-6">
          {/* Account Settings Form */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-8">
            <h3 className="text-lg font-black text-slate-800 flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-full bg-orange-100 text-[#FF8000] flex items-center justify-center">
                <FiUser />
              </div>
              Account Settings
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Full Name</label>
                <input 
                  type="text" 
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full bg-transparent border-b-2 border-slate-200 py-2 text-sm font-bold text-slate-800 outline-none focus:border-[#FF8000] transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Email Address</label>
                <input 
                  type="text" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-transparent border-b-2 border-slate-200 py-2 text-sm font-bold text-slate-800 outline-none focus:border-[#FF8000] transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Phone Number</label>
                <input 
                  type="text" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-transparent border-b-2 border-slate-200 py-2 text-sm font-bold text-slate-800 outline-none focus:border-[#FF8000] transition-colors"
                />
              </div>

              <div className="space-y-2 relative">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Password</label>
                <input 
                  type="password" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-transparent border-b-2 border-slate-200 py-2 text-sm font-bold text-slate-800 outline-none focus:border-[#FF8000] transition-colors"
                />
                <button className="absolute right-0 bottom-2 text-[#FF8000] text-xs font-bold hover:text-orange-600 transition-colors">
                  Change Password
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Preferred Language</label>
                <div className="relative">
                  <select 
                    value={formData.language}
                    onChange={(e) => setFormData({...formData, language: e.target.value})}
                    className="w-full bg-transparent border-b-2 border-slate-200 py-2 text-sm font-bold text-slate-800 outline-none focus:border-[#FF8000] transition-colors appearance-none"
                  >
                    <option value="English (United States)">English (United States)</option>
                    <option value="Arabic">Arabic</option>
                    <option value="French">French</option>
                  </select>
                  <FiChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none stroke-[3]" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-6 pt-6">
              <button className="text-slate-500 font-bold text-sm hover:text-slate-800 transition-colors">
                Cancel
              </button>
              <button className="px-8 py-3 bg-[#FF8000] text-white font-bold rounded-xl shadow-lg shadow-orange-100 hover:bg-orange-600 hover:-translate-y-0.5 transition-all text-sm">
                Save Changes
              </button>
            </div>
          </div>

          {/* Learning Preferences */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-8">
            <h3 className="text-lg font-black text-slate-800 flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-full bg-orange-100 text-[#FF8000] flex items-center justify-center">
                <FiSliders />
              </div>
              Learning Preferences
            </h3>
            
            <div className="space-y-6">
              {/* Toggle 1 */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black text-slate-800 mb-0.5">Email Notifications</h4>
                  <p className="text-xs font-medium text-slate-400">Weekly progress summaries and reminders</p>
                </div>
                <button 
                  onClick={() => setPreferences({...preferences, emailNotifications: !preferences.emailNotifications})}
                  className={`w-12 h-6 rounded-full p-1 transition-colors relative shrink-0 ${preferences.emailNotifications ? 'bg-[#FF8000]' : 'bg-slate-300'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${preferences.emailNotifications ? 'left-[26px]' : 'left-1'}`} />
                </button>
              </div>

              <hr className="border-slate-100" />

              {/* Toggle 2 */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black text-slate-800 mb-0.5">Missing assignments</h4>
                  <p className="text-xs font-medium text-slate-400">Activate assignment submission</p>
                </div>
                <button 
                  onClick={() => setPreferences({...preferences, missingAssignments: !preferences.missingAssignments})}
                  className={`w-12 h-6 rounded-full p-1 transition-colors relative shrink-0 ${preferences.missingAssignments ? 'bg-[#FF8000]' : 'bg-slate-300'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${preferences.missingAssignments ? 'left-[26px]' : 'left-1'}`} />
                </button>
              </div>

              <hr className="border-slate-100" />

              {/* Toggle 3 */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black text-slate-800 mb-0.5">New submissions</h4>
                  <p className="text-xs font-medium text-slate-400">Activate to send notifications for new submissions</p>
                </div>
                <button 
                  onClick={() => setPreferences({...preferences, newSubmissions: !preferences.newSubmissions})}
                  className={`w-12 h-6 rounded-full p-1 transition-colors relative shrink-0 ${preferences.newSubmissions ? 'bg-[#FF8000]' : 'bg-slate-300'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${preferences.newSubmissions ? 'left-[26px]' : 'left-1'}`} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
