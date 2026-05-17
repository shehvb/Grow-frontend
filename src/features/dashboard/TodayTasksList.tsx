import { useState, useEffect } from "react";
import type { FC } from "react";
import type { TodaysTask } from "../../types/student";

interface TodayTasksListProps {
  tasks: TodaysTask[];
}

const TodayTasksList: FC<TodayTasksListProps> = ({ tasks }) => {
  const [displayTasks, setDisplayTasks] = useState(tasks);

  useEffect(() => {
    setDisplayTasks(tasks);
  }, [tasks]);

  const toggleTask = (index: number) => {
    setDisplayTasks(prev => {
      const newTasks = [...prev];
      const t = newTasks[index];
      newTasks[index] = { 
        ...t, 
        status: t.status === 'completed' ? 'pending' : 'completed' 
      };
      return newTasks;
    });
  };
  
  if (!displayTasks || displayTasks.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col w-full mt-2">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Today's Tasks</h3>
        <div className="flex flex-col items-center justify-center py-8 text-slate-500">
          <p className="font-medium">No tasks for today. Great job!</p>
        </div>
      </div>
    );
  }

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
        {displayTasks.map((task, index) => {
          if (!task) return null;
          const isCompleted = task.status === 'completed';
          const isPriority = task.status === 'priority';
          
          return (
            <div 
              key={`${task.title || 'task'}-${index}`} 
              onClick={() => toggleTask(index)}
              className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${isCompleted ? 'border-slate-200 bg-white' : isPriority ? 'border-[#EAE8FA] bg-[#F7F6FF] hover:bg-[#F0EEFF]' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {isCompleted ? (
                    <div className="w-5 h-5 rounded bg-[#1600D5] flex items-center justify-center text-white text-xs font-bold">✓</div>
                  ) : isPriority ? (
                    <div className="w-5 h-5 rounded border-2 border-slate-300 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-sm bg-[#1600D5]" style={{ clipPath: 'polygon(10% 50%, 40% 80%, 90% 10%, 100% 20%, 40% 100%, 0 60%)' }}></div>
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded border-2 border-slate-300 bg-white text-transparent flex items-center justify-center text-xs">✓</div>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className={`font-bold ${isCompleted ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                    {task.title || 'Untitled Task'}
                  </span>
                  <span className="text-xs text-slate-500 font-medium mt-1">
                    {task.subject || task.type || ''} {task.time_remaining && `• ${task.time_remaining}`} {isPriority && <span className="text-[#1600D5] font-bold ml-1">• Priority</span>}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isCompleted ? (
                  <div className="w-6 h-6 rounded-full bg-emerald-400 flex items-center justify-center text-white text-sm font-bold shadow-sm">✓</div>
                ) : (
                  task.time_remaining && (
                    <div className="w-6 h-6 rounded-full bg-slate-400 flex items-center justify-center text-white p-[4px]">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    </div>
                  )
                )}
                {(task.xp_reward || 0) > 0 && (
                  <div className="px-2 py-1 bg-[#EAE8FA] text-[#1600D5] text-[10px] font-extrabold tracking-wider rounded">
                    +{task.xp_reward} XP
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodayTasksList;
