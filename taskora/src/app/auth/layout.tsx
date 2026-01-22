import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth | Taskora",
  description: "Login/Register to Taskora",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {children}
    </div>
  );
}
