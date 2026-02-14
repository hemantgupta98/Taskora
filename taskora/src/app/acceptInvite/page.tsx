"use client";

import { useState } from "react";
import Image from "next/image";

export default function AcceptInvite() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold">Welcome to Taskora 🎉</h1>
          <p className="text-gray-500 text-sm mt-1">
            You’re invited to join <b>Team Alpha</b> as <b>Editor</b>
          </p>
        </div>

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-5">
          <div className="w-24 h-24 rounded-full border flex items-center justify-center overflow-hidden bg-gray-100">
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Profile Preview"
                width={96}
                height={96}
                className="object-cover"
              />
            ) : (
              <span className="text-gray-400 text-sm">Upload</span>
            )}
          </div>

          <label className="mt-2 text-sm text-blue-600 cursor-pointer">
            Upload Photo
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        {/* Form */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Set Password"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Join Team
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-center text-gray-400 mt-4">
          By joining, you agree to Taskora’s Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}
