import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import connectDB from "@/lib/db";
import Task from "@/models/Task";

export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectDB();

    // Get total tasks
    const total = await Task.countDocuments({ userId });

    // Get completed tasks
    const completed = await Task.countDocuments({
      userId,
      status: "completed",
    });

    // Get pending tasks
    const pending = await Task.countDocuments({ userId, status: "pending" });

    // Calculate completion rate
    const completionRate =
      total > 0 ? Math.round((completed / total) * 100) : 0;

    // Get tasks completed this week
    const startOfWeek = new Date();
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

    const thisWeek = await Task.countDocuments({
      userId,
      status: "completed",
      updatedAt: { $gte: startOfWeek },
    });

    return NextResponse.json({
      total,
      completed,
      pending,
      completionRate,
      thisWeek,
    });
  } catch (error) {
    console.error("Error fetching task stats:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
