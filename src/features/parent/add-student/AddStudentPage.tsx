import { useState, useEffect } from "react";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

type ViewState = "FORM" | "SUCCESS" | "ERROR";

interface School {
  id: number;
  name: string;
  school_code: string;
}

interface GradeOption {
  id: number;
  name: string;
}

const AddStudentPage: FC = () => {
  const [view, setView] = useState<ViewState>("FORM");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [schools, setSchools] = useState<School[]>([]);
  const [grades, setGrades] = useState<GradeOption[]>([]);

  const [selectedSchoolCode, setSelectedSchoolCode] = useState("");
  const [fullName, setFullName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [selectedGradeId, setSelectedGradeId] = useState<number | "">("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [schoolsRes, gradesRes] = await Promise.all([
          fetch("http://127.0.0.1:8000/students/schools/"),
          fetch("http://127.0.0.1:8000/students/grades/"),
        ]);

        if (schoolsRes.ok) setSchools(await schoolsRes.json());
        if (gradesRes.ok) setGrades(await gradesRes.json());
      } catch (err) {
        console.warn("Failed to load schools or grades from server, using mock data", err);
      } finally {
        // MOCK DATA Fallback:
        setSchools([
          { id: 1, name: "Springfield Elementary", school_code: "SPR-001" },
          { id: 2, name: "Westside High School", school_code: "WHS-002" },
        ]);
        setGrades([
          { id: 1, name: "Grade 8" },
          { id: 2, name: "Grade 9" },
          { id: 3, name: "Grade 10" },
        ]);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!selectedSchoolCode || !fullName.trim() || !studentId.trim() || !selectedGradeId) {
      setError("يرجى ملء جميع الحقول المطلوبة");
      setLoading(false);
      return;
    }

    /* 
    const formData = {
      student_id: studentId.trim(),
      school_code: selectedSchoolCode,
      full_name: fullName.trim(),
      grade_id: selectedGradeId
    };
    */

    try {
      // TODO: Replace with new backend API
      /*
      const response = await fetch("http://127.0.0.1:8000/students/add-student/", { ... });
      const data = await response.json();
      */

      // MOCK DATA Success condition:
      if (studentId.startsWith("STU")) {
        setView("SUCCESS");
        setTimeout(() => {
          navigate("/parent/dashboard");
        }, 2500);
      } else {
        setError("الطالب غير موجود أو الكود غير صحيح (يجب أن يبدأ بـ STU)");
        setLoading(false); // Enable button again
      }
    } catch (err) {
      console.error(err);
      setError("Cannot connect to server. Make sure Django is running.");
      setView("ERROR");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => navigate(-1);

  if (view === "SUCCESS") {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-[#295399] to-[#448AFF] flex items-center justify-center p-6 z-50">
        <div className="bg-[#F3F4F6] rounded-[32px] p-12 w-full max-w-md shadow-2xl flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center mb-8">
            <FiCheckCircle className="text-white w-12 h-12" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-3">تم ربط الطالب بنجاح!</h2>
          <p className="text-slate-500">سيتم توجيهك إلى لوحة التحكم...</p>
        </div>
      </div>
    );
  }

  if (view === "ERROR") {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-[#295399] to-[#448AFF] flex items-center justify-center p-6 z-50">
        <div className="bg-[#F3F4F6] rounded-[32px] p-12 w-full max-w-md shadow-2xl flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-red-500 flex items-center justify-center mb-8">
            <FiAlertCircle className="text-white w-12 h-12" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-3">حدث خطأ</h2>
          <p className="text-slate-500 mb-8">{error}</p>
          <button
            onClick={() => setView("FORM")}
            className="w-full py-4 bg-red-600 text-white rounded-2xl font-bold"
          >
            try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#295399] to-[#448AFF] flex items-center justify-center p-6 z-50">
      <div className="bg-[#F3F4F6] rounded-[32px] pt-8 pb-10 px-10 w-full max-w-[500px] shadow-2xl relative overflow-hidden">
        <button onClick={handleBack} className="absolute top-8 left-8 text-slate-900">
          <FiArrowLeft size={24} />
        </button>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-slate-900">Add / Link Student</h1>
          <p className="text-slate-400 text-sm">Enter your child's Student ID</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 animate-shake">
            <FiAlertCircle className="shrink-0" />
            <p className="text-sm font-bold">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col gap-6">
          {/* School Name - Dropdown */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-900 ml-1">School Name</label>
            <select
              value={selectedSchoolCode}
              onChange={(e) => setSelectedSchoolCode(e.target.value)}
              className="w-full px-5 py-3.5 bg-[#F9FAFB] border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">اختر المدرسة...</option>
              {schools.map((school) => (
                <option key={school.id} value={school.school_code}>
                  {school.name}
                </option>
              ))}
            </select>
          </div>

          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-900 ml-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="اسم الطالب الكامل"
              className="w-full px-5 py-3.5 bg-[#F9FAFB] border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Student ID */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-900 ml-1">Student ID (كود الطالب)</label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="مثال: STU-2024-G5-123"
              className="w-full px-5 py-3.5 bg-[#F9FAFB] border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Grade - Dropdown */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-900 ml-1">Grade</label>
            <select
              value={selectedGradeId}
              onChange={(e) => setSelectedGradeId(e.target.value ? Number(e.target.value) : "")}
              className="w-full px-5 py-3.5 bg-[#F9FAFB] border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">اختر الصف...</option>
              {grades.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-[#D3E4FF] rounded-2xl p-5 text-center text-xs font-medium text-[#1600D5]">
            Note: Enter the exact Student ID. The system will search and link the student to your account.
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 bg-[#448AFF] text-white rounded-2xl font-bold text-lg shadow-xl transition-all ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          >
            {loading ? "جاري البحث والربط..." : "Link Student"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStudentPage;