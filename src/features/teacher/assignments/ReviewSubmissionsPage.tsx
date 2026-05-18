import type { FC } from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
import { assignmentService } from "../../../services/assignmentService";

interface UIMappedSubmission {
  id: string;
  studentName: string;
  class: string;
  status: string;
  submittedAt: string;
  file: string;
  file_url: string;
  grade: string;
  xp: string;
  feedback: string;
}

const getMediaUrl = (path?: string) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  
  const baseUrl = "https://ahmeddali.pythonanywhere.com";
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const mediaPath = normalizedPath.startsWith("/media/") ? normalizedPath : `/media${normalizedPath}`;
  return `${baseUrl}${mediaPath}`;
};

const ReviewSubmissionsPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [submissions, setSubmissions] = useState<UIMappedSubmission[]>([]);
  const [summary, setSummary] = useState({
    total_students: 0,
    submitted: 0,
    scored: 0,
    missing: 0
  });
  const [loading, setLoading] = useState(true);
  const [gradingState, setGradingState] = useState<Record<string, { grade: string, xp: string, feedback: string }>>({});
  const [selectedClass, setSelectedClass] = useState<string>("All");

  useEffect(() => {
    if (!id) return;
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const res = await assignmentService.getSubmissions(Number(id));
        
        // Handle backend returning { summary, submissions } or raw array
        const submissionsArray = res && Array.isArray(res.submissions) ? res.submissions : (Array.isArray(res) ? res : []);
        const backendSummary = res && res.summary ? res.summary : null;

        const mapped = submissionsArray.map((sub: any) => {
          let statusText = 'Missing';
          const normalizedStatus = (sub.status || '').toLowerCase();
          if (normalizedStatus === 'submitted' || normalizedStatus === 'pending') {
            statusText = 'Submitted';
          } else if (normalizedStatus === 'graded' || sub.is_graded === true) {
            statusText = 'Graded';
          }
          
          const rawFilePath = sub.file || sub.file_url || '';
          
          return {
            id: sub.id.toString(),
            studentName: sub.student_name || 'Unknown Student',
            class: 'All', // API does not provide class info yet
            status: statusText,
            submittedAt: sub.submitted_at ? new Date(sub.submitted_at).toLocaleString() : '',
            file: rawFilePath ? rawFilePath.split('/').pop() || 'file' : '',
            file_url: rawFilePath,
            grade: sub.raw_score != null ? `${sub.raw_score}%` : (sub.score != null ? `${sub.score}%` : ''),
            xp: sub.xp_awarded != null ? sub.xp_awarded.toString() : (sub.xp_reward != null ? sub.xp_reward.toString() : ''),
            feedback: sub.feedback || ''
          };
        });

        setSubmissions(mapped);

        if (backendSummary) {
          setSummary({
            total_students: backendSummary.total_students || 0,
            submitted: backendSummary.submitted || 0,
            scored: backendSummary.scored || 0,
            missing: backendSummary.missing || 0
          });
        } else {
          setSummary({
            total_students: mapped.length,
            submitted: mapped.filter((s: any) => s.status !== 'Missing').length,
            scored: mapped.filter((s: any) => s.status === 'Graded').length,
            missing: mapped.filter((s: any) => s.status === 'Missing').length
          });
        }
      } catch (err) {
        console.error("Failed to fetch submissions", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, [id]);

  const classes = ["All", ...Array.from(new Set(submissions.map(sub => sub.class)))];

  const filteredSubmissions = submissions.filter(sub => selectedClass === "All" || sub.class === selectedClass);

  const handleGradeChange = (subId: string, field: string, value: string) => {
    setGradingState(prev => ({
      ...prev,
      [subId]: { ...prev[subId], [field]: value }
    }));
  };

  const submitGrade = async (subId: string) => {
    const grades = gradingState[subId];
    if (!grades?.grade || !grades?.xp) {
      alert("Please enter a grade and XP.");
      return;
    }

    try {
      await assignmentService.gradeSubmission(Number(subId), {
        score: Number(grades.grade),
        xp_reward: Number(grades.xp),
        feedback: grades.feedback || ''
      });

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

      // Update local summary state
      setSummary(prev => ({
        ...prev,
        scored: prev.scored + 1
      }));
    } catch (err) {
      console.error("Failed to grade submission", err);
      alert("Failed to submit grade. Please try again.");
    }
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
            <span className="text-3xl font-black text-slate-800">{summary.total_students}</span>
          </div>
          <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-400 flex items-center justify-center">
            <FiCheckSquare />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">Submitted</p>
            <span className="text-3xl font-black text-slate-800">{summary.submitted}</span>
          </div>
          <div className="w-8 h-8 rounded-lg bg-green-50 text-green-500 flex items-center justify-center">
            <FiCheckCircle />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">Scored</p>
            <span className="text-3xl font-black text-slate-800">{summary.scored}</span>
          </div>
          <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-500 flex items-center justify-center">
            <FiAward />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">Missing</p>
            <span className="text-3xl font-black text-slate-800">{summary.missing}</span>
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
          {loading ? (
            <p className="text-slate-500 font-medium">Loading submissions...</p>
          ) : filteredSubmissions.length === 0 ? (
            <p className="text-slate-500 font-medium">No submissions found.</p>
          ) : filteredSubmissions.map(sub => {
            const initials = sub.studentName ? sub.studentName.split(' ').map(n => n[0]).join('') : '?';
            
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
                    {sub.file_url ? (
                      <a 
                        href={getMediaUrl(sub.file_url)} 
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-black text-slate-600 hover:bg-slate-50 transition-colors shadow-sm hover:border-slate-300"
                      >
                        <FiDownload className="text-slate-500" />
                        <span>{sub.file || 'download_submission.pdf'}</span>
                      </a>
                    ) : (
                      <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold text-slate-400 select-none w-fit">
                        <FiXCircle />
                        <span>No file uploaded</span>
                      </div>
                    )}
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
