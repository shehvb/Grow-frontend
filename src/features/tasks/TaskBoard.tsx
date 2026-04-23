import type { FC } from "react";
import type { Task } from "../../mock/tasks.mock";
import TaskCard from "./TaskCard";

interface TaskBoardProps {
  tasks: Task[];
}

const TaskBoard: FC<TaskBoardProps> = ({ tasks }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">No tasks in this category</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskBoard;
