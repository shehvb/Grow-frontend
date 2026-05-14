import { type FC, useState } from "react";
import { 
  FiTrendingUp, 
  FiCheckCircle, 
  FiUsers, 
  FiAlertCircle,
  FiSearch,
  FiChevronDown,
  FiMessageSquare,
  FiUser
} from "react-icons/fi";

const MOCK_STUDENTS = [
  {
    id: "STU-2451652",
    name: "Emma Watson",
    class: "Class C",
    xp: 2450,
    avgScore: 98,
    attendance: 95,
    status: "Excellent"
  },
  {
    id: "STU-2451653",
    name: "John Doe",
    class: "Class A",
    xp: 2100,
    avgScore: 85,
    attendance: 90,
    status: "Excellent"
  },
  {
    id: "STU-2451654",
    name: "Alice Smith",
    class: "Class C",
    xp: 1950,
    avgScore: 82,
    attendance: 88,
    status: "Average"
  },
  {
    id: "STU-458621",
    name: "Liam Wilson",
    class: "Class B",
    xp: 1580,
    avgScore: 72,
    attendance: 78,
    status: "Needs Attention"
  },
  {
    id: "STU-8451216",
    name: "Sophia Martinez",
    class: "Class C",
    xp: 1820,
    avgScore: 76,
    attendance: 88,
    status: "Average"
  }
];

const StudentsPage: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("All Classes");

  const filteredStudents = MOCK_STUDENTS.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         student.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClass === "All Classes" || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      {/* Header Area */}
      <div className="space-y-1">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">View & Manage Students</h1>
        <div className="flex items-center text-slate-400 font-medium">
          <span className="text-slate-800 font-black mr-2">&lt; Students</span>
          View and manage your students
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-800 mb-1">Avg Performance</p>
            <span className="text-3xl font-black text-slate-800">87%</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-green-100 text-green-500 flex items-center justify-center">
            <FiTrendingUp className="text-xl stroke-[3]" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-800 mb-1">Avg Attendance</p>
            <span className="text-3xl font-black text-slate-800">91%</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-500 flex items-center justify-center">
            <FiCheckCircle className="text-xl stroke-[3]" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-800 mb-1">Total Students</p>
            <span className="text-3xl font-black text-slate-800">{filteredStudents.length}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-500 flex items-center justify-center">
            <FiUsers className="text-xl" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-800 mb-1">Need Attention</p>
            <span className="text-3xl font-black text-slate-800">8</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-red-100 text-red-500 flex items-center justify-center">
            <FiAlertCircle className="text-xl stroke-[3]" />
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:flex-1">
          <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 stroke-[3]" />
          <input 
            type="text" 
            placeholder="Search students by name or ID..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-5 py-3.5 text-sm font-bold text-slate-600 outline-none focus:border-orange-400 transition-all placeholder:text-slate-400"
          />
        </div>
        
        <div className="relative w-full md:w-64 shrink-0">
          <select 
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 text-sm font-bold text-slate-800 focus:border-orange-400 outline-none transition-all appearance-none cursor-pointer hover:bg-slate-100"
          >
            <option value="All Classes">All Classes</option>
            <option value="Class A">Class A</option>
            <option value="Class B">Class B</option>
            <option value="Class C">Class C</option>
          </select>
          <FiChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none stroke-[3]" />
        </div>
      </div>

      {/* Students List */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
        <div className="space-y-4">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => {
              const initials = student.name.split(' ').map(n => n[0]).join('');
              
              const getStatusColor = (status: string) => {
                switch(status) {
                  case 'Excellent': return 'bg-green-100 text-green-500';
                  case 'Needs Attention': return 'bg-red-100 text-red-500';
                  case 'Average': return 'bg-yellow-100 text-yellow-600';
                  default: return 'bg-slate-100 text-slate-500';
                }
              };

              return (
                <div 
                  key={student.id} 
                  className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors"
                >
                  <div className="flex items-center gap-5 w-full xl:w-auto">
                    <div className="w-14 h-14 rounded-full bg-[#FF8000] text-white flex items-center justify-center font-black tracking-widest text-xl shrink-0">
                      {initials}
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-800 mb-1">{student.name}</h3>
                      <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                        <span>{student.class}</span>
                        <span className="flex items-center gap-1.5"><FiUser /> {student.id}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap md:flex-nowrap items-center gap-8 xl:gap-12 w-full xl:w-auto justify-between xl:justify-end">
                    <div className="text-center min-w-[60px]">
                      <span className="text-2xl font-black text-blue-500 block mb-0.5">{student.xp}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Xp</span>
                    </div>
                    
                    <div className="text-center min-w-[60px]">
                      <span className="text-2xl font-black text-slate-800 block mb-0.5">{student.avgScore}%</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Avg Score</span>
                    </div>
                    
                    <div className="text-center min-w-[60px]">
                      <span className="text-2xl font-black text-slate-800 block mb-0.5">{student.attendance}%</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Attendance</span>
                    </div>

                    <div className="shrink-0 min-w-[120px] text-center md:text-right">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusColor(student.status)}`}>
                        {student.status}
                      </span>
                    </div>

                    <button className="shrink-0 flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold text-xs rounded-2xl hover:bg-slate-50 transition-colors shadow-sm w-full md:w-auto justify-center">
                      <FiMessageSquare className="fill-current" />
                      Message
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              <FiSearch className="mx-auto text-4xl text-slate-300 mb-4" />
              <p className="text-slate-500 font-bold">No students found matching your filters.</p>
              <button 
                onClick={() => { setSearchQuery(""); setSelectedClass("All Classes"); }}
                className="mt-4 text-orange-500 font-black text-sm hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentsPage;

