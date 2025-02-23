import { auth } from "@clerk/nextjs";
import CompletedContent from "./CompletedContent";

export default async function CompletedPage() {
  const { userId } = auth();

  if (!userId) return null;

  return <CompletedContent userId={userId} />;
}
