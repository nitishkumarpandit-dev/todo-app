"use client";

import { useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { useTaskContext } from "@/context/TaskContext";
import Modal from "@/components/Modal";
import EditProfile from "@/components/EditProfile";
import Image from "next/image";

export default function ProfileContent() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const { tasks } = useTaskContext();
  const [isEditing, setIsEditing] = useState(false);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  // Calculate stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === "completed");
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks.length / totalTasks) * 100) : 0;
  const streakDays = 45;

  const stats = [
    {
      value: totalTasks,
      label: "Total Tasks",
    },
    {
      value: `${completionRate}%`,
      label: "Completion Rate",
    },
    {
      value: streakDays,
      label: "Streak Days",
    },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl p-8">
          {/* Profile Header */}
          <div className="flex items-start space-x-8 mb-8">
            <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden">
              {user?.imageUrl ? (
                <Image
                  src={user.imageUrl}
                  alt={user.fullName || "Profile"}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">
                {user?.fullName || "Loading..."}
              </h1>
              <p className="text-lg text-gray-600 mt-1">
                {user?.primaryEmailAddress?.emailAddress || "Loading..."}
              </p>
              <div className="mt-4 space-x-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => setShowSignOutConfirm(true)}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-xl p-6 text-center shadow-sm"
              >
                <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Edit Profile Modal */}
        <Modal
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          title="Edit Profile"
        >
          <EditProfile onClose={() => setIsEditing(false)} />
        </Modal>

        {/* Sign Out Confirmation Modal */}
        <Modal
          isOpen={showSignOutConfirm}
          onClose={() => setShowSignOutConfirm(false)}
          title="Sign Out Confirmation"
        >
          <div className="p-4">
            <p className="text-gray-600 mb-6">
              Are you sure you want to sign out? You will need to sign in again
              to access your tasks.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowSignOutConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Yes, Sign Out
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </Layout>
  );
}
