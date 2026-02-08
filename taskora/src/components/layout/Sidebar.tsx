"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  LayoutDashboard,
  KanbanSquare,
  WorkflowIcon,
  Users,
  Puzzle,
  Settings,
  HelpCircle,
  LogOut,
  CodeXml,
} from "lucide-react";
const links = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Project Board", href: "/project", icon: KanbanSquare },
  { name: "Sprint & Timeline", href: "/timeline", icon: Puzzle },
  { name: "Team", href: "/team", icon: Users },
  { name: "Backlog", href: "/backlog", icon: WorkflowIcon },
  { name: "Code", href: "/code", icon: CodeXml },
];

const downLink = [
  { name: "Setting", href: "/setting", icon: Settings },
  { name: "Help", href: "/help", icon: HelpCircle },
  { name: "Logout", href: "/logout", icon: LogOut },
];

export default function Sidebar() {
  const router = useRouter();
  return (
    <aside className="w-64 bg-white border-r flex flex-col cursor-pointer">
      <div
        onClick={() => router.replace("/empty")}
        className="p-6 text-xl font-bold text-primary"
      >
        Taskora
      </div>
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

      <div className="border-t p-4 space-y-2">
        <nav>
          {downLink.map((e) => (
            <Link
              key={e.name}
              href={e.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <e.icon size={18} />
              {e.name}
            </Link>
          ))}
        </nav>
        {/**div onClick={() => router.push("/setting")}>
          <SidebarItem icon={Settings} label="Settings" />
        </div>

        <SidebarItem icon={HelpCircle} label="Help" />
        <SidebarItem icon={LogOut} label="Log Out" /> */}
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
