import type { FC } from "react";
import StudentProfileCard from "./components/StudentProfileCard";
import AccountSettingsCard from "./components/AccountSettingsCard";
import LearningPreferencesCard from "./components/LearningPreferencesCard";
import { MOCK_STUDENT_PROFILE_DATA, MOCK_STUDENT_LEARNING_PREFS, MOCK_STUDENTS } from "../../mock/parent.mock";

const SettingsPage: FC = () => {
  // Use Mazen Ali (s1) for the student view mockup
  const student = MOCK_STUDENTS[0];
  const profile = MOCK_STUDENT_PROFILE_DATA["s1"];
  const preferences = MOCK_STUDENT_LEARNING_PREFS["s1"];

  return (
    <div className="max-w-[1200px] mx-auto pb-12">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-1">Profile & Settings</h1>
        <p className="text-slate-400 font-medium tracking-tight">Account Overview</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column - Profile */}
        <div className="lg:col-span-4 h-full">
          <StudentProfileCard 
            profile={profile} 
            studentName={student.name} 
            gradeLevel={student.gradeLevel} 
          />
        </div>

        {/* Right Column - Account & Learning */}
        <div className="lg:col-span-8 flex flex-col gap-8 h-full">
          <div className="flex-1">
            <AccountSettingsCard 
              profile={profile} 
              studentName={student.name} 
            />
          </div>
          <div className="lg:h-auto">
            <LearningPreferencesCard 
              preferences={preferences} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;


