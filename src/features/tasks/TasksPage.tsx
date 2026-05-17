import { useState, useEffect } from "react";
import type { FC } from "react";
import { useStudentStore } from "../../store/useStudentStore";

const TasksPage: FC = () => {
  const [activeTab, setActiveTab] = useState("Today");
  const tabs = ["Today", "Upcoming", "Overdue"];
  
  const { tasks, isLoading, error, fetchTasks, dashboard } = useStudentStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Data mapping from backend. We assume backend might return a `status` or `category` or we just filter them.
  // For the sake of UI stability, we map them based on a theoretical 'category' field.
  const overdueTasks = tasks.filter(t => t.category === 'overdue' || t.status === 'overdue');
  const todayTasks = tasks.filter(t => t.category === 'today' || t.status === 'today' || (!t.category && !t.status));
  const upcomingTasks = tasks.filter(t => t.category === 'upcoming' || t.status === 'upcoming');

  const toggleTask = (_id: string) => {
    // In a real app, this would hit an API endpoint to update the task
    // For now, we just rely on the UI or update local state if needed.
  };

  if (isLoading && tasks.length === 0) {
    return (
      <div className="flex justify-center items-center h-full min-h-[500px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0098DA]"></div>
      </div>
    );
  }

  if (error && tasks.length === 0) {
    return (
      <div className="flex justify-center items-center h-full min-h-[500px] text-red-500 font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-0 pb-32">
      <div className="mb-8 mt-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mb-2 tracking-tight">Daily Tasks & Schedule</h1>
        <p className="text-slate-500 text-sm sm:text-base font-medium">Track your daily tasks and earn XP for completing learning milestones.</p>
      </div>

      <div className="flex border-b border-slate-200 mb-8 gap-6 sm:gap-8 overflow-x-auto no-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-base sm:text-lg font-bold transition-all whitespace-nowrap shrink-0 ${
              activeTab === tab 
                ? 'text-[#1600D5] border-b-[3px] border-[#1600D5]'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Today" && (
        <div className="space-y-10">
          {/* Past Due Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A]">Past Due</h2>
              <span className="px-2 py-0.5 bg-[#FFF0E0] text-[#FF8000] border border-[#FFD9B3] rounded font-bold text-[10px] tracking-wider uppercase">CRITICAL</span>
            </div>
            
            <div className="space-y-4">
              {overdueTasks.length === 0 ? (
                <p className="text-slate-500 text-sm">No past due tasks.</p>
              ) : (
                overdueTasks.slice(0, 1).map(task => (
                  <div key={task.id} className="relative flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden cursor-pointer gap-4">
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#FF8000]"></div>
                    
                    <div className="flex items-start gap-3 sm:gap-4 ml-1 sm:ml-2">
                      <div className="mt-1 shrink-0">
                        <div className="w-5 h-5 rounded border-2 border-[#FF8000] bg-white flex items-center justify-center">
                          {task.checked && <span className="text-[#FF8000] text-xs font-bold leading-none">✓</span>}
                        </div>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                          <span className="font-extrabold text-slate-900 text-base sm:text-lg truncate">{task.title}</span>
                          <span className="px-2 py-0.5 bg-[#FF8000] text-white rounded font-bold text-[10px] tracking-wider uppercase shadow-sm">URGENT</span>
                        </div>
                        <span className="text-xs sm:text-sm text-slate-500 font-medium mt-1">{task.context}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between sm:justify-end gap-4 relative z-10 pl-8 sm:pl-0">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-[#EAE8FA] text-[#1600D5] font-bold text-sm rounded-lg">
                        <span>★</span> {task.xp} XP
                      </div>
                      <button className="text-slate-400 hover:text-slate-600 font-bold p-1">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Today's Missions Section */}
          <div>
            <div className="flex items-baseline gap-4 mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A]">Today's Missions</h2>
              <span className="text-slate-400 font-bold text-xs sm:text-sm">Monday, June 12</span>
            </div>
            
            <div className="space-y-4">
              {todayTasks.length === 0 ? (
                <p className="text-slate-500 text-sm">No tasks for today.</p>
              ) : (
                todayTasks.map(task => (
                  <div key={task.id} onClick={() => toggleTask(task.id)} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 bg-white rounded-xl shadow-sm border border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors gap-4">
                    <div className="flex items-start gap-3 sm:gap-4 ml-1 sm:ml-2">
                      <div className="mt-1 shrink-0">
                        {task.checked && task.isBlue ? (
                          <div className="w-5 h-5 rounded bg-[#1600D5] flex items-center justify-center">
                            <span className="text-white text-xs font-bold leading-none">✓</span>
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded border-2 border-slate-300 bg-white flex items-center justify-center">
                            {task.checked && <span className="text-slate-800 text-xs font-bold leading-none">✓</span>}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className={`font-extrabold text-base sm:text-lg truncate ${task.checked && task.isBlue ? 'text-[#1600D5]' : 'text-slate-900'}`}>{task.title}</span>
                        <span className="text-xs sm:text-sm text-slate-500 font-medium mt-1">{task.context}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between sm:justify-end gap-4 relative z-10 pl-8 sm:pl-0">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-[#EAE8FA] text-[#1600D5] font-bold text-sm rounded-lg">
                        <span>★</span> {task.xp} XP
                      </div>
                      <button className="text-slate-400 hover:text-slate-600 font-bold p-1">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === "Upcoming" && (
        <div className="space-y-6">
          <div className="flex items-baseline gap-4 mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A]">Upcoming Challenges</h2>
          </div>
          <div className="space-y-4">
            {upcomingTasks.length === 0 ? (
              <p className="text-slate-500 text-sm">No upcoming tasks.</p>
            ) : (
              upcomingTasks.map(task => (
                <div key={task.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 bg-white rounded-xl shadow-sm border border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors gap-4">
                  <div className="flex items-start gap-4 ml-2">
                    <div className="mt-1 shrink-0">
                      <div className="w-5 h-5 rounded border-2 border-slate-200 bg-slate-50 flex items-center justify-center" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-extrabold text-slate-900 text-lg">{task.title}</span>
                      <span className="text-sm text-slate-500 font-medium mt-1">{task.context}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-4 pl-8 sm:pl-0">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#EAE8FA] text-[#1600D5] font-bold text-sm rounded-lg">
                      <span>★</span> {task.xp} XP
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === "Overdue" && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A]">Overdue Tasks</h2>
          </div>
          <div className="space-y-4">
            {overdueTasks.length === 0 ? (
              <p className="text-slate-500 text-sm">No overdue tasks.</p>
            ) : (
              overdueTasks.map(task => (
                <div key={task.id} className="relative flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden cursor-pointer gap-4">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-500"></div>
                  <div className="flex items-start gap-4 ml-2">
                    <div className="mt-1 shrink-0">
                      <div className="w-5 h-5 rounded border-2 border-red-500 bg-white flex items-center justify-center" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-extrabold text-slate-900 text-lg">{task.title}</span>
                      <span className="text-sm text-red-500 font-bold mt-1">{task.context}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-4 pl-8 sm:pl-0">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#FEE2E2] text-red-600 font-bold text-sm rounded-lg">
                      <span>★</span> {task.xp} XP
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Bottom Sticky Bar */}
      <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-white border-t border-slate-200 p-4 px-6 md:px-8 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)] z-40">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center justify-around sm:justify-start w-full sm:w-auto gap-6 md:gap-12">
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5 sm:mb-1">Streak</span>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-lg sm:text-xl">🔥</span>
                <span className="text-base sm:text-xl font-extrabold text-slate-900">{dashboard?.daily_streak || 0} Days</span>
              </div>
            </div>
            
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5 sm:mb-1">XP Today</span>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-lg sm:text-xl text-[#1600D5]">★</span>
                <span className="text-base sm:text-xl font-extrabold text-slate-900">{dashboard?.total_xp || 0}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-1.5 sm:gap-2 w-full sm:min-w-[280px]">
            <div className="flex justify-between items-center text-[10px] sm:text-xs font-bold text-slate-500">
              <span className="truncate">Next Reward: Level 13 in 450 XP</span>
              <span className="sm:hidden">{dashboard?.daily_master?.completion_percentage || 0}%</span>
            </div>
            <div className="h-2 sm:h-3 w-full bg-[#E2E2E2] rounded-full overflow-hidden flex">
              <div className="h-full bg-[#1600D5] rounded-r-none transition-all duration-500" style={{ width: `${dashboard?.daily_master?.completion_percentage || 0}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
