import type { FC } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FiArrowLeft,
  FiCheckSquare,
  FiCheckCircle,
  FiAward,
  FiXCircle,
  FiDownload,
  FiClock
} from "react-icons/fi";
import { BsFilter } from "react-icons/bs";

const MOCK_SUBMISSIONS = [
  {
    id: "s1",
    studentName: "Emma Watson",
    class: "Class C",
    status: "Submitted",
    submittedAt: "Apr 8, 2026 2:30 PM",
    file: "emma_algebra_worksheet.pdf",
    grade: "",
    xp: "",
    feedback: ""
  },
  {
    id: "s2",
    studentName: "James Smith",
    class: "Class C",
    status: "Graded",
    submittedAt: "Apr 8, 2026 2:00 PM",
    file: "james_algebra_worksheet.pdf",
    grade: "95%",
    xp: "150",
    feedback: "Excellent work! All problems solved correctly."
  },
  {
    id: "s3",
    studentName: "Liam Wilson",
    class: "Class B",
    status: "Missing",
    submittedAt: "",
    file: "",
    grade: "",
    xp: "",
    feedback: ""
  }
];

const ReviewSubmissionsPage: FC = () => {
  const [submissions, setSubmissions] = useState(MOCK_SUBMISSIONS);
  const [gradingState, setGradingState] = useState<Record<string, { grade: string, xp: string, feedback: string }>>({});
  const [selectedClass, setSelectedClass] = useState<string>("All");

  const classes = ["All", ...Array.from(new Set(MOCK_SUBMISSIONS.map(sub => sub.class)))];

  const filteredSubmissions = submissions.filter(sub => selectedClass === "All" || sub.class === selectedClass);

  const handleGradeChange = (subId: string, field: string, value: string) => {
    setGradingState(prev => ({
      ...prev,
      [subId]: { ...prev[subId], [field]: value }
    }));
  };

  const submitGrade = (subId: string) => {
    const grades = gradingState[subId];
    if (!grades?.grade || !grades?.xp) {
      alert("Please enter a grade and XP.");
      return;
    }

    setSubmissions(prev => prev.map(sub => {
      if (sub.id === subId) {
        return {
          ...sub,
          status: "Graded",
          grade: grades.grade + "%",
          xp: grades.xp,
          feedback: grades.feedback
        };
      }
      return sub;
    }));
  };

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Link to="/teacher/assignments" className="flex items-center text-slate-800 font-black text-2xl hover:text-blue-600 transition-colors w-fit">
            <FiArrowLeft className="mr-3 text-xl" />
            Review Submissions
          </Link>
          <p className="text-slate-400 font-medium ml-9">Algebraic Expressions Worksheet</p>
        </div>
        
        <div className="relative flex items-center">
          <div className="flex items-center bg-white border border-slate-200 rounded-xl px-4 py-2 shadow-sm cursor-pointer hover:border-slate-300 transition-colors">
            <BsFilter className="text-slate-500 mr-2 text-lg" />
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="bg-transparent text-sm font-bold text-slate-700 outline-none cursor-pointer appearance-none pr-4"
            >
              {classes.map(c => (
                <option key={c} value={c}>{c === "All" ? "All Classes" : c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">Total Students</p>
            <span className="text-3xl font-black text-slate-800">45</span>
          </div>
          <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-400 flex items-center justify-center">
            <FiCheckSquare />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">Submitted</p>
            <span className="text-3xl font-black text-slate-800">38</span>
          </div>
          <div className="w-8 h-8 rounded-lg bg-green-50 text-green-500 flex items-center justify-center">
            <FiCheckCircle />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">Scored</p>
            <span className="text-3xl font-black text-slate-800">12</span>
          </div>
          <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-500 flex items-center justify-center">
            <FiAward />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">Missing</p>
            <span className="text-3xl font-black text-slate-800">7</span>
          </div>
          <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center">
            <FiXCircle />
          </div>
        </div>
      </div>

      {/* Submissions List */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
        <h3 className="text-lg font-black text-slate-800">Student Submissions</h3>
        
        <div className="space-y-6">
          {filteredSubmissions.map(sub => {
            const initials = sub.studentName.split(' ').map(n => n[0]).join('');
            
            return (
              <div key={sub.id} className="bg-slate-50 border border-slate-100 rounded-[2rem] p-6 lg:p-8">
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#FF8000] text-white flex items-center justify-center font-black tracking-widest text-lg shrink-0">
                    {initials}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <h4 className="text-base font-black text-slate-800">{sub.studentName}</h4>
                      <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                        sub.status === 'Submitted' ? 'bg-blue-100 text-blue-600' :
                        sub.status === 'Graded' ? 'bg-green-100 text-green-600' :
                        'bg-red-100 text-red-500'
                      }`}>
                        {sub.status}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-400">{sub.class}</p>
                  </div>
                </div>

                {/* Submitted Info */}
                {sub.status !== 'Missing' && (
                  <div className="space-y-3 mb-6">
                    <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                      <FiClock />
                      Submitted: {sub.submittedAt}
                    </p>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-black text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
                      <FiDownload />
                      {sub.file}
                    </button>
                  </div>
                )}

                {/* Grading Area */}
                {sub.status === 'Submitted' && (
                  <div className="bg-white rounded-3xl p-6 border border-slate-100 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Score(%)</label>
                        <input 
                          type="number" 
                          placeholder="0-100"
                          value={gradingState[sub.id]?.grade || ""}
                          onChange={(e) => handleGradeChange(sub.id, 'grade', e.target.value)}
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold text-slate-600 outline-none focus:border-orange-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Xp Awarded</label>
                        <input 
                          type="number" 
                          placeholder="150"
                          value={gradingState[sub.id]?.xp || ""}
                          onChange={(e) => handleGradeChange(sub.id, 'xp', e.target.value)}
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold text-slate-600 outline-none focus:border-orange-400"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Feedback</label>
                      <textarea 
                        rows={3}
                        placeholder="provide feedback to the student..."
                        value={gradingState[sub.id]?.feedback || ""}
                        onChange={(e) => handleGradeChange(sub.id, 'feedback', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold text-slate-600 outline-none focus:border-orange-400 resize-none"
                      />
                    </div>
                    <button 
                      onClick={() => submitGrade(sub.id)}
                      className="px-6 py-3 bg-[#FF8000] text-white font-black rounded-xl hover:bg-orange-600 transition-all text-xs shadow-lg shadow-orange-100 uppercase tracking-wider"
                    >
                      Submit Grade
                    </button>
                  </div>
                )}

                {/* Graded Summary */}
                {sub.status === 'Graded' && (
                  <div className="bg-white rounded-3xl p-6 border border-slate-100 space-y-2">
                    <p className="text-xs font-black text-slate-800 tracking-wider">
                      Score: <span className="text-green-500 ml-1">{sub.grade}</span>
                    </p>
                    <div>
                      <p className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-1">Feedback:</p>
                      <p className="text-xs font-medium text-slate-500 leading-relaxed">{sub.feedback}</p>
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReviewSubmissionsPage;
