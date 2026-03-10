import  { type FC, useState } from "react";
import LoginParent from "./LoginParent";
import LoginStudent from "./LoginStudent";

const LoginPreview: FC = () => {
  const [page, setPage] = useState<"parent" | "student">("parent");

  return (
    <div className="relative">
      {/* Toggle bar */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-1.5 shadow-xl">
        <button
          onClick={() => setPage("parent")}
          className={`px-5 py-2 rounded-xl text-sm font-black transition-all duration-200 ${
            page === "parent"
              ? "bg-blue-700 text-white shadow-md"
              : "text-slate-500 hover:text-slate-700"
          }`}
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          👨‍👩‍👧 Parent Login
        </button>
        <button
          onClick={() => setPage("student")}
          className={`px-5 py-2 rounded-xl text-sm font-black transition-all duration-200 ${
            page === "student"
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
              : "text-slate-500 hover:text-slate-700"
          }`}
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          🎓 Student Login
        </button>
      </div>

      {page === "parent" ? <LoginParent /> : <LoginStudent />}
    </div>
  );
};

export default LoginPreview;
