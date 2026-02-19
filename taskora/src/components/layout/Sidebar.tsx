"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";

import {
  LayoutDashboard,
  KanbanSquare,
  WorkflowIcon,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  CodeXml,
  Rows4Icon,
  BadgeQuestionMark,
  Workflow,
} from "lucide-react";
const links = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Project Board", href: "/project", icon: KanbanSquare },
  { name: "Pendings", href: "/pending", icon: Workflow },
  { name: "Team", href: "/team", icon: Users },
  { name: "Backlog", href: "/backlog", icon: WorkflowIcon },
  { name: "Code", href: "/code", icon: CodeXml },
  { name: "Plans", href: "/plan", icon: Rows4Icon },
  { name: "Developer", href: "/developer", icon: BadgeQuestionMark },
];

const downLink = [
  { name: "Setting", href: "/setting", icon: Settings },
  { name: "Help", href: "/help", icon: HelpCircle },
  { name: "Logout", href: "/logout", icon: LogOut },
];

type SidebarProps = {
  className?: string;
  onNavigate?: () => void;
};

export default function Sidebar({ className, onNavigate }: SidebarProps) {
  return (
    <aside
      className={cn(
        "w-64 max-w-full shrink-0 overflow-y-auto bg-white border-r flex flex-col cursor-pointer",
        className,
      )}
    >
      <div className="p-6 text-2xl font-bold text-primary">Taskora</div>
      <nav className="flex-1 space-y-1 px-3">
        {links.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={onNavigate}
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
              onClick={onNavigate}
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
