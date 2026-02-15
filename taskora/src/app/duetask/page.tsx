"use client";

import React from "react";
import { CheckCircle2, ChevronDown, Plus, Search } from "lucide-react";

// ------------------ Types ------------------

type IssueStatus = "TO DO" | "IN PROGRESS";

type Issue = {
  id: string;
  title: string;
  tag: string;
  status: IssueStatus;
  points: number;
  assigneeColor: string;
};

type Sprint = {
  name: string;
  dateRange: string;
  issues: Issue[];
};

// ------------------ Mock Data ------------------

const sprints: Sprint[] = [
  {
    name: "Sprint 3",
    dateRange: "7 Feb – 21 Feb",
    issues: [
      {
        id: "NUC-338",
        title: "Trip management frontend",
        tag: "BILLING",
        status: "IN PROGRESS",
        points: 2,
        assigneeColor: "bg-orange-500",
      },
      {
        id: "NUC-344",
        title: "Optimize experience for mobile web",
        tag: "ACCOUNTS",
        status: "TO DO",
        points: 1,
        assigneeColor: "bg-green-500",
      },
      {
        id: "NUC-360",
        title: "Onboard workout options (OWO)",
        tag: "ACCOUNTS",
        status: "TO DO",
        points: 5,
        assigneeColor: "bg-orange-400",
      },
    ],
  },
  {
    name: "Sprint 4",
    dateRange: "22 Feb – 7 Mar",
    issues: [
      {
        id: "NUC-336",
        title: "Quick booking for accommodations",
        tag: "FORMS",
        status: "TO DO",
        points: 1,
        assigneeColor: "bg-red-400",
      },
      {
        id: "NUC-346",
        title: "Adapt web app to new payments",
        tag: "FORMS",
        status: "TO DO",
        points: 2,
        assigneeColor: "bg-green-400",
      },
    ],
  },
];

// ------------------ Components ------------------

function IssueRow({ issue }: { issue: Issue }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-3 hover:bg-gray-50">
      <div className="flex items-center gap-3">
        <CheckCircle2 className="h-4 w-4 text-blue-500" />
        <span className="text-sm font-medium text-gray-500">{issue.id}</span>
        <span className="text-sm text-gray-900">{issue.title}</span>
      </div>

      <div className="flex items-center gap-4">
        <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-600">
          {issue.tag}
        </span>
        <span
          className={`rounded px-2 py-0.5 text-xs font-semibold ${
            issue.status === "IN PROGRESS"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {issue.status}
        </span>
        <span className="text-sm text-gray-600">{issue.points}</span>
        <div
          className={`h-7 w-7 rounded-full ${issue.assigneeColor}`}
          title="Assignee"
        />
      </div>
    </div>
  );
}

function SprintSection({ sprint }: { sprint: Sprint }) {
  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ChevronDown className="h-4 w-4 text-gray-600" />
          <h2 className="text-sm font-semibold text-gray-900">{sprint.name}</h2>
          <span className="text-sm text-gray-500">{sprint.dateRange}</span>
          <span className="text-sm text-gray-400">
            ({sprint.issues.length} issues)
          </span>
        </div>
        <button className="rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100">
          Complete sprint
        </button>
      </div>

      <div className="space-y-2">
        {sprint.issues.map((issue) => (
          <IssueRow key={issue.id} issue={issue} />
        ))}
        <button className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
          <Plus className="h-4 w-4" /> Create issue
        </button>
      </div>
    </div>
  );
}

// ------------------ Page ------------------

export default function BacklogPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <p className="text-sm text-gray-500">Projects / Beyond Gravity</p>
          <h1 className="text-2xl font-semibold text-gray-900">Backlog</h1>
        </div>

        {/* Filters */}
        <div className="mb-6 flex items-center justify-between">
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search backlog"
              className="w-full rounded-md border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex gap-3">
            <button className="rounded-md border border-gray-300 px-3 py-1 text-sm">
              Epic
            </button>
            <button className="rounded-md border border-gray-300 px-3 py-1 text-sm">
              Label
            </button>
            <button className="rounded-md border border-gray-300 px-3 py-1 text-sm">
              Type
            </button>
          </div>
        </div>

        {/* Sprints */}
        {sprints.map((sprint) => (
          <SprintSection key={sprint.name} sprint={sprint} />
        ))}
      </div>
    </main>
  );
}
