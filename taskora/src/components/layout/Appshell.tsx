"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Sheet, SheetContent } from "../ui/sheet";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const publicRoutes = ["/", "/empty", "/auth", "/forget"];
  const isPublicRoute = publicRoutes.includes(pathname);

  if (isPublicRoute) {
    return <main className="min-h-dvh">{children}</main>;
  }

  return (
    <div className="flex h-dvh overflow-hidden bg-gray-50">
      <div className="hidden shrink-0 lg:sticky lg:top-0 lg:block lg:h-dvh">
        <Sidebar className="h-dvh" />
      </div>

      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent
          side="left"
          className="w-[80vw] max-w-64 p-0 sm:w-64"
          showCloseButton
        >
          <Sidebar
            className="h-full border-r-0"
            onNavigate={() => setIsSidebarOpen(false)}
          />
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4 lg:p-6">
          <div className="mx-auto w-full max-w-400">{children}</div>
        </main>
      </div>
    </div>
  );
}
