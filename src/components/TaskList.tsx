"use client";

import { useEffect } from "react";
import TaskCard from "./TaskCard";
import { useTaskContext } from "@/context/TaskContext";

interface TaskListProps {
  filter?: "all" | "today" | "completed" | "pending";
  title?: string;
  description?: string;
  hideHeader?: boolean;
  maxTasks?: number;
  searchQuery?: string;
  className?: string;
}

const TaskList = ({
  filter = "all",
  title,
  description,
  hideHeader = false,
  maxTasks,
  searchQuery = "",
  className = "",
}: TaskListProps) => {
  const { tasks, fetchTasks, deleteTask, updateTaskStatus } = useTaskContext();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filteredTasks = tasks
    .filter((task) => {
      // First apply the filter
      if (filter === "completed") return task.status === "completed";
      if (filter === "pending") return task.status === "pending";
      if (filter === "today") {
        const today = new Date();
        const taskDate = task.dueDate ? new Date(task.dueDate) : null;
        if (!taskDate) return false;
        return (
          taskDate.getDate() === today.getDate() &&
          taskDate.getMonth() === today.getMonth() &&
          taskDate.getFullYear() === today.getFullYear()
        );
      }
      return true;
    })
    .filter((task) => {
      // Then apply the search query
      if (!searchQuery) return true;
      return task.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

  const displayTasks = maxTasks
    ? filteredTasks.slice(0, maxTasks)
    : filteredTasks;

  return (
    <div
      className={`${
        hideHeader ? "" : "bg-white rounded-lg shadow-sm"
      } ${className}`}
    >
      <div className={hideHeader ? "" : "p-6"}>
        {!hideHeader && (
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
              {description && (
                <p className="mt-1 text-sm text-gray-500">{description}</p>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayTasks.map((task) => (
            <TaskCard
              key={task._id as string}
              task={task}
              onDelete={deleteTask}
              onStatusChange={updateTaskStatus}
            />
          ))}
          {displayTasks.length === 0 && (
            <div className="col-span-full">
              <p className="text-center py-8 text-gray-500">No tasks found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
