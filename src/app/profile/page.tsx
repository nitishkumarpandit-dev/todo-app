import { auth } from "@clerk/nextjs";
import ProfileContent from "./ProfileContent";

export default async function ProfilePage() {
  const { userId } = auth();

  if (!userId) return null;

  return <ProfileContent userId={userId} />;
}
