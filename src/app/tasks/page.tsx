import { auth } from "@clerk/nextjs";
import TasksContent from "./TasksContent";

export default async function TasksPage() {
  const { userId } = auth();

  if (!userId) return null;

  return <TasksContent />;
}
