"use client";

import { useState } from "react";
import { FiSearch, FiPlus } from "react-icons/fi";
import Layout from "@/components/Layout";
import TaskList from "@/components/TaskList";
import TaskForm from "@/components/TaskForm";
import Modal from "@/components/Modal";
import { useTaskContext } from "@/context/TaskContext";

type FilterType = "all" | "in-progress" | "completed";

export default function TasksContent() {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { addTask } = useTaskContext();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                All Tasks
              </h1>
              <p className="mt-1 text-base text-gray-500">
                Manage and organize your tasks
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 text-gray-600 bg-gray-50 border border-gray-200 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
              <button
                onClick={() => setIsAddingTask(true)}
                className="inline-flex items-center px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <FiPlus className="w-4 h-4 mr-2" />
                New Task
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeFilter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter("in-progress")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeFilter === "in-progress"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setActiveFilter("completed")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeFilter === "completed"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              Completed
            </button>
          </div>

          {/* Task List */}
          <TaskList
            filter={
              activeFilter === "all"
                ? undefined
                : activeFilter === "in-progress"
                ? "pending"
                : "completed"
            }
            searchQuery={searchQuery}
          />

          {/* Add Task Modal */}
          <Modal
            isOpen={isAddingTask}
            onClose={() => setIsAddingTask(false)}
            title="Create New Task"
          >
            <TaskForm
              onSubmit={async (taskData) => {
                try {
                  await addTask(taskData);
                  setIsAddingTask(false);
                } catch (error) {
                  console.error("Error creating task:", error);
                }
              }}
              onCancel={() => setIsAddingTask(false)}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
}
