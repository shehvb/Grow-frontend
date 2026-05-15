import type { FC } from "react";
import { useState, useEffect } from "react";
import { 
  FiUser, 
  FiMail, 
  FiCamera, 
  FiSave,
  FiFileText
} from "react-icons/fi";
import { teacherService, type TeacherProfile } from "../../../../services/teacherService";
import { toast } from "react-hot-toast";

const ProfilePage: FC = () => {
  const [profile, setProfile] = useState<TeacherProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    bio: ""
  });
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await teacherService.getProfile();
        setProfile(data);
        setFormData({
          first_name: data.first_name,
          last_name: data.last_name,
          bio: data.bio || ""
        });
        setPreview(data.profile_picture || null);
      } catch (error) {
        toast.error("Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const data = new FormData();
      data.append('first_name', formData.first_name);
      data.append('last_name', formData.last_name);
      data.append('bio', formData.bio);
      if (avatar) {
        data.append('profile_picture', avatar);
      }
      await teacherService.updateProfile(data);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-slate-800 tracking-tight">
          Teacher <span className="text-blue-600">Profile</span>
        </h1>
        <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">
          Manage your personal identity and public bio
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Quick Info */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col items-center text-center space-y-6">
            <div className="relative group">
              <div className="w-40 h-40 bg-slate-100 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl">
                {preview ? (
                  <img src={preview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <FiUser size={64} />
                  </div>
                )}
              </div>
              <button 
                onClick={() => document.getElementById('avatar-upload')?.click()}
                className="absolute bottom-2 right-2 p-3 bg-blue-600 text-white rounded-2xl shadow-xl hover:bg-blue-700 hover:scale-110 transition-all"
              >
                <FiCamera size={20} />
              </button>
              <input 
                id="avatar-upload"
                type="file" 
                hidden 
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </div>
            
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-slate-800">{formData.first_name} {formData.last_name}</h3>
              <p className="text-sm font-bold text-slate-400">{profile?.email}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Form Fields */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">First Name</label>
                <div className="relative">
                  <FiUser className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    value={formData.first_name}
                    onChange={e => setFormData({...formData, first_name: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-14 pr-6 py-4 text-sm font-bold text-slate-800 focus:bg-white focus:border-blue-400 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Last Name</label>
                <div className="relative">
                  <FiUser className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    value={formData.last_name}
                    onChange={e => setFormData({...formData, last_name: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-14 pr-6 py-4 text-sm font-bold text-slate-800 focus:bg-white focus:border-blue-400 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Bio / Introduction</label>
              <div className="relative">
                <FiFileText className="absolute left-5 top-6 text-slate-400" />
                <textarea 
                  rows={6}
                  value={formData.bio}
                  onChange={e => setFormData({...formData, bio: e.target.value})}
                  placeholder="Tell students about yourself..."
                  className="w-full bg-slate-50 border border-slate-100 rounded-[2rem] pl-14 pr-6 py-5 text-sm font-bold text-slate-700 focus:bg-white focus:border-blue-400 outline-none transition-all resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button 
                onClick={handleSave}
                disabled={isLoading}
                className="flex items-center gap-3 bg-blue-600 text-white px-10 py-5 rounded-[1.5rem] font-black hover:bg-blue-700 hover:-translate-y-1 transition-all shadow-xl shadow-blue-100 disabled:opacity-70"
              >
                <FiSave size={20} />
                {isLoading ? "Saving..." : "Update Profile"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
