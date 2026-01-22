"use client";

import { Bell, Plus, Search } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <Search className="text-gray-400" size={18} />
        <input
          placeholder="Search..."
          className="outline-none bg-transparent"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg">
          <Plus size={16} />
          Create Task
        </button>

        <Bell className="text-gray-500 cursor-pointer" />

        <Image
          src="/pic.jpg"
          alt="Profile"
          width={36}
          height={36}
          className="rounded-full"
        />
      </div>
    </header>
  );
}
