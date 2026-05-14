import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSubmissions, gradeSubmission } from '../api/submissions';
import type { Submission } from '../types';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';

export const GradingView: React.FC = () => {
  const { id, assignmentId } = useParams<{ id: string, assignmentId: string }>();
  const courseIdNum = parseInt(id || '0', 10);
  const assignmentIdNum = parseInt(assignmentId || '0', 10);
  const navigate = useNavigate();

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [gradingId, setGradingId] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadSubmissions = async () => {
    try {
      const data = await fetchSubmissions(courseIdNum, assignmentIdNum);
      setSubmissions(data);
    } catch (err) {
      toast.error('Failed to load submissions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseIdNum && assignmentIdNum) {
      loadSubmissions();
    }
  }, [courseIdNum, assignmentIdNum]);

  const handleGrade = async (submissionId: number) => {
    setSubmitting(true);
    try {
      await gradeSubmission(courseIdNum, assignmentIdNum, submissionId, { score, feedback });
      toast.success('Grade saved successfully');
      setGradingId(null);
      setScore(0);
      setFeedback('');
      loadSubmissions(); // refresh to show updated status
    } catch (err) {
      toast.error('Failed to save grade');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading submissions...</div>;

  return (
    <div className="container mx-auto p-6 max-w-[1320px]">
      <button 
        onClick={() => navigate(`/teacher/courses/${courseIdNum}`)}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-6 transition"
      >
        <FiArrowLeft /> Back to Course
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Review Submissions</h1>
        <p className="text-gray-600">Review and grade student work for this assignment.</p>
      </div>

      {submissions.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center text-gray-500">
          No submissions found for this assignment yet.
        </div>
      ) : (
        <div className="space-y-6">
          {submissions.map(sub => (
            <div key={sub.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-gray-800">Student ID: {sub.student}</h3>
                  <p className="text-sm text-gray-500">Submitted at: {new Date(sub.submitted_at).toLocaleString()}</p>
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase ${
                    sub.status === 'graded' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {sub.status}
                  </span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-4 text-gray-700 whitespace-pre-wrap">
                {sub.content}
              </div>

              {sub.status === 'graded' ? (
                <div className="border-t border-gray-100 pt-4 flex gap-8">
                  <div>
                    <span className="text-sm text-gray-500 block mb-1">Score</span>
                    <span className="font-bold text-lg text-gray-800">{sub.score} / 100</span>
                  </div>
                  {sub.feedback && (
                    <div className="flex-1">
                      <span className="text-sm text-gray-500 block mb-1">Feedback</span>
                      <p className="text-gray-700">{sub.feedback}</p>
                    </div>
                  )}
                  <button 
                    onClick={() => {
                      setGradingId(sub.id);
                      setScore(sub.score || 0);
                      setFeedback(sub.feedback || '');
                    }}
                    className="text-blue-600 hover:underline text-sm font-medium h-fit"
                  >
                    Edit Grade
                  </button>
                </div>
              ) : (
                gradingId === sub.id ? (
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex gap-4 items-start">
                      <div className="w-32">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Score</label>
                        <input 
                          type="number" 
                          value={score} 
                          onChange={(e) => setScore(Number(e.target.value))} 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Feedback (Optional)</label>
                        <textarea 
                          value={feedback} 
                          onChange={(e) => setFeedback(e.target.value)} 
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div className="pt-6">
                        <button 
                          onClick={() => handleGrade(sub.id)}
                          disabled={submitting}
                          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-70"
                        >
                          <FiCheck /> Save
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="border-t border-gray-100 pt-4 flex justify-end">
                    <button 
                      onClick={() => setGradingId(sub.id)}
                      className="px-6 py-2 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-100 transition font-medium text-sm"
                    >
                      Grade Submission
                    </button>
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
