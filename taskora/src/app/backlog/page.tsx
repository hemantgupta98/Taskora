"use client";

import { useState } from "react";
import TaskCard from "../../components/layout/taskcard";
import FilterChips from "../../components/layout/filter";
import AddTaskSheet from "../../components/layout/tasksheet";

const tasks = [
  {
    id: 1,
    title: "GitHub OAuth Fix",
    description: "Users can’t see repos after login",
    type: "Feature",
    priority: "High",
    due: "18 Feb",
    estimate: "Medium",
    assignee: "Unassigned",
  },
];

export default function BacklogMobile() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Top Bar */}
      <header className="sticky top-0 z-10 bg-white border-b px-4 h-14 flex items-center justify-between">
        <span className="text-sm font-medium">Beyond Gravity</span>
        <h1 className="text-base font-semibold">Backlog</h1>
        <button onClick={() => setOpen(true)} className="text-blue-600 text-xl">
          +
        </button>
      </header>

      {/* Search + Filters */}
      <div className="p-4 space-y-3">
        <input
          placeholder="Search backlog…"
          className="w-full h-10 rounded-lg border px-3 text-sm"
        />
        <FilterChips />
      </div>

      {/* Backlog List */}
      <section className="px-4 space-y-4">
        <h2 className="text-sm font-medium text-red-600">
          🔴 High Priority (1)
        </h2>

        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </section>

      {/* Floating Action Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-blue-600 text-white text-2xl shadow-lg"
      >
        +
      </button>

      <AddTaskSheet open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
