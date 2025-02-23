import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { TaskProvider } from "@/context/TaskContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TodoApp - Manage Your Tasks",
  description:
    "A simple and efficient way to manage your tasks and stay organized.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <TaskProvider>
            <main>{children}</main>
          </TaskProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
