"use client";

import { User, Briefcase, Palette } from "lucide-react";
import { useState } from "react";

export default function SettingsTabs() {
  const [mode, setMode] = useState<"Profile" | "Workspace" | "Theme">(
    "Profile",
  );

  return (
    <>
      <div className="flex  gap-6 bg-white border shadow-2xl rounded-lg p-4 w-fit">
        <button
          onClick={() => setMode("Profile")}
          className={` flex p-2 rounded-md shadow-2xl ${mode === "Profile" ? " ring-1 ring-blue-400" : "border"}`}
        >
          <User className="p-1" />
          Profile
        </button>
        <button
          onClick={() => setMode("Workspace")}
          className={`flex p-2 rounded-md shadow-2xl ${mode === "Workspace" ? "ring-1 ring-blue-400" : "border"}`}
        >
          <Briefcase className="p-1" />
          Workspace
        </button>
        <button
          onClick={() => setMode("Theme")}
          className={`flex p-2 rounded-md shadow-2xl  ${mode === "Theme" ? "ring-1 ring-blue-400" : "border"}`}
        >
          <Palette className="p-1" />
          Theme
        </button>
      </div>
      <div>
        {mode === "Profile" && <p>My name Profile</p>}
        <h1>hiii</h1>
      </div>
    </>
  );
}
