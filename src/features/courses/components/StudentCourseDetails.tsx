import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourseDetails } from '../hooks/useCourses';
import { courseService } from '../../../services/courseService';

import toast from 'react-hot-toast';
import { 
  FiArrowLeft, 
  FiBookOpen, 
  FiLock, 
  FiCheck, 
  FiStar, 
  FiDownload, 
  FiPlay, 
  FiVolume2, 
  FiMaximize2, 
  FiFileText 
} from 'react-icons/fi';
import { PiGraduationCap } from 'react-icons/pi';

type TabType = 'lessons' | 'quizzes' | 'assignments';

export const StudentCourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const courseId = id ? parseInt(id, 10) : 0;
  const { course: rawCourse, loading: courseLoading, error: courseError, reload: reloadCourse } = useCourseDetails(courseId);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<TabType>('lessons');
  const [lessons, setLessons] = useState<any[]>([]);
  const [lessonsLoading, setLessonsLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState<any | null>(null);
  const [markingComplete, setMarkingComplete] = useState(false);

  // Cast course to any to avoid TypeScript complaints with backend schema naming discrepancies
  const course = rawCourse as any;

  useEffect(() => {
    if (courseId) {
      const loadLessons = async () => {
        try {
          const fetchedLessons = await courseService.listLessons(courseId);
          // Sort lessons by order
          const sorted = [...fetchedLessons].sort((a, b) => (a.order || 0) - (b.order || 0));
          setLessons(sorted);
          
          // Select first incomplete lesson or simply the first lesson by default
          if (sorted.length > 0) {
            // Find first incomplete if available from course details
            const apiLessons = course?.lessons || [];
            const firstIncomplete = sorted.find(l => {
              const apiL = apiLessons.find((al: any) => al.id === l.id);
              return apiL ? !apiL.is_completed : true;
            });
            setSelectedLesson(firstIncomplete || sorted[0]);
          }
        } catch (err) {
          console.error('Failed to load lessons', err);
          toast.error('Failed to load lessons');
        } finally {
          setLessonsLoading(false);
        }
      };
      
      // Wait for course to load since we need its completion states
      if (!courseLoading && course) {
        loadLessons();
      }
    }
  }, [courseId, courseLoading, course]);

  const handleMarkComplete = async (lessonId: number) => {
    setMarkingComplete(true);
    try {
      await courseService.markLessonComplete(lessonId);
      toast.success('Lesson marked as completed! Keep up the great work!');
      
      // Update local states
      setLessons((prev: any[]) => prev.map(l => l.id === lessonId ? { ...l, is_completed: true } : l));
      if (selectedLesson && selectedLesson.id === lessonId) {
        setSelectedLesson((prev: any) => ({ ...prev, is_completed: true }));
      }
      
      // Reload course details to refresh progress bar
      reloadCourse();
    } catch (err) {
      toast.error('Failed to complete lesson');
    } finally {
      setMarkingComplete(false);
    }
  };

  if (courseLoading || (lessonsLoading && lessons.length === 0)) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1600D5]"></div>
      </div>
    );
  }

  if (courseError || !course) {
    return (
      <div className="p-8 text-center text-red-500 bg-slate-50 min-h-screen">
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mt-20">
          <h3 className="text-xl font-bold text-slate-800 mb-2">Error Loading Course</h3>
          <p className="text-slate-500 font-medium mb-6">{courseError || 'Course not found'}</p>
          <button onClick={() => navigate('/student/courses')} className="px-6 py-3 bg-[#1600D5] text-white rounded-xl font-bold">
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const courseTitle = course.course_name || course.title || 'Untitled Course';
  const progress = Math.round(course.completion_percentage ?? course.progress ?? 0);
  const apiLessons = course.lessons || [];

  // Match the API complete status with our fetched lessons
  const getLessonStatus = (lesson: any) => {
    const apiL = apiLessons.find((al: any) => al.id === lesson.id);
    if (apiL?.is_completed || lesson.is_completed) return 'completed';
    if (selectedLesson?.id === lesson.id) return 'in_progress';
    return 'locked';
  };

  const completedCount = apiLessons.filter((al: any) => al.is_completed).length;
  const totalCount = apiLessons.length || lessons.length || 1;

  return (
    <div className="min-h-screen bg-slate-50 pb-16 font-sans">
      <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Header / Breadcrumb */}
        <button 
          onClick={() => navigate('/student/courses')}
          className="flex items-center gap-2 text-slate-400 hover:text-slate-600 mb-6 font-bold text-sm transition-all"
        >
          <FiArrowLeft className="stroke-[2.5]" />
          Back to Courses
        </button>

        {/* Course Progress Card */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#E2E6FF] text-[#1600D5] text-xs font-black rounded-full uppercase tracking-wider">
              <PiGraduationCap className="text-sm stroke-[3]" />
              Course Details
            </div>
            <h1 className="text-3xl md:text-[36px] font-black text-slate-800 tracking-tight leading-none">
              {courseTitle}
            </h1>
          </div>

          <div className="w-full md:w-80 space-y-2">
            <div className="flex justify-between items-end">
              <span className="text-[11px] font-black text-slate-400 tracking-wider">COURSE PROGRESS</span>
              <span className="text-sm font-black text-[#1600D5]">{progress}%</span>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-[12px] font-bold text-[#1600D5]">
              {completedCount} of {totalCount} lessons completed
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('lessons')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-sm transition-all ${
              activeTab === 'lessons' 
                ? 'bg-[#1600D5] text-white shadow-md shadow-blue-100' 
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            <FiBookOpen className="text-base" />
            <span>Lessons</span>
          </button>
          <button 
            onClick={() => setActiveTab('quizzes')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-sm transition-all ${
              activeTab === 'quizzes' 
                ? 'bg-[#1600D5] text-white shadow-md shadow-blue-100' 
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            <FiStar className="text-base" />
            <span>Quizzes</span>
          </button>
          <button 
            onClick={() => setActiveTab('assignments')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-sm transition-all ${
              activeTab === 'assignments' 
                ? 'bg-[#1600D5] text-white shadow-md shadow-blue-100' 
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            <FiFileText className="text-base" />
            <span>Assignments</span>
          </button>
        </div>

        {/* Lessons Tab Content */}
        {activeTab === 'lessons' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2 Columns: Video Player & Lesson Details */}
            <div className="lg:col-span-2 space-y-8">
              {selectedLesson ? (
                <>
                  {/* Premium Mock Video Player */}
                  <div className="relative bg-slate-950 aspect-video rounded-[32px] overflow-hidden group shadow-lg border border-slate-900">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-950 to-slate-950 opacity-90"></div>
                    
                    {/* Geometric Abstract Mesh Background */}
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                    
                    {/* Centered play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="w-20 h-20 rounded-full bg-[#1600D5] hover:bg-blue-600 text-white flex items-center justify-center text-3xl shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group-hover:shadow-blue-500/20">
                        <FiPlay className="ml-1 fill-white" />
                      </button>
                    </div>

                    {/* Bottom Custom Playback Bar */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent flex flex-col gap-4">
                      {/* Timeline progress */}
                      <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden cursor-pointer group/timeline">
                        <div className="h-full bg-[#1600D5] w-[45%] rounded-full relative">
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full scale-0 group-hover/timeline:scale-100 transition-transform"></div>
                        </div>
                      </div>
                      
                      {/* Controls row */}
                      <div className="flex justify-between items-center text-white text-sm font-bold">
                        <div className="flex items-center gap-4">
                          <FiPlay className="cursor-pointer text-lg hover:text-[#1600D5] transition-colors" />
                          <FiVolume2 className="cursor-pointer text-lg hover:text-[#1600D5] transition-colors" />
                          <span className="text-[12px] text-slate-300 font-medium tracking-wide">06:42 / 12:30</span>
                        </div>
                        <FiMaximize2 className="cursor-pointer text-lg hover:text-[#1600D5] transition-colors" />
                      </div>
                    </div>
                  </div>

                  {/* Selected Lesson Description card */}
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-6">
                    <div className="space-y-3">
                      <h2 className="text-2xl font-black text-slate-800">
                        Lesson {selectedLesson.order || 1}: {selectedLesson.title}
                      </h2>
                      <div className="text-slate-500 font-medium text-sm leading-relaxed whitespace-pre-line">
                        {selectedLesson.content || "No description provided for this lesson."}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                        <span className="bg-slate-50 px-3.5 py-2 rounded-xl text-slate-500">⏱️ 20 min</span>
                        <span className="bg-orange-50 text-orange-600 px-3.5 py-2 rounded-xl">⚡ Earn {selectedLesson.xp_reward || 50} XP</span>
                      </div>
                      
                      <button 
                        onClick={() => handleMarkComplete(selectedLesson.id)}
                        disabled={selectedLesson.is_completed || markingComplete}
                        className={`px-8 py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 ${
                          selectedLesson.is_completed 
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 cursor-default' 
                            : 'bg-[#1600D5] text-white hover:bg-blue-600 hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-blue-100 disabled:opacity-50'
                        }`}
                      >
                        {selectedLesson.is_completed ? (
                          <>
                            <FiCheck className="stroke-[3] text-base" />
                            Completed
                          </>
                        ) : markingComplete ? (
                          'Completing...'
                        ) : (
                          'Mark as Complete'
                        )}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-slate-100">
                  <FiBookOpen className="text-5xl text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-700">No Lesson Selected</h3>
                  <p className="text-slate-400 text-sm">Please select a lesson from the syllabus on the right.</p>
                </div>
              )}
            </div>

            {/* Right Column: Course Syllabus & Resources */}
            <div className="space-y-8">
              
              {/* Course Syllabus Card */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
                <h3 className="text-lg font-black text-slate-800">Course Syllabus:</h3>
                
                <div className="space-y-4">
                  {lessons.map((lesson) => {
                    const status = getLessonStatus(lesson);
                    const isSelected = selectedLesson?.id === lesson.id;
                    
                    return (
                      <div 
                        key={lesson.id}
                        onClick={() => setSelectedLesson(lesson)}
                        className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex gap-4 items-center ${
                          isSelected 
                            ? 'bg-[#EBF0FF] border-blue-200 shadow-sm shadow-blue-50/50' 
                            : status === 'completed'
                              ? 'bg-[#F3F5FF] border-slate-100 hover:bg-slate-100/50'
                              : 'bg-slate-50 border-slate-100 hover:bg-slate-100'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg ${
                          status === 'completed' 
                            ? 'bg-[#E2E6FF] text-[#1600D5]' 
                            : status === 'in_progress'
                              ? 'bg-[#E2E6FF] text-[#1600D5]'
                              : 'bg-slate-200 text-slate-400'
                        }`}>
                          {status === 'completed' ? (
                            <FiCheck className="stroke-[3] text-sm" />
                          ) : status === 'in_progress' ? (
                            <FiPlay className="text-xs fill-[#1600D5] stroke-none" />
                          ) : (
                            <FiLock className="text-xs" />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-black text-slate-800 truncate">
                            {lesson.order || 1}. {lesson.title}
                          </h4>
                          <span className={`text-[11px] font-bold uppercase tracking-wide ${
                            status === 'completed' 
                              ? 'text-[#1600D5]/70' 
                              : status === 'in_progress'
                                ? 'text-[#1600D5]'
                                : 'text-slate-400'
                          }`}>
                            {status === 'completed' ? 'Completed' : status === 'in_progress' ? 'In Progress' : 'Locked'}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  {/* Static Mock Mid-Term Quiz inside syllabus */}
                  <div className="p-4 rounded-2xl border border-orange-100 bg-[#FFF6EE] flex gap-4 items-center opacity-90 cursor-not-allowed">
                    <div className="w-10 h-10 rounded-xl bg-[#FFEBD6] text-orange-500 flex items-center justify-center shrink-0">
                      <FiStar className="text-sm" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-black text-slate-800 truncate">Mid-Term Quiz</h4>
                      <span className="text-[11px] font-bold text-orange-500 uppercase tracking-wide">Available after L15</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Downloadable Resources Card */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
                <div className="flex items-center gap-2 text-slate-800">
                  <span className="text-xl">📁</span>
                  <h3 className="text-lg font-black">Downloadable Resources</h3>
                </div>

                <div className="space-y-4">
                  {/* Dynamic mock files linked to active course context */}
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-slate-100/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center text-lg font-bold shrink-0">
                        📄
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-800 max-w-[150px] truncate">{selectedLesson?.title || 'Course'} Notes.pdf</h4>
                        <span className="text-[10px] font-bold text-slate-400">2.4 MB</span>
                      </div>
                    </div>
                    <button className="p-2.5 bg-white text-slate-500 rounded-xl shadow-sm border border-slate-100 hover:bg-slate-50">
                      <FiDownload size={14} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-slate-100/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center text-lg font-bold shrink-0">
                        📝
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-800 max-w-[150px] truncate">Integral Theorems Cheat Sheet.docx</h4>
                        <span className="text-[10px] font-bold text-slate-400">1.1 MB</span>
                      </div>
                    </div>
                    <button className="p-2.5 bg-white text-slate-500 rounded-xl shadow-sm border border-slate-100 hover:bg-slate-50">
                      <FiDownload size={14} />
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Quizzes Tab Content */}
        {activeTab === 'quizzes' && (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-slate-100">
            <FiStar className="text-5xl text-orange-400 mx-auto mb-4" />
            <h3 className="text-2xl font-black text-slate-800 mb-2">Quizzes</h3>
            <p className="text-slate-500 max-w-md mx-auto mb-6">
              Complete quizzes assigned by your teacher to test your knowledge and earn extra XP!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {(course.quizzes || []).length > 0 ? (
                course.quizzes.map((quiz: any) => (
                  <div key={quiz.id} className="p-6 bg-slate-50 border border-slate-100 rounded-2xl text-left flex justify-between items-center">
                    <div>
                      <h4 className="font-black text-slate-800">{quiz.title}</h4>
                      <p className="text-slate-400 text-xs mt-1">{quiz.questions_count || 10} Questions</p>
                    </div>
                    <button className="px-4 py-2 bg-[#1600D5] text-white font-bold text-xs rounded-xl shadow-sm">
                      Start Quiz
                    </button>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-slate-400 font-medium">No quizzes available for this course yet.</div>
              )}
            </div>
          </div>
        )}

        {/* Assignments Tab Content */}
        {activeTab === 'assignments' && (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-slate-100">
            <FiFileText className="text-5xl text-blue-500 mx-auto mb-4" />
            <h3 className="text-2xl font-black text-slate-800 mb-2">Assignments</h3>
            <p className="text-slate-500 max-w-md mx-auto mb-6">
              Track and submit homework or projects assigned to this class.
            </p>
            <div className="space-y-4 max-w-3xl mx-auto text-left">
              {(course.assignments || []).length > 0 ? (
                course.assignments.map((asg: any) => (
                  <div key={asg.id} className="p-6 bg-slate-50 border border-slate-100 rounded-2xl flex justify-between items-center">
                    <div>
                      <h4 className="font-black text-slate-800">{asg.title}</h4>
                      <p className="text-slate-400 text-xs mt-1">Due Date: {new Date(asg.due_date).toLocaleDateString()}</p>
                    </div>
                    <button className="px-5 py-2.5 bg-[#1600D5] text-white font-bold text-xs rounded-xl shadow-sm">
                      View Assignment
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center text-slate-400 font-medium py-4">No assignments assigned yet.</div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
