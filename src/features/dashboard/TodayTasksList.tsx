import { useState } from "react";
import type { FC } from "react";
import type { Task } from "../../mock/dashboard.mock";

interface TodayTasksListProps {
  tasks: Task[];
}

const TodayTasksList: FC<TodayTasksListProps> = ({ tasks: _tasks }) => {
  const initialTasks = [
    { id: '1', title: 'Complete Module 4: Ecosystems', subject: 'Science', time: '45 mins', status: 'completed' },
    { id: '2', title: 'Review Flashcards: Linear Algebra', subject: 'Mathematics', time: '15 mins', status: 'priority', badge: 'DOING' },
    { id: '3', title: 'Submit Lab: Pyramid builders', subject: 'History', time: '60 mins', status: 'pending', hasClock: true },
  ];

  const [displayTasks, setDisplayTasks] = useState(initialTasks);

  const toggleTask = (id: string) => {
    setDisplayTasks(prev => prev.map(t => 
      t.id === id 
        ? { ...t, status: t.status === 'completed' ? (t.badge ? 'priority' : 'pending') : 'completed' } 
        : t
    ));
  };
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col w-full mt-2">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 flex items-center justify-center bg-[#FF8000] rounded text-white font-bold text-sm">✔</span>
          <h3 className="text-xl font-bold text-slate-800">Today's Tasks</h3>
        </div>
        <button className="text-[#1600D5] font-bold text-sm tracking-wide hover:underline">See All</button>
      </div>
      <div className="space-y-3">
        {displayTasks.map((task) => (
          <div 
            key={task.id} 
            onClick={() => toggleTask(task.id)}
            className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${task.status === 'completed' ? 'border-slate-200 bg-white' : task.status === 'priority' ? 'border-[#EAE8FA] bg-[#F7F6FF] hover:bg-[#F0EEFF]' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`}
          >
            <div className="flex items-start gap-4">
              <div className="mt-1">
                {task.status === 'completed' ? (
                  <div className="w-5 h-5 rounded bg-[#1600D5] flex items-center justify-center text-white text-xs font-bold">✓</div>
                ) : task.status === 'priority' ? (
                  <div className="w-5 h-5 rounded border-2 border-slate-300 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-sm bg-[#1600D5]" style={{ clipPath: 'polygon(10% 50%, 40% 80%, 90% 10%, 100% 20%, 40% 100%, 0 60%)' }}></div>
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded border-2 border-slate-300 bg-white text-transparent flex items-center justify-center text-xs">✓</div>
                )}
              </div>
              <div className="flex flex-col">
                <span className={`font-bold ${task.status === 'completed' ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                  {task.title}
                </span>
                <span className="text-xs text-slate-500 font-medium mt-1">
                  {task.subject} • {task.time} {task.status === 'priority' && <span className="text-[#1600D5] font-bold ml-1">• Priority</span>}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Status Icon (Clock or Green Check) */}
              {task.status === 'completed' ? (
                <div className="w-6 h-6 rounded-full bg-emerald-400 flex items-center justify-center text-white text-sm font-bold shadow-sm">✓</div>
              ) : (
                task.hasClock && (
                  <div className="w-6 h-6 rounded-full bg-slate-400 flex items-center justify-center text-white p-[4px]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  </div>
                )
              )}
              {/* Badge stays visible regardless of completion status if it exists */}
              {task.badge && (
                <div className="px-2 py-1 bg-[#EAE8FA] text-[#1600D5] text-[10px] font-extrabold tracking-wider rounded">
                  {task.badge}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodayTasksList;
