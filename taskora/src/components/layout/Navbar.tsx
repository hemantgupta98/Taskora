"use client";

import { Bell, Menu, Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";

type NavbarProps = {
  onMenuClick?: () => void;
};

export default function Navbar({ onMenuClick }: NavbarProps) {
  const router = useRouter();
  return (
    <header className="mt-2 flex h-16 items-center justify-between border-b bg-white px-3 py-2 sm:px-4 lg:px-6">
      <div className="flex min-w-0 items-center gap-2 sm:gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden text-gray-600"
          aria-label="Open sidebar menu"
        >
          <Menu size={20} />
        </button>
        <div className="hidden items-center gap-2 rounded-md border px-2 py-1.5 sm:flex">
          <Search className="text-gray-400" size={18} />
          <input
            placeholder="Search..."
            className="w-28 bg-transparent text-sm outline-none md:w-44 lg:w-64"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={() => router.push("/create-task")}
          className="flex items-center gap-1 rounded-lg bg-primary px-2.5 py-2 text-white sm:gap-2 sm:px-4"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">Create Task</span>
        </button>
        <div className="relative">
          <Sheet>
            <SheetTrigger>
              <div className="h-2 w-2 absolute right-1 bg-red-500 rounded-full animate-pulse"></div>
              <Bell className="text-gray-500 cursor-pointer " />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                  This action cannot be undone.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>

        {/**<Image
          src="/pic.jpg"
          alt="Profile"
          width={36}
          height={36}
          className="rounded-full"
        /> */}
      </div>
    </header>
  );
}
