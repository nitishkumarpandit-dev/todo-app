import { auth } from "@clerk/nextjs";
import DashboardContent from "./DashboardContent";

export default async function DashboardPage() {
  const { userId } = auth();

  if (!userId) return null;

  return <DashboardContent userId={userId} />;
}
