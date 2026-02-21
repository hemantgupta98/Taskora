"use client";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full px-4 sm:px-6 lg:px-8 py-4 mt-2 sm:mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
      {/* Logo */}
      <div className="flex items-center gap-2 sm:ml-2 lg:ml-5">
        <Image
          src="/logo.png"
          alt="logo"
          height={42}
          width={42}
          className="sm:h-[50px] sm:w-[50px]"
        />
        <span className="text-lg sm:text-xl font-semibold">Taskora</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-start">
        <button className="bg-blue-500 text-white px-4 sm:px-5 py-2 rounded-md hover:bg-blue-600 text-sm sm:text-base whitespace-nowrap cursor-pointer">
          <Link href={"/auth"}>Log In</Link>
        </button>
        <button className="bg-blue-500 text-white px-4 sm:px-5 py-2 rounded-md hover:bg-blue-600 text-sm sm:text-base whitespace-nowrap cursor-pointer">
          <Link href={"/auth"}>Get start free</Link>
        </button>
      </div>
    </nav>
  );
}
