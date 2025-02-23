"use client";

import { useState, Suspense } from "react";
import { FiSearch, FiCheckCircle, FiClock, FiTrendingUp } from "react-icons/fi";
import Layout from "@/components/Layout";
import TaskList from "@/components/TaskList";
import { useTaskContext } from "@/context/TaskContext";

interface CompletedContentProps {
  userId: string;
}

export default function CompletedContent({ userId }: CompletedContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { tasks } = useTaskContext();

  // Calculate stats
  const completedTasks = tasks.filter((task) => task.status === "completed");
  const completionRate =
    tasks.length > 0
      ? Math.round((completedTasks.length / tasks.length) * 100)
      : 0;

  // Calculate tasks completed this week
  const startOfWeek = new Date();
  startOfWeek.setHours(0, 0, 0, 0);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  const thisWeekTasks = completedTasks.filter((task) => {
    const taskDate = new Date(task.updatedAt);
    return taskDate >= startOfWeek;
  });

  const stats = [
    {
      title: "Tasks Completed",
      value: completedTasks.length,
      icon: FiCheckCircle,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Completion Rate",
      value: `${completionRate}%`,
      icon: FiClock,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "This Week",
      value: thisWeekTasks.length,
      icon: FiTrendingUp,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl p-8">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Completed Tasks
              </h1>
              <p className="mt-1 text-base text-gray-500">
                View your accomplished tasks
              </p>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search completed tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat) => (
              <div
                key={stat.title}
                className="bg-white rounded-xl p-6 flex items-center shadow-sm"
              >
                <div className={`${stat.bgColor} p-3 rounded-xl`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Recently Completed Section */}
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Recently Completed
              </h2>
            </div>
            <Suspense
              fallback={
                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-16 bg-gray-50 rounded-lg animate-pulse"
                    />
                  ))}
                </div>
              }
            >
              <TaskList
                filter="completed"
                hideHeader
                searchQuery={searchQuery}
                className="space-y-2"
              />
            </Suspense>
          </div>
        </div>
      </div>
    </Layout>
  );
}
