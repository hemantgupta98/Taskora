"use client";

import Image from "next/image";

import { Upload } from "lucide-react";

export default function ProfileForm() {
  return (
    <div className="bg-white border rounded-xl p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Basic Information</h2>
        <p className="text-sm text-gray-500">
          Manage your personal profile details.
        </p>
      </div>

      {/* Profile Image */}
      <div className="flex items-center gap-6 mb-8">
        <Image
          src="/logo.png"
          alt="Profile"
          width={72}
          height={72}
          className="rounded-full"
        />
        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">
          <Upload size={16} />
          Upload New Image
        </button>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6"></div>

      {/* Contact Info */}
      <div className="mt-8">
        <h3 className="font-semibold mb-1">Contact Information</h3>
        <p className="text-sm text-gray-500 mb-4">
          Update your contact details for better communication.
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 mt-8">
        <button className="px-5 py-2 border rounded-lg text-sm">Cancel</button>
        <button className="px-5 py-2 bg-blue-500 text-white rounded-lg text-sm">
          Save Changes
        </button>
      </div>
    </div>
  );
}
