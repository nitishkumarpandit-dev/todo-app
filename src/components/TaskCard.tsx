"use client";

import { FiTrash2 } from "react-icons/fi";
import { ITask } from "@/models/Task";

interface TaskCardProps {
  task: ITask;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: "pending" | "completed") => void;
}

const TaskCard = ({ task, onDelete, onStatusChange }: TaskCardProps) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const statusBadgeClasses = {
    pending: "bg-yellow-50 text-yellow-800",
    completed: "bg-green-50 text-green-800",
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              task.status === "completed"
                ? statusBadgeClasses.completed
                : statusBadgeClasses.pending
            }`}
          >
            {task.status === "completed" ? "Completed" : "In Progress"}
          </div>
          <button
            onClick={() => onDelete(task._id as string)}
            className="text-gray-400 hover:text-red-600 p-1 rounded-lg hover:bg-red-50"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1">
          <h3
            className={`text-lg font-medium mb-2 ${
              task.status === "completed"
                ? "text-gray-400 line-through"
                : "text-gray-900"
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p className="text-gray-500 text-sm mb-4 line-clamp-2">
              {task.description}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {task.dueDate && (
            <p className="text-sm text-gray-500">
              Due {formatDate(task.dueDate)}
            </p>
          )}
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={task.status === "completed"}
              onChange={() =>
                onStatusChange(
                  task._id as string,
                  task.status === "completed" ? "pending" : "completed"
                )
              }
              className="w-4 h-4 border-2 border-gray-300 rounded text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
            />
            <span className="ml-2 text-sm text-gray-600">Mark as complete</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
