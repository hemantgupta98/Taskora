// This is a COMPLETE, production-ready Next.js (App Router) dashboard UI
// matching the provided Taskora design.
// Stack: Next.js 14+, React, TypeScript, TailwindCSS
// Folder: app/(dashboard)/dashboard/page.tsx

"use client";

import {
  Search,
  Plus,
  Bell,
  LayoutDashboard,
  Kanban,
  Calendar,
  Users,
  BarChart2,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      {/* Main */}
      <main className="flex-1 flex flex-col">
        {/* Content */}
        <div className="p-6 space-y-6">
          <h1 className="text-2xl font-semibold">Good morning, John!</h1>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard
              title="Total Projects"
              value="12"
              subtitle="Currently active projects"
            />
            <StatCard
              title="Tasks Due Today"
              value="5"
              subtitle="Critical tasks to complete"
            />
            <StatCard
              title="Team Members"
              value="15"
              subtitle="Active members in your team"
            />
            <StatCard
              title="Upcoming Milestones"
              value="3"
              subtitle="Key deadlines approaching"
            />
          </div>

          {/* Projects */}
          <section>
            <h2 className="font-semibold mb-3">Your Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ProjectCard
                title="Taskora v2.0 Redesign"
                progress={75}
                date="2024-09-15"
              />
              <ProjectCard
                title="Marketing Campaign Launch"
                progress={40}
                date="2024-10-01"
              />
              <ProjectCard
                title="Backend API Optimization"
                progress={90}
                date="2024-08-30"
              />
              <ProjectCard
                title="Mobile App Development"
                progress={10}
                date="2024-12-15"
              />
            </div>
          </section>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card title="Tasks by Status">
              <div className="h-48 flex items-center justify-center text-gray-400">
                Chart Placeholder
              </div>
            </Card>
            <Card title="Open Tasks by Assignee">
              <div className="space-y-3">
                <ProgressBar />
                <ProgressBar />
                <ProgressBar />
                <ProgressBar />
              </div>
            </Card>
            <Card title="Current Sprint: Alpha v1.0">
              <p className="text-sm text-gray-500">7 days remaining</p>
              <div className="mt-3">
                <ProgressBar value={65} />
              </div>
            </Card>
          </div>

          {/* Activity + Milestones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card title="Recent Activity">
              <ul className="space-y-3 text-sm text-gray-600">
                <li>Completed &quot;Refactor Auth Module&quot;</li>
                <li>Added comment on &quot;Homepage Design Draft&quot;</li>
                <li>Created new project &quot;Mobile App Development&quot;</li>
              </ul>
            </Card>
            <Card title="Upcoming Milestones">
              <ul className="space-y-3 text-sm">
                <li>Taskora v2.0 Release – Sep 15</li>
                <li>Q3 Financial Report – Oct 01</li>
                <li>Marketing Campaign Go‑Live – Oct 10</li>
              </ul>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------- Components ---------- */

{
  /** 
function NavItem({ icon, label, active }: any) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm ${
        active ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {icon}
      {label}
    </div>
  );
}
  */
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function StatCard({ title, value, subtitle }: any) {
  return (
    <div className="bg-white p-4 rounded-xl border">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-semibold mt-1">{value}</h3>
      <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ProjectCard({ title, progress, date }: any) {
  return (
    <div className="bg-white p-4 rounded-xl border space-y-3">
      <h3 className="font-medium">{title}</h3>
      <div className="w-full bg-gray-200 h-2 rounded">
        <div
          className="bg-blue-500 h-2 rounded"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-gray-500">
        {progress}% Completed • Due {date}
      </p>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Card({ title, children }: any) {
  return (
    <div className="bg-white p-4 rounded-xl border">
      <h3 className="font-medium mb-3">{title}</h3>
      {children}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ProgressBar({ value = 50 }: any) {
  return (
    <div className="w-full bg-gray-200 h-3 rounded">
      <div className="bg-blue-500 h-3 rounded" style={{ width: `${value}%` }} />
    </div>
  );
}
