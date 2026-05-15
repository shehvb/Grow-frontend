import type { FC } from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { 
  FiArrowLeft,
  FiPlus,
  FiChevronDown
} from "react-icons/fi";
import { courseService } from "../../../services/courseService";
import { quizService } from "../../../services/quizService";
import type { Course } from "../../../types/course";

const QuizBuilderPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: "",
    courseId: "",
    duration: 30,
    rewardXp: 200,
    isActive: true,
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days default
  });

  const [courses, setCourses] = useState<Course[]>([]);
  const [questions, setQuestions] = useState([
    { id: 1, prompt: "", options: ["", "", "", ""], correctIndex: 0 },
    { id: 2, prompt: "", options: ["", "", "", ""], correctIndex: 1 }
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseService.listCourses();
        setCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };
    fetchCourses();

    if (isEditMode) {
      const fetchQuiz = async () => {
        try {
          const quiz = await quizService.getTeacherQuizById(id);
          if (quiz) {
            setFormData({
              title: quiz.title,
              courseId: quiz.course?.toString() || quiz.course_id?.toString() || "",
              duration: quiz.duration_minutes || 30,
              rewardXp: quiz.xp_reward || 200,
              isActive: !quiz.is_locked,
              startTime: quiz.start_time || new Date().toISOString(),
              endTime: quiz.end_time || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            });
            // Map questions if they exist in the response
            if (quiz.questions && Array.isArray(quiz.questions)) {
              setQuestions(quiz.questions.map((q: any, i: number) => {
                // If options are objects with {text, is_correct}
                const options = Array.isArray(q.options) 
                  ? q.options.map((opt: any) => typeof opt === 'string' ? opt : (opt.text || ""))
                  : ["", "", "", ""];
                
                const correctIndex = Array.isArray(q.options)
                  ? q.options.findIndex((opt: any) => opt.is_correct === true)
                  : 0;

                return {
                  id: q.id || i + 1,
                  prompt: q.text || "",
                  options: options,
                  correctIndex: correctIndex >= 0 ? correctIndex : 0
                };
              }));
            }
          }
        } catch (error) {
          console.error("Failed to fetch quiz:", error);
        }
      };
      fetchQuiz();
    }
  }, [id, isEditMode]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = {
        title: formData.title,
        course_id: parseInt(formData.courseId),
        duration_minutes: formData.duration,
        xp_reward: formData.rewardXp,
        max_score: "100.00", // Default or calculated
        start_time: formData.startTime,
        end_time: formData.endTime,
        questions: questions.map((q, idx) => ({
          text: q.prompt,
          order: idx + 1,
          options: q.options.map((opt, optIdx) => ({
            text: opt,
            is_correct: q.correctIndex === optIdx
          }))
        }))
      };

      if (isEditMode) {
        await quizService.updateQuiz(id, payload);
      } else {
        await quizService.createQuiz(payload);
      }
      navigate("/teacher/quizzes");
    } catch (error) {
      console.error("Failed to save quiz:", error);
      alert("Failed to save quiz. Please check all fields.");
    } finally {
      setLoading(false);
    }
  };

  const updateQuestion = (qId: number, field: string, value: any, optionIndex?: number) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === qId) {
        if (field === 'options' && typeof optionIndex === 'number') {
          const newOptions = [...q.options];
          newOptions[optionIndex] = value;
          return { ...q, options: newOptions };
        }
        return { ...q, [field]: value };
      }
      return q;
    }));
  };

  const addQuestion = () => {
    const newId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;
    setQuestions([...questions, { id: newId, prompt: "", options: ["", "", "", ""], correctIndex: 0 }]);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      {/* Header Area */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Link to="/teacher/quizzes" className="flex items-center text-slate-800 font-black text-2xl hover:text-blue-600 transition-colors w-fit">
            <FiArrowLeft className="mr-3 text-xl" />
            {isEditMode ? formData.title || "Edit Quiz" : "Create New Quiz"}
          </Link>
          <p className="text-slate-400 font-medium ml-9">Set up a new quiz for your students</p>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-sm font-black text-slate-800">Active</span>
          <button 
            onClick={() => setFormData({...formData, isActive: !formData.isActive})}
            className={`w-12 h-6 rounded-full p-1 transition-colors ${formData.isActive ? 'bg-[#FF8000]' : 'bg-slate-300'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${formData.isActive ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        <div className="flex-1 space-y-6">
          {/* Quiz Details Form */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
            <h3 className="text-lg font-black text-slate-800">Quiz Details</h3>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Quiz Title</label>
              <input 
                type="text" 
                placeholder="e.g., Linear Equations Quiz" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3.5 text-sm font-bold text-slate-600 outline-none focus:border-orange-400 transition-all placeholder:text-slate-300"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Course</label>
                <div className="relative">
                    <select 
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3.5 text-sm font-bold text-slate-600 focus:border-orange-400 outline-none transition-all appearance-none"
                      value={formData.courseId}
                      onChange={(e) => setFormData({...formData, courseId: e.target.value})}
                    >
                      <option value="" disabled>Select...</option>
                      {courses.map(course => (
                        <option key={course.id} value={course.id}>{course.title}</option>
                      ))}
                    </select>
                  <FiChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none stroke-[3]" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Duration (minutes)</label>
                <input 
                  type="number" 
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value) || 0})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3.5 text-sm font-bold text-slate-600 outline-none focus:border-orange-400 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Reward Xp</label>
                <input 
                  type="number" 
                  value={formData.rewardXp}
                  onChange={(e) => setFormData({...formData, rewardXp: parseInt(e.target.value) || 0})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3.5 text-sm font-bold text-blue-500 outline-none focus:border-orange-400 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-50">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Start Time</label>
                <input 
                  type="datetime-local" 
                  value={formData.startTime.substring(0, 16)}
                  onChange={(e) => setFormData({...formData, startTime: new Date(e.target.value).toISOString()})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3.5 text-sm font-bold text-slate-600 outline-none focus:border-orange-400 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-800 uppercase tracking-widest">End Time</label>
                <input 
                  type="datetime-local" 
                  value={formData.endTime.substring(0, 16)}
                  onChange={(e) => setFormData({...formData, endTime: new Date(e.target.value).toISOString()})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3.5 text-sm font-bold text-slate-600 outline-none focus:border-orange-400 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Questions Builder */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-800">Questions</h3>
              <button 
                onClick={addQuestion}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
              >
                <FiPlus /> Add Question
              </button>
            </div>
            
            <div className="space-y-6">
              {questions.map((q, idx) => (
                <div key={q.id} className="border border-slate-200 rounded-3xl p-6 relative">
                  <div className="flex gap-4 mb-6">
                    <div className="w-8 h-8 shrink-0 rounded-lg bg-[#FF8000] text-white flex items-center justify-center font-black text-sm">
                      {idx + 1}
                    </div>
                    <input 
                      type="text"
                      placeholder="Enter your question..."
                      value={q.prompt}
                      onChange={(e) => updateQuestion(q.id, 'prompt', e.target.value)}
                      className="w-full bg-slate-100 border-transparent rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:bg-white focus:border-orange-400 outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>

                  <div className="pl-12">
                    <label className="text-[9px] font-black text-slate-800 uppercase tracking-widest mb-3 block">Answer Options</label>
                    <div className="space-y-3">
                      {q.options.map((opt, optIdx) => (
                        <div key={optIdx} className="flex items-center gap-3">
                          <button 
                            className={`w-4 h-4 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ${q.correctIndex === optIdx ? 'border-[#FF8000]' : 'border-slate-300'}`}
                            onClick={() => updateQuestion(q.id, 'correctIndex', optIdx)}
                          >
                            {q.correctIndex === optIdx && <div className="w-2 h-2 rounded-full bg-[#FF8000]" />}
                          </button>
                          <input 
                            type="text"
                            placeholder={`Option ${optIdx + 1}`}
                            value={opt}
                            onChange={(e) => updateQuestion(q.id, 'options', e.target.value, optIdx)}
                            className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-600 outline-none focus:border-orange-400 transition-all"
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-[9px] font-bold text-slate-400 mt-3 pl-7">Select the correct answer</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-4">
            <button 
              onClick={handleSave}
              disabled={loading}
              className="px-8 py-3.5 bg-[#FF8000] text-white font-bold rounded-xl shadow-lg shadow-orange-100 hover:bg-orange-600 hover:-translate-y-0.5 disabled:bg-slate-300 disabled:translate-y-0 transition-all text-sm min-w-[140px]"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Saving...</span>
                </div>
              ) : (
                isEditMode ? "Save Changes" : "Create Quiz"
              )}
            </button>
            <button 
              onClick={() => navigate('/teacher/quizzes')}
              className="px-8 py-3.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all text-sm shadow-sm"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Live Preview Sidebar */}
        <div className="xl:w-[320px] shrink-0">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 sticky top-8">
            <h3 className="text-sm font-black text-slate-800 mb-6">Preview</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Quiz Title</p>
                <p className="text-sm font-black text-slate-800">{formData.title || "Untitled Quiz"}</p>
              </div>
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Subject</p>
                <p className="text-sm font-black text-slate-800">{formData.course || "Unassigned"}</p>
              </div>
              
              <hr className="border-slate-100 my-4" />
              
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <span>Questions</span>
                  <span className="text-slate-800 font-black">{questions.length}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <span>Duration</span>
                  <span className="text-slate-800 font-black">{formData.duration} min</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <span>XP Reward</span>
                  <span className="text-blue-500 font-black">{formData.rewardXp} Xp</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizBuilderPage;
