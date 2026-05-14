import React, { useState, useEffect } from 'react';
import { fetchAssignments, createAssignment, deleteAssignment } from '../api/assignments';
import type { Assignment } from '../types';
import toast from 'react-hot-toast';
import { FiPlus, FiTrash2, FiFileText } from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface AssignmentManagerProps {
  courseId: number;
}

export const AssignmentManager: React.FC<AssignmentManagerProps> = ({ courseId }) => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadAssignments = async () => {
    try {
      const data = await fetchAssignments(courseId);
      setAssignments(data);
    } catch (err) {
      toast.error('Failed to load assignments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssignments();
  }, [courseId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !dueDate) {
      toast.error('Please fill all fields');
      return;
    }

    setSubmitting(true);
    try {
      await createAssignment(courseId, { title, description, due_date: dueDate });
      toast.success('Assignment created');
      setShowForm(false);
      setTitle('');
      setDescription('');
      setDueDate('');
      loadAssignments();
    } catch (err) {
      toast.error('Failed to create assignment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Delete this assignment? Submissions will be lost.')) {
      try {
        await deleteAssignment(courseId, id);
        toast.success('Assignment deleted');
        loadAssignments();
      } catch (err) {
        toast.error('Failed to delete assignment');
      }
    }
  };

  if (loading) return <div className="py-4 text-gray-500">Loading assignments...</div>;

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Assignments</h2>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-blue-60 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition border border-blue-200"
        >
          <FiPlus /> {showForm ? 'Cancel' : 'New Assignment'}
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-2 border rounded-lg" disabled={submitting} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="w-full px-4 py-2 border rounded-lg" disabled={submitting} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full px-4 py-2 border rounded-lg" disabled={submitting} />
            </div>
            <div className="flex justify-end pt-2">
              <button type="submit" disabled={submitting} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                {submitting ? 'Saving...' : 'Save Assignment'}
              </button>
            </div>
          </form>
        </div>
      )}

      {assignments.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-500">
          No assignments created yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assignments.map(assignment => (
            <div key={assignment.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 text-blue-600 p-2 rounded">
                    <FiFileText />
                  </div>
                  <h3 className="font-semibold text-gray-800">{assignment.title}</h3>
                </div>
                <button onClick={() => handleDelete(assignment.id)} className="text-gray-400 hover:text-red-500">
                  <FiTrash2 />
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{assignment.description}</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                <span className="text-xs font-medium text-red-500">Due: {assignment.due_date}</span>
                <Link to={`/teacher/courses/${courseId}/assignments/${assignment.id}/review`} className="text-sm text-blue-600 hover:underline">
                  View Submissions
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
