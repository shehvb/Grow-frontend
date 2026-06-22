import { useState, useEffect } from "react";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import apiClient from "../../../services/apiClient";
import { useParentStore } from "../../../store/parentStore";

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

  const [selectedSchoolId, setSelectedSchoolId] = useState<number | "">("");
  const [fullName, setFullName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [selectedGradeId, setSelectedGradeId] = useState<number | "">("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchoolsAndInitialGrades = async () => {
      try {
        const schoolsRes = await apiClient.get("schools/");
        if (schoolsRes.data) {
          const sList = schoolsRes.data.results || schoolsRes.data;
          if (Array.isArray(sList)) setSchools(sList);
        }
      } catch (err) {
        console.warn("Failed to load schools, using fallback", err);
        setSchools([
          { id: 1, name: "Springfield Elementary", school_code: "SPR-001" },
          { id: 2, name: "Westside High School", school_code: "WHS-002" },
        ]);
      }

      try {
        const gradesRes = await apiClient.get("schools/grades/");
        if (gradesRes.data) {
          const gList = gradesRes.data.results || gradesRes.data;
          if (Array.isArray(gList)) setGrades(gList);
        }
      } catch (err) {
        console.warn("Failed to load grades, using fallback", err);
        setGrades([
          { id: 1, name: "Grade 8" },
          { id: 2, name: "Grade 9" },
          { id: 3, name: "Grade 10" },
        ]);
      }
    };

    fetchSchoolsAndInitialGrades();
  }, []);

  useEffect(() => {
    if (!selectedSchoolId) return;

    const fetchSchoolScopedGrades = async () => {
      try {
        const gradesRes = await apiClient.get(`schools/grades/?school_id=${selectedSchoolId}`);
        if (gradesRes.data) {
          const gList = gradesRes.data.results || gradesRes.data;
          if (Array.isArray(gList)) {
            setGrades(gList);
          }
        }
      } catch (err) {
        console.warn("Failed to load school-scoped grades", err);
      }
    };

    fetchSchoolScopedGrades();
  }, [selectedSchoolId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!selectedSchoolId || !fullName.trim() || !studentId.trim() || !selectedGradeId) {
      setError("يرجى ملء جميع الحقول المطلوبة");
      setLoading(false);
      return;
    }

    try {
      const linkStudent = useParentStore.getState().linkStudent;
      await linkStudent({
        school_id: Number(selectedSchoolId),
        full_name: fullName.trim(),
        student_id: studentId.trim(),
        grade_id: Number(selectedGradeId),
      });

      setView("SUCCESS");
      setTimeout(() => {
        navigate("/parent/dashboard");
      }, 2500);
    } catch (err: any) {
      console.error(err);
      const errMsg = err.response?.data?.error || err.response?.data?.detail || err.message || "الطالب غير موجود أو المعلومات غير متطابقة";
      setError(errMsg);
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
          <h2 className="text-2xl font-extrabold text-slate-900 mb-3">You have successfully linked your child!</h2>
          <p className="text-slate-500">You will be redirected to the dashboard...</p>
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
          <h2 className="text-2xl font-extrabold text-slate-900 mb-3">An error occurred</h2>
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
              value={selectedSchoolId}
              onChange={(e) => setSelectedSchoolId(e.target.value ? Number(e.target.value) : "")}
              className="w-full px-5 py-3.5 bg-[#F9FAFB] border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select School...</option>
              {schools.map((school) => (
                <option key={school.id} value={school.id}>
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
              placeholder="Full Name"
              className="w-full px-5 py-3.5 bg-[#F9FAFB] border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Student ID */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-900 ml-1">Student Code</label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="Student Code"
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
              <option value="">Select Grade...</option>
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
            {loading ? "Linking Student..." : "Link Student"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStudentPage;