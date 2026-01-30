"use client";

import { User, Briefcase, Palette } from "lucide-react";

const tabs = [
  { label: "Profile", icon: User, active: true },
  { label: "Workspace", icon: Briefcase },
  { label: "Theme", icon: Palette },
];

export default function SettingsTabs() {
  return (
    <div className="flex gap-2 bg-white border rounded-lg p-2 w-fit">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm
            ${tab.active ? "bg-gray-100 font-medium" : "text-gray-500 hover:bg-gray-50"}
          `}
        >
          <tab.icon size={16} />
          {tab.label}
        </button>
      ))}
    </div>
  );
}
