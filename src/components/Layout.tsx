"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UserButton, useUser, useClerk } from "@clerk/nextjs";
import {
  FiHome,
  FiList,
  FiCheckCircle,
  FiSearch,
  FiBell,
  FiCheckSquare,
  FiLogOut,
} from "react-icons/fi";
import Modal from "./Modal";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: FiHome },
    { name: "Tasks", href: "/tasks", icon: FiList },
    { name: "Completed", href: "/completed", icon: FiCheckCircle },
  ];

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200">
        <div className="flex flex-col h-full">
          <div className="flex items-center h-16 px-6 border-b border-gray-200">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
                <FiCheckSquare className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-center">
                <span className="text-xl font-bold text-gray-900">Todo</span>
                <span className="text-xl font-bold text-blue-600">App</span>
              </div>
            </Link>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <Link
              href="/profile"
              className="flex items-center hover:bg-gray-50 p-2 rounded-lg transition-colors"
            >
              <UserButton afterSignOutUrl="/" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">
                  {user?.fullName || "Loading..."}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.primaryEmailAddress?.emailAddress || "Loading..."}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-end h-16 px-6">
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-50">
                <FiSearch className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-50">
                <FiBell className="w-5 h-5" />
              </button>
              <div className="h-6 w-px bg-gray-200" />
              <button
                onClick={() => setShowSignOutConfirm(true)}
                className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <FiLogOut className="w-5 h-5 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>

      {/* Sign Out Confirmation Modal */}
      <Modal
        isOpen={showSignOutConfirm}
        onClose={() => setShowSignOutConfirm(false)}
        title="Sign Out"
      >
        <div className="p-4">
          <p className="text-gray-600 mb-6">
            Are you sure you want to sign out?
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
  );
};

export default Layout;
