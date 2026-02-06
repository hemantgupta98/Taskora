"use client";

import Image from "next/image";
import { useState } from "react";
import { Flag, MoreVertical, Search } from "lucide-react";

// ------------------ TYPES ------------------
type Task = {
  id: string;
  title: string;
  assignees: string[]; // initials
  label?: string;
  priority?: "low" | "medium" | "high";
  startDate?: string;
  dueDate?: string;
};

type Section = {
  name: string;
  color: string;
  tasks: Task[];
};

// ------------------ MOCK DATA ------------------
const sections: Section[] = [
  {
    name: "To Do",
    color: "border-blue-400",
    tasks: [],
  },
  {
    name: "Planning",
    color: "border-purple-400",
    tasks: [
      {
        id: "TASK-005",
        title: "Marketing landing page",
        assignees: ["A", "B"],
        label: "For Marketing Team",
        priority: "medium",
        startDate: "28-OCT-2021",
        dueDate: "05-NOV-2021",
      },
    ],
  },
  {
    name: "Draft",
    color: "border-yellow-400",
    tasks: [
      {
        id: "TASK-006",
        title: "UI wireframes",
        assignees: ["C", "D"],
        priority: "low",
        startDate: "29-OCT-2021",
        dueDate: "06-NOV-2021",
      },
      {
        id: "TASK-007",
        title: "API contract",
        assignees: ["A", "E"],
        priority: "high",
        startDate: "29-OCT-2021",
        dueDate: "06-NOV-2021",
      },
    ],
  },
  {
    name: "Published",
    color: "border-green-400",
    tasks: [
      {
        id: "TASK-010",
        title: "Release v1",
        assignees: ["J", "S"],
        startDate: "30-OCT-2021",
        dueDate: "15-NOV-2021",
      },
      {
        id: "TASK-011",
        title: "Docs update",
        assignees: ["A", "B"],
        startDate: "30-OCT-2021",
        dueDate: "14-NOV-2021",
      },
    ],
  },
];

// ------------------ COMPONENT ------------------
export default function TaskBoardPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Main */}
      <main className="flex-1 p-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Task..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border bg-white text-sm"
            />
          </div>
          <div className="flex gap-3">
            <button className="px-3 py-1.5 border rounded-full text-sm">
              PRIORITY
            </button>
            <button className="px-3 py-1.5 border rounded-full text-sm">
              LABEL
            </button>
            <button className="px-3 py-1.5 text-sm text-gray-500">
              CLEAR FILTERS
            </button>
            <MoreVertical />
          </div>
        </div>

        {/* Board */}
        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.name}>
              <h3 className="text-sm font-semibold text-gray-600 mb-2">
                {section.name}
              </h3>

              {/* Table Header */}
              <div className="grid grid-cols-8 text-xs bg-gray-50 border rounded-t-md px-3 py-2">
                <span>Task Title</span>
                <span>Assignee</span>
                <span>Sub Status</span>
                <span>Labels</span>
                <span>Priority</span>
                <span>Start Date</span>
                <span>Due Date</span>
                <span>Delete</span>
              </div>

              {/* Rows */}
              <div className="border rounded-b-md divide-y bg-white">
                {section.tasks.length === 0 && (
                  <div className="text-center py-4 text-blue-500 text-sm">
                    Drop here
                  </div>
                )}

                {section.tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`grid grid-cols-7 items-center px-3 py-3 text-sm border-l-4 ${section.color}`}
                  >
                    <span className="font-medium text-gray-700">{task.id}</span>

                    <div className="flex -space-x-2">
                      {task.assignees.map((a) => (
                        <div
                          key={a}
                          className="h-7 w-7 rounded-full bg-gray-300 text-xs flex items-center justify-center border"
                        >
                          {a}
                        </div>
                      ))}
                    </div>

                    <span />

                    <span>
                      {task.label && (
                        <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
                          {task.label}
                        </span>
                      )}
                    </span>

                    <span>
                      {task.priority && (
                        <Flag
                          className={`h-4 w-4 ${
                            task.priority === "high"
                              ? "text-red-500"
                              : task.priority === "medium"
                                ? "text-yellow-500"
                                : "text-blue-500"
                          }`}
                        />
                      )}
                    </span>

                    <span className="text-xs text-green-600">
                      {task.startDate}
                    </span>
                    <span className="text-xs text-red-500">{task.dueDate}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
