import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-white shadow-lg rounded-lg",
            headerTitle: "text-2xl font-bold text-gray-900",
            headerSubtitle: "text-gray-500",
            formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
          },
        }}
      />
    </div>
  );
}
