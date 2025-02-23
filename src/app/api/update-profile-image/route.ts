import { auth, clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new NextResponse("No file provided", { status: 400 });
    }

    // Convert File to Blob
    const bytes = await file.arrayBuffer();
    const blob = new Blob([bytes], { type: file.type });

    // Update user's profile image
    await clerkClient.users.updateUserProfileImage(userId, {
      file: blob,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating profile image:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
