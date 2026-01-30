"use client";

import { User, Briefcase, Palette } from "lucide-react";
import { useState } from "react";

const tabs = [
  { label: "Profile", icon: User, active: true },
  { label: "Workspace", icon: Briefcase },
  { label: "Theme", icon: Palette },
];

export default function SettingsTabs() {
  const [mode, setMode] = useState<"Profile" | "Workspace" | "Theme">(
    "Profile",
  );

  return (
    <>
      <div className="flex gap-2 bg-white border rounded-lg p-2 w-fit">
        <button
          onClick={() => setMode("Profile")}
          className={` flex ${mode === "Profile" ? "bg-blue-400" : "border-2"}`}
        >
          Profile
        </button>
        <button
          onClick={() => setMode("Workspace")}
          className={` flex ${mode === "Workspace" ? "bg-green-400" : "border-2"}`}
        >
          Workspace
        </button>
        <button
          onClick={() => setMode("Theme")}
          className={` flex ${mode === "Theme" ? "bg-red-400" : "border-2"}`}
        >
          Theme
        </button>
      </div>
      <div>{mode === "Profile" && <p>My name Profile</p>}</div>
      <div>{mode === "Workspace" && <p>My name Workspace</p>}</div>
      <div>{mode === "Theme" && <p>My name Theme</p>}</div>
    </>
  );
}

{
  /**{tabs.map((tab) => (
        <button
          key={tab.label}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm
            ${tab.active ? "bg-gray-100 font-medium" : "text-gray-500 hover:bg-gray-50"}
          `}
        >
          <tab.icon size={16} />
          {tab.label}
        </button>
      ))} */
}
