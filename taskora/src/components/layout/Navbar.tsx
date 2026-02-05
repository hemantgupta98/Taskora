"use client";

import { Bell, Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

export default function Navbar() {
  const router = useRouter();
  return (
    <header className="h-16 mt-2 bg-white border-b flex items-center justify-between px-6 py-2">
      <div className="flex items-center gap-4">
        <Search className="text-gray-400" size={18} />
        <input
          placeholder="Search..."
          className="outline-none bg-transparent"
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/create-task")}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg"
        >
          <Plus size={16} />
          Create Task
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
