import type { Metadata } from "next";

import "./globals.css";
import AppShell from "../components/layout/Appshell";

export const metadata: Metadata = {
  title: "Taskora",
  description: "SaaS Project Management Tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
