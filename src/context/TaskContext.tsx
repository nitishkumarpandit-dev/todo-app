"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { ITask } from "@/models/Task";

interface TaskContextType {
  tasks: ITask[];
  fetchTasks: () => Promise<void>;
  addTask: (taskData: Partial<ITask>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  updateTaskStatus: (
    taskId: string,
    status: "pending" | "completed"
  ) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const fetchTasks = useCallback(async () => {
    try {
      const response = await fetch("/api/tasks");
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, []);

  const addTask = useCallback(async (taskData: Partial<ITask>) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });
      if (!response.ok) throw new Error("Failed to create task");
      const newTask = await response.json();
      setTasks((prev) => [newTask, ...prev]);
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  }, []);

  const deleteTask = useCallback(async (taskId: string) => {
    try {
      const response = await fetch(`/api/tasks?id=${taskId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete task");
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }, []);

  const updateTaskStatus = useCallback(
    async (taskId: string, status: "pending" | "completed") => {
      try {
        const response = await fetch("/api/tasks", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: taskId, status }),
        });
        if (!response.ok) throw new Error("Failed to update task status");
        const updatedTask = await response.json();
        setTasks((prev) =>
          prev.map((task) =>
            task._id === updatedTask._id ? updatedTask : task
          )
        );
      } catch (error) {
        console.error("Error updating task status:", error);
        throw error;
      }
    },
    []
  );

  return (
    <TaskContext.Provider
      value={{ tasks, fetchTasks, addTask, deleteTask, updateTaskStatus }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
}
