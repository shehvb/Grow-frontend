import type { FC } from "react";
import type { Task } from "../../mock/tasks.mock";

interface TaskCardProps {
  task: Task;
}

const TaskCard: FC<TaskCardProps> = ({ task }) => {
  const statusColors = {
    pending: "bg-blue-100 text-blue-700",
    overdue: "bg-red-100 text-red-700",
    completed: "bg-emerald-100 text-emerald-700",
  };
  
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={task.status === "completed"}
          readOnly
          className="mt-1 w-5 h-5 rounded border-slate-300 text-emerald-500"
        />
        <div className="flex-1">
          <p className={`font-medium ${task.status === "completed" ? "text-slate-400 line-through" : "text-slate-700"}`}>
            {task.title}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className={`text-xs px-2 py-1 rounded-full ${statusColors[task.status]}`}>
              {task.status}
            </span>
            <span className="text-xs text-slate-400">Due: {task.dueDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
