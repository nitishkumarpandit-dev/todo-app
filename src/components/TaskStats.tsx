"use client";

import { useState, useEffect } from "react";
import { FiCheckCircle, FiClock, FiList } from "react-icons/fi";

interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  completionRate: number;
  thisWeek: number;
}

interface TaskStatsProps {
  userId: string;
}

const TaskStats = ({ userId }: TaskStatsProps) => {
  const [stats, setStats] = useState<TaskStats>({
    total: 0,
    completed: 0,
    pending: 0,
    completionRate: 0,
    thisWeek: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`/api/tasks/stats?userId=${userId}`);
        if (!response.ok) throw new Error("Failed to fetch stats");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, [userId]);

  const statCards = [
    {
      title: "Total Tasks",
      value: stats.total,
      icon: FiList,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: FiCheckCircle,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: FiClock,
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-6">
      {statCards.map((stat) => (
        <div
          key={stat.title}
          className="bg-white rounded-xl p-6 flex items-center"
        >
          <div className={`${stat.bgColor} p-3 rounded-xl`}>
            <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
          </div>
          <div className="ml-4 flex items-center gap-2">
            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskStats;
