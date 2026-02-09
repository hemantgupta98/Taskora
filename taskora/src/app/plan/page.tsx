"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, Search, Plus } from "lucide-react";

export default function CreatePlanPage() {
  const [name, setName] = useState("");
  const [access, setAccess] = useState("Open");
  const [workType, setWorkType] = useState("Board");
  const [boardName, setBoardName] = useState("");

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <Image src="/logo.png" alt="logo" height={50} width={50} />
            <span className="text-xl font-semibold">Taskora</span>
          </div>

          <h1 className="mb-2 text-2xl font-semibold text-gray-900">
            Create your plan
          </h1>
          <p className="text-gray-600">
            Visualize, plan, track, and report on work across multiple spaces,
            boards or teams.
          </p>
        </div>

        <p className="mb-6 text-sm text-gray-500">
          Required fields are marked with an asterisk
          <span className="text-red-500">*</span>
        </p>

        {/* Name */}
        <div className="mb-6">
          <label className="mb-1 block text-sm font-medium text-gray-800">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a plan name"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none"
          />
        </div>

        {/* Access */}
        <div className="mb-8">
          <label className="mb-1 block text-sm font-medium text-gray-800">
            Access <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              value={access}
              onChange={(e) => setAccess(e.target.value)}
              className="w-full appearance-none rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-600 focus:outline-none"
            >
              <option>Open</option>
              <option>Private</option>
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>
        </div>

        {/* Add work */}
        <div className="mb-10">
          <h2 className="mb-1 text-lg font-semibold text-gray-900">Add work</h2>
          <p className="mb-4 text-sm text-gray-600">
            Include work items from multiple spaces, boards, or using filters.
          </p>

          <label className="mb-2 block text-sm font-medium text-gray-800">
            Work <span className="text-red-500">*</span>
          </label>

          <div className="flex gap-3">
            {/* Work type */}
            <div className="relative w-40">
              <select
                value={workType}
                onChange={(e) => setWorkType(e.target.value)}
                className="w-full appearance-none rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-600 focus:outline-none"
              >
                <option>Board</option>
                <option>Project</option>
                <option>Filter</option>
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
            </div>

            {/* Board name */}
            <div className="relative flex-1">
              <input
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
                placeholder="Enter board name"
                className="w-full rounded border border-gray-300 px-3 py-2 pr-9 text-sm focus:border-blue-600 focus:outline-none"
              />
              <Search
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>

          {/* Add more work */}
          <button
            type="button"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gray-400 cursor-not-allowed"
          >
            <Plus size={16} />
            Add more work
          </button>
        </div>

        {/* Footer */}
        <div className="flex justify-end">
          <button className="rounded bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700">
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
