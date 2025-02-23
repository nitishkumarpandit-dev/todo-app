import { auth, clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { publicMetadata } = body;

    await clerkClient.users.updateUser(userId, {
      publicMetadata,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating user metadata:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
