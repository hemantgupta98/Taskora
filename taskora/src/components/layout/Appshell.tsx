"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Sheet, SheetContent } from "../ui/sheet";
import { Skeleton } from "../ui/skeleton";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTransitioningRef = useRef(false);
  const router = useRouter();
  const pathname = usePathname();
  const publicRoutes = ["/", "/empty", "/auth", "/forget", "/acceptInvite"];
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    isTransitioningRef.current = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsTransitioning(false);
  }, [pathname]);

  useEffect(() => {
    const handleInternalNavigation = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;

      if (!anchor || isTransitioningRef.current) return;
      if (
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
      ) {
        return;
      }

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("javascript:")) {
        return;
      }

      if (anchor.target && anchor.target !== "_self") return;

      const nextUrl = new URL(href, window.location.origin);
      if (nextUrl.origin !== window.location.origin) return;

      const nextRoute = `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`;
      const currentRoute = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      if (nextRoute === currentRoute) return;

      event.preventDefault();

      isTransitioningRef.current = true;
      setIsTransitioning(true);

      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }

      transitionTimerRef.current = setTimeout(() => {
        router.push(nextRoute);
      }, 2000);
    };

    document.addEventListener("click", handleInternalNavigation, true);

    return () => {
      document.removeEventListener("click", handleInternalNavigation, true);
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, [router]);

  const shellContent = isPublicRoute ? (
    <main className="min-h-dvh">{children}</main>
  ) : (
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

  return (
    <>
      {shellContent}

      {isTransitioning && (
        <div className="fixed inset-0 z-50 bg-background/90 p-4 sm:p-6">
          <div className="mx-auto w-full max-w-6xl space-y-5">
            <Skeleton className="h-10 w-52" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Skeleton className="h-28 w-full" />
              <Skeleton className="h-28 w-full" />
              <Skeleton className="h-28 w-full" />
            </div>
            <Skeleton className="h-72 w-full" />
            <div className="grid gap-4 lg:grid-cols-2">
              <Skeleton className="h-52 w-full" />
              <Skeleton className="h-52 w-full" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
