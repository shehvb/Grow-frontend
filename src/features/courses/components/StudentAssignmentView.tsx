import React, { useState, useEffect } from 'react';
import { fetchAssignments } from '../api/assignments';
import { submitAssignment } from '../api/submissions';
import type { Assignment } from '../types';
import toast from 'react-hot-toast';
import { FiFileText, FiUpload, FiCheckCircle } from 'react-icons/fi';

interface StudentAssignmentViewProps {
  courseId: number;
}

export const StudentAssignmentView: React.FC<StudentAssignmentViewProps> = ({ courseId }) => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Track submission state locally for UX (ideally fetched from backend)
  const [submittedStatus, setSubmittedStatus] = useState<Record<number, boolean>>({});
  const [activeAssignmentId, setActiveAssignmentId] = useState<number | null>(null);
  const [submissionContent, setSubmissionContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadAssignments = async () => {
      try {
        const data = await fetchAssignments(courseId);
        setAssignments(data);
      } catch (err) {
        // Silent fail or toast
      } finally {
        setLoading(false);
      }
    };
    if (courseId) loadAssignments();
  }, [courseId]);

  const handleSubmit = async (assignmentId: number) => {
    if (!submissionContent.trim()) {
      toast.error('Please enter your submission content.');
      return;
    }

    setSubmitting(true);
    try {
      await submitAssignment(courseId, assignmentId, { content: submissionContent });
      toast.success('Assignment submitted successfully!');
      setSubmittedStatus(prev => ({ ...prev, [assignmentId]: true }));
      setActiveAssignmentId(null);
      setSubmissionContent('');
    } catch (err: any) {
      if (err.response?.status === 400 || err.response?.status === 409) {
        toast.error('You have already submitted this assignment.');
        setSubmittedStatus(prev => ({ ...prev, [assignmentId]: true }));
        setActiveAssignmentId(null);
      } else {
        toast.error('Failed to submit assignment.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="py-4 text-gray-500">Loading assignments...</div>;
  if (assignments.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Course Assignments</h2>
      
      <div className="space-y-4">
        {assignments.map(assignment => (
          <div key={assignment.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <FiFileText className="text-blue-500 text-xl" />
                  <h3 className="text-xl font-semibold text-gray-800">{assignment.title}</h3>
                </div>
                <p className="text-gray-600 mb-2">{assignment.description}</p>
                <p className="text-sm text-red-500 font-medium mb-4">Due Date: {assignment.due_date}</p>
              </div>

              <div className="shrink-0 ml-4">
                {submittedStatus[assignment.id] ? (
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg font-medium text-sm">
                    <FiCheckCircle /> Submitted
                  </div>
                ) : (
                  <button 
                    onClick={() => setActiveAssignmentId(activeAssignmentId === assignment.id ? null : assignment.id)}
                    className="px-4 py-2 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-100 transition font-medium text-sm flex items-center gap-2"
                  >
                    <FiUpload /> {activeAssignmentId === assignment.id ? 'Cancel' : 'Submit Work'}
                  </button>
                )}
              </div>
            </div>

            {activeAssignmentId === assignment.id && !submittedStatus[assignment.id] && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Submission</label>
                <textarea 
                  value={submissionContent}
                  onChange={e => setSubmissionContent(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3"
                  placeholder="Type your answer or provide links to your work..."
                  disabled={submitting}
                />
                <div className="flex justify-end">
                  <button 
                    onClick={() => handleSubmit(assignment.id)}
                    disabled={submitting}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-70"
                  >
                    {submitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
