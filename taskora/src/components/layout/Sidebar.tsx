"use client";
import Link from "next/link";
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

const links = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Project Board", href: "/auth", icon: KanbanSquare },
  { name: "Sprint & Timeline", href: "/forget", icon: Puzzle },
  { name: "Team", href: "/team", icon: Users },
  { name: "Components Library", href: "/invite-team", icon: BarChart3 },
  { name: "Settings", href: "/setting", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r flex flex-col">
      <div className="p-6 text-xl font-bold text-primary">Taskora</div>

      <nav className="flex-1 space-y-1 px-3">
        {links.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            <item.icon size={18} />
            {item.name}
          </Link>
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
