import { useState } from "react";
import { FiFilter, FiUsers } from "react-icons/fi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { TbSchool } from "react-icons/tb";

export function ReportConfigurationForm() {
  const [reportType, setReportType] = useState<"student" | "teacher" | "class">("student");
  const [selectedClass, setSelectedClass] = useState("all");
  const [timeframe, setTimeframe] = useState<"monthly" | "term" | "yearly">("monthly");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Mock download action
    setTimeout(() => {
      alert(`Successfully generated ${timeframe} ${reportType} report for ${selectedClass === "all" ? "All Classes" : "Class " + selectedClass}`);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex items-center gap-3">
        <FiFilter className="w-6 h-6 text-gray-900" />
        <div>
          <h2 className="text-xl font-bold text-gray-900">Report Configuration</h2>
          <p className="text-sm text-gray-500">Select parameters to generate your report</p>
        </div>
      </div>

      {/* Form Body */}
      <div className="p-6">
        {/* Report Type */}
        <div className="mb-8">
          <h3 className="text-base font-bold text-gray-900 mb-4">Report Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setReportType("student")}
              className={`p-4 rounded-xl border text-left transition-colors flex items-center gap-4 ${
                reportType === "student" ? "border-gray-900 shadow-sm" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="p-3 bg-gray-100 rounded-lg text-gray-600">
                <FiUsers className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Student Reports</p>
                <p className="text-xs text-gray-500 mt-1">Performance & Attendance</p>
              </div>
            </button>

            <button
              onClick={() => setReportType("teacher")}
              className={`p-4 rounded-xl border text-left transition-colors flex items-center gap-4 ${
                reportType === "teacher" ? "border-gray-900 shadow-sm" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="p-3 bg-gray-100 rounded-lg text-gray-600">
                <FaChalkboardTeacher className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Teacher Reports</p>
                <p className="text-xs text-gray-500 mt-1">Ratings & Performance</p>
              </div>
            </button>

            <button
              onClick={() => setReportType("class")}
              className={`p-4 rounded-xl border text-left transition-colors flex items-center gap-4 ${
                reportType === "class" ? "border-gray-900 shadow-sm" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="p-3 bg-gray-100 rounded-lg text-gray-600">
                <TbSchool className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Class Reports</p>
                <p className="text-xs text-gray-500 mt-1">Overall analytics</p>
              </div>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <h3 className="text-base font-bold text-gray-900 mb-4">Select Class</h3>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full p-3.5 bg-white border border-gray-300 rounded-xl text-gray-900 font-medium focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Classes</option>
                <option value="9A">Class 9A</option>
                <option value="9B">Class 9B</option>
                <option value="10A">Class 10A</option>
              </select>
            </div>
            
            <div className="flex-[2]">
              <h3 className="text-base font-bold text-gray-900 mb-4 opacity-0 hidden md:block">Timeframe</h3>
              <div className="flex gap-4 h-[54px] md:mt-10">
                <button
                  onClick={() => setTimeframe("monthly")}
                  className={`flex-1 rounded-xl border font-semibold transition-colors ${
                    timeframe === "monthly" ? "border-gray-900 text-gray-900" : "border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setTimeframe("term")}
                  className={`flex-1 rounded-xl border font-semibold transition-colors ${
                    timeframe === "term" ? "border-gray-900 text-gray-900" : "border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Term
                </button>
                <button
                  onClick={() => setTimeframe("yearly")}
                  className={`flex-1 rounded-xl border font-semibold transition-colors ${
                    timeframe === "yearly" ? "border-gray-900 text-gray-900" : "border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Yearly
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 px-8 rounded-xl transition-colors disabled:opacity-70 flex items-center"
        >
          {isGenerating ? "Generating..." : "Generate Report"}
        </button>
      </div>
    </div>
  );
}
