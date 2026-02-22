"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutPage() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (!confirmed) return;

    setIsLoggingOut(true);

    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL ?? "https://taskora-88w5.onrender.com";

      await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      document.cookie = "token=; Max-Age=0; path=/";
      router.push("/empty");
    }
  };

  return (
    <div className="flex justify-center align-middle items-center py-10 bg-gray-50 px-4">
      <div className="w-full max-w-lg text-center">
        {/* Title */}
        <h1 className="text-3xl font-semibold text-gray-800">
          Are you sure you want <br /> to logout?
        </h1>
        <p className="mt-3 text-gray-500">
          You can always log back in at any time.
        </p>

        {/* Illustration */}
        <div className="mt-10 flex justify-center">
          <Image
            src="/logout.webp"
            alt="Logout Illustration"
            width={320}
            height={320}
            priority
          />
        </div>

        {/* Actions */}
        <div className="mt-12 flex items-center justify-center gap-6">
          <button
            onClick={() => router.back()}
            className="w-40 rounded-xl border border-gray-300 bg-white py-3 text-gray-700 font-medium hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-40 rounded-xl bg-red-500 py-3 text-white font-medium hover:bg-red-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
}
