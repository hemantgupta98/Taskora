"use client";

import {
  LayoutDashboard,
  KanbanSquare,
  Timer,
  Users,
  BarChart3,
  Puzzle,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";

const menu = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Project Board", icon: KanbanSquare },
  { name: "Sprint & Timeline", icon: Timer },
  { name: "Team", icon: Users, active: true },
  { name: "Analytics", icon: BarChart3 },
  { name: "Components Library", icon: Puzzle },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r flex flex-col">
      <div className="p-6 text-xl font-bold text-primary">Taskora</div>

      <nav className="flex-1 space-y-1 px-3">
        {menu.map((item) => (
          <div
            key={item.name}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer
              ${item.active ? "bg-blue-50 text-primary" : "hover:bg-gray-100"}
            `}
          >
            <item.icon size={18} />
            <span>{item.name}</span>
          </div>
        ))}
      </nav>

      <div className="border-t p-3 space-y-2">
        <SidebarItem icon={Settings} label="Settings" />
        <SidebarItem icon={HelpCircle} label="Help" />
        <SidebarItem icon={LogOut} label="Log Out" />
      </div>
    </aside>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SidebarItem({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
      <Icon size={18} />
      <span>{label}</span>
    </div>
  );
}
