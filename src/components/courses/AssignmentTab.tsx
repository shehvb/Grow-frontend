import React, { useState, useEffect, useRef } from "react";
import type { FC } from "react";
import type { StudentAssignment as Assignment } from "../../types";
import { assignmentService } from "../../services/assignmentService";

interface AssignmentTabProps {
  assignments?: Assignment[];
}

const AssignmentTab: FC<AssignmentTabProps> = ({ assignments }) => {
  if (!assignments || assignments.length === 0) {
    return (
      <div className="py-20 text-center bg-white rounded-[24px] border border-slate-100 shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 mb-2">Assignments</h3>
        <p className="text-slate-400 font-medium tracking-wide">No assignments posted for this course right now.</p>
      </div>
    );
  }

  // We will display just the first assignment for simplicity or iterate if needed.
  // Rendering the detailed view for the active assignment.
  const assignment = assignments[0];
  const targetDate = assignment.due_date || assignment.deadline || "";
  const xpReward = assignment.xp_reward || 150;
  const latePenalty = 20;
  const fileUrl = assignment.teacher_file_url || assignment.teacher_file || "#";
  const fileName = assignment.teacher_file ? assignment.teacher_file.substring(assignment.teacher_file.lastIndexOf('/') + 1) : "assignment.pdf";
  const instructions = ["Download the assignment file uploaded by your teacher.", "Complete the exercises as per instructions.", "Upload your completed assignment as a PDF or Word document in the area below.", "After uploading, press the \"Submit Assignment\" button to finalize submission."];

  const [remainingTime, setRemainingTime] = useState<string>("");
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const deadline = new Date(targetDate).getTime();
      const difference = deadline - now;

      if (difference <= 0) {
        setRemainingTime("Deadline Passed");
        setIsExpired(true);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      
      setRemainingTime(`${days}d ${hours}h ${minutes}m remaining`);
      setIsExpired(false);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // update every minute

    return () => clearInterval(timer);
  }, [targetDate]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setError("");
    const file = e.dataTransfer.files[0];
    validateAndSetFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    const allowedTypes = [
      "application/pdf", 
      "application/msword", 
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a PDF, DOC, or DOCX file.");
      return;
    }
    
    if (file.size > 50 * 1024 * 1024) {
      setError("File size must be under 50MB.");
      return;
    }
    
    setUploadedFile(file);
  };

  const handleSubmit = async () => {
    if (!uploadedFile) {
      setError("Please upload an assignment file before submitting.");
      return;
    }

    if (isExpired) {
      setError("The deadline has passed. Submission is locked.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Submit Assignment
      await assignmentService.submitStudentAssignment(assignment.id, uploadedFile);
      
      setIsSubmitted(true);
    } catch (err) {
      setError("An error occurred during submission. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formattedDeadlineDate = new Date(targetDate).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="bg-transparent animate-fade-up">
      {/* Top Value Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Deadline Card */}
        <div className="bg-[#EEF2FF] border border-[#C7D2FE] rounded-[16px] p-6 flex items-start gap-4 shadow-sm">
          <div className="mt-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 6V12L16 14" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 mb-1">Deadline</div>
            <div className="text-base font-bold text-slate-900 mb-1">{formattedDeadlineDate}</div>
            <div className={`text-xs font-bold ${isExpired ? 'text-red-500' : 'text-[#4F46E5]'}`}>
              {remainingTime}
            </div>
          </div>
        </div>

        {/* XP Rewards Card */}
        <div className="bg-[#FFF7ED] border border-[#FFEDD5] rounded-[16px] p-6 flex items-start gap-4 shadow-sm">
          <div className="mt-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="#F97316" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 mb-1">XP Rewards</div>
            <div className="text-base font-bold text-[#EA580C] mb-1">+{xpReward} XP</div>
            <div className="text-xs font-bold text-[#EA580C]">
              ⚠ -{latePenalty} XP if late
            </div>
          </div>
        </div>
      </div>

      {/* Assignment File View */}
      <div className="bg-[#F8F8FF] border border-[#E0E0FF] rounded-[16px] p-6 mb-10 shadow-sm flex flex-col md:flex-row items-center gap-6">
        <div className="w-16 h-16 bg-[#E0E0FF] rounded-2xl flex items-center justify-center shrink-0">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" fill="#1600D5"/>
            <path d="M14 2V8H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-lg font-bold text-slate-900 mb-1">Assignment File (Teacher Upload)</h4>
          <p className="text-xs text-slate-500 font-medium mb-4">Download the assignment PDF uploaded by your teacher to view the questions and requirements.</p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <button 
              onClick={() => window.open(fileUrl, "_blank")}
              className="px-4 py-2 border border-[#1600D5] text-[#1600D5] bg-white text-xs font-bold rounded-lg hover:bg-[#F8F8FF] transition-colors flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              View Assignment
            </button>
            <button 
              onClick={() => window.open(fileUrl, "_blank")}  // Simplified logic for download trigger
              className="px-4 py-2 bg-[#1600D5] text-white text-xs font-bold rounded-lg hover:bg-blue-800 transition-colors flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Download PDF
            </button>
          </div>
          <div className="mt-4 text-xs font-medium text-slate-400 flex items-center justify-center md:justify-start gap-1">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
             {fileName}
          </div>
        </div>
      </div>

      {/* Instructions Header */}
      <h3 className="text-xl font-extrabold text-slate-900 mb-4">Instructions for Student:</h3>
      
      {/* Dynamic List */}
      <div className="space-y-4 mb-10 pl-2">
        {instructions.map((inst: string, idx: number) => (
          <div key={idx} className="flex items-start text-sm font-medium text-slate-600 leading-relaxed">
            <span className="font-exrabold text-[#1600D5] mr-1">{idx + 1}.</span> 
            {inst}
          </div>
        ))}
      </div>

      {/* Upload Section Header */}
      <h3 className="text-xl font-extrabold text-slate-900 mb-4">Upload Assignment</h3>

      {/* Drag & Drop Box */}
      <div 
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`w-full border-2 border-dashed rounded-[16px] p-12 flex flex-col items-center justify-center text-center cursor-pointer transition-colors mb-6 
        ${uploadedFile ? 'border-emerald-400 bg-emerald-50' : 'border-slate-300 hover:border-slate-400 bg-[#FAFAFA]'}`}
      >
        <input 
          type="file" 
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx"
        />
        
        {uploadedFile ? (
          <>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            <p className="text-sm font-bold text-emerald-700 mb-1">{uploadedFile.name}</p>
            <p className="text-xs font-semibold text-emerald-600/70">Click or drag a new file to replace</p>
          </>
        ) : (
          <>
            <div className="mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="#9CA3AF" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" fill="#9CA3AF"/>
              </svg>
            </div>
            <p className="text-base font-semibold text-slate-900 mb-2">Drag & drop your assignment here or click to upload</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">PDF, DOC, DOCX up to 50MB</p>
          </>
        )}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-semibold flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          {error}
        </div>
      )}

      {isSubmitted && (
         <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
           Submitted successfully!
         </div>
      )}

      {/* Main Submit Button */}
      <button 
        onClick={handleSubmit}
        disabled={!uploadedFile || isExpired || isSubmitting}
        className={`w-full py-5 rounded-[12px] font-bold tracking-wide text-lg text-white transition-all shadow-md flex items-center justify-center gap-2
        ${!uploadedFile || isExpired || isSubmitting ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none' : 'bg-[#407BFF] hover:bg-blue-600 hover:-translate-y-0.5'}`}
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            Submitting...
          </>
        ) : (
          "Submit"
        )}
      </button>

    </div>
  );
};

export default AssignmentTab;
