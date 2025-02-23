"use client";

import { Suspense, useState } from "react";
import Layout from "@/components/Layout";
import TaskList from "@/components/TaskList";
import TaskStats from "@/components/TaskStats";
import TaskForm from "@/components/TaskForm";
import Modal from "@/components/Modal";
import { FiPlus } from "react-icons/fi";
import { useTaskContext } from "@/context/TaskContext";

interface DashboardContentProps {
  userId: string;
}

const StatsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className="bg-white rounded-xl p-6 flex items-center animate-pulse"
      >
        <div className="w-12 h-12 bg-gray-200 rounded-xl mr-4"></div>
        <div className="flex-1">
          <div className="h-6 bg-gray-200 rounded w-16 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    ))}
  </div>
);

const TaskListSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
        <div className="flex justify-between items-start mb-4">
          <div className="w-24 h-6 bg-gray-200 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="space-y-3">
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
          <div className="w-20 h-4 bg-gray-200 rounded"></div>
          <div className="w-32 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    ))}
  </div>
);

export default function DashboardContent({ userId }: DashboardContentProps) {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const { addTask } = useTaskContext();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Recent Tasks
              </h1>
              <p className="mt-1 text-base text-gray-500">
                Keep track of your latest tasks
              </p>
            </div>
            <button
              onClick={() => setIsAddingTask(true)}
              className="inline-flex items-center px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FiPlus className="w-4 h-4 mr-2" />
              Add Task
            </button>
          </div>

          {/* Stats Section */}
          <div className="mb-8">
            <Suspense fallback={<StatsSkeleton />}>
              <TaskStats userId={userId} />
            </Suspense>
          </div>

          {/* Tasks List */}
          <div>
            <Suspense fallback={<TaskListSkeleton />}>
              <TaskList filter="all" hideHeader maxTasks={6} />
            </Suspense>
          </div>
        </div>

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
    </Layout>
  );
}
