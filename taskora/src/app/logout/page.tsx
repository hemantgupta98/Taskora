"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
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
            src="/logout-illustration.png"
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
            onClick={() => router.push("/auth")}
            className="w-40 rounded-xl bg-red-500 py-3 text-white font-medium hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
