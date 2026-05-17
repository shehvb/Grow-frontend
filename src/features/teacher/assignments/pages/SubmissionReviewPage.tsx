import type { FC } from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  FiArrowLeft, 
  FiDownload, 
  FiEye, 
  FiCheckCircle, 
  FiClock, 
  FiX,
  FiAward,
  FiMessageSquare
} from "react-icons/fi";
import { useAssignmentStore } from "../../../../store/useAssignmentStore";
import type { TeacherSubmission } from "../../../../types/teacher";
import { toast } from "react-hot-toast";

const SubmissionReviewPage: FC = () => {
  const { id } = useParams();
  const { assignments, currentSubmissions, fetchAssignments, fetchSubmissions, gradeSubmission, isLoading } = useAssignmentStore();
  
  const [selectedSubmission, setSelectedSubmission] = useState<TeacherSubmission | null>(null);
  const [grade, setGrade] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const assignment = assignments.find(a => a.id.toString() === id);

  useEffect(() => {
    if (id) {
      fetchAssignments();
      fetchSubmissions(parseInt(id, 10));
    }
  }, [id, fetchAssignments, fetchSubmissions]);

  const handleOpenGradeModal = (submission: TeacherSubmission) => {
    setSelectedSubmission(submission);
    setGrade(submission.score || 0);
    setFeedback(submission.feedback || "");
  };

  const handleSaveGrade = async () => {
    if (!selectedSubmission) return;
    try {
      await gradeSubmission(selectedSubmission.id, { score: grade, xp_reward: grade * 10, feedback });
      toast.success("Grade submitted successfully!");
      setSelectedSubmission(null);
    } catch (error) {
      toast.error("Failed to submit grade");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link 
            to="/teacher/assignments"
            className="w-12 h-12 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm"
          >
            <FiArrowLeft size={20} />
          </Link>
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">
              Review <span className="text-blue-600">Submissions</span>
            </h1>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">
              {assignment?.title || "Assignment"} • {currentSubmissions.length} Students
            </p>
          </div>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-8 py-6 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Student</th>
                <th className="px-8 py-6 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-6 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Submitted At</th>
                <th className="px-8 py-6 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Grade</th>
                <th className="px-8 py-6 text-right text-xs font-black text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {currentSubmissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-black text-sm">
                        {submission.student_name.charAt(0)}
                      </div>
                      <span className="font-black text-slate-800">{submission.student_name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      submission.status === 'graded' 
                        ? 'bg-emerald-50 text-emerald-600' 
                        : 'bg-orange-50 text-orange-600'
                    }`}>
                      {submission.status === 'graded' ? <FiCheckCircle size={12} /> : <FiClock size={12} />}
                      {submission.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-bold text-slate-500">
                      {new Date(submission.submitted_at).toLocaleString()}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    {submission.score !== undefined ? (
                      <span className="text-lg font-black text-blue-600">{submission.score} <span className="text-xs text-slate-400">/ {assignment?.max_marks}</span></span>
                    ) : (
                      <span className="text-sm font-bold text-slate-300">Not Graded</span>
                    )}
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => {
                          setSelectedSubmission(submission);
                          setIsPreviewOpen(true);
                        }}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                        title="Preview"
                      >
                        <FiEye size={18} />
                      </button>
                      <a 
                        href={submission.file_url} 
                        download
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                        title="Download"
                      >
                        <FiDownload size={18} />
                      </a>
                      <button 
                        onClick={() => handleOpenGradeModal(submission)}
                        className="ml-2 bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-black hover:bg-blue-600 transition-all"
                      >
                        Grade
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grading Modal */}
      {selectedSubmission && !isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedSubmission(null)} />
          <div className="relative bg-white w-full max-w-lg rounded-[3rem] shadow-2xl p-10 animate-slide-up">
            <button 
              onClick={() => setSelectedSubmission(null)}
              className="absolute right-8 top-8 text-slate-300 hover:text-slate-800 transition-colors"
            >
              <FiX size={24} />
            </button>
            
            <div className="space-y-8">
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-800">Grade Submission</h3>
                <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">Student: {selectedSubmission.student_name}</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <FiAward className="text-blue-500" /> Score (out of {assignment?.max_marks})
                  </label>
                  <input 
                    type="number" 
                    max={assignment?.max_marks}
                    value={grade}
                    onChange={e => setGrade(parseInt(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xl font-black text-slate-800 focus:bg-white focus:border-blue-400 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <FiMessageSquare className="text-blue-500" /> Feedback
                  </label>
                  <textarea 
                    rows={4}
                    value={feedback}
                    onChange={e => setFeedback(e.target.value)}
                    placeholder="Well done! Keep it up."
                    className="w-full bg-slate-50 border border-slate-100 rounded-[1.5rem] px-6 py-4 text-sm font-bold text-slate-700 focus:bg-white focus:border-blue-400 outline-none transition-all resize-none"
                  />
                </div>

                <button 
                  onClick={handleSaveGrade}
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-5 rounded-[1.5rem] font-black text-lg hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all disabled:opacity-70"
                >
                  {isLoading ? "Saving..." : "Submit Grade"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {selectedSubmission && isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-8">
          <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md" onClick={() => { setIsPreviewOpen(false); setSelectedSubmission(null); }} />
          <div className="relative bg-white w-full h-full rounded-[3rem] shadow-2xl flex flex-col overflow-hidden animate-fade-in">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                  <FiEye size={20} />
                </div>
                <h3 className="text-xl font-black text-slate-800">Submission Preview: <span className="text-blue-600">{selectedSubmission.student_name}</span></h3>
              </div>
              <button 
                onClick={() => { setIsPreviewOpen(false); setSelectedSubmission(null); }}
                className="p-3 bg-slate-50 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="flex-1 bg-slate-100 flex items-center justify-center p-12 overflow-auto">
              {selectedSubmission.file_url?.endsWith('.pdf') ? (
                <iframe 
                  src={selectedSubmission.file_url} 
                  className="w-full h-full rounded-2xl shadow-2xl"
                  title="PDF Preview"
                />
              ) : (
                <img 
                  src={selectedSubmission.file_url} 
                  className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl" 
                  alt="Submission Preview"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionReviewPage;
