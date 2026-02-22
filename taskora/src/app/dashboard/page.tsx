"use client";

import { useEffect, useState } from "react";
import StatCard from "../../components/layout/Startcard";
import { api } from "../../lib/api";

type TaskItem = {
  _id: string;
  admin: string;
  title: string;
  descripition: string;
  priority: string;
  startDate: number;
  assign: string;
  category: string;
  status: string;
  dueDate: number;
  progress?: number; // ✅ ADDED
  restrict?: string;
  attachment?: string;
};

/* ================= HELPERS (UNCHANGED) ================= */
function getBorderColorForTask(priority?: string) {
  if (!priority) return "border-gray-300";
  if (priority === "high") return "border-red-500";
  if (priority === "medium") return "border-yellow-500";
  return "border-blue-500";
}

/* ================= NEW: AUTO PROGRESS FROM STATUS ================= */
function getProgressFromStatus(status?: string) {
  if (status === "completed") return 100;
  if (status === "in-progress") return 50;
  if (status === "pending") return 0;
  return 0;
}

type CircleProgressProps = {
  value: number;
  label: string;
};

function CircleProgress({ value, label }: CircleProgressProps) {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="90" height="90">
        <circle
          cx="45"
          cy="45"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="8"
          fill="none"
        />
        <circle
          cx="45"
          cy="45"
          r={radius}
          stroke="#22c55e"
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 45 45)"
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="text-sm font-semibold fill-gray-700"
        >
          {value}%
        </text>
      </svg>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
}

/* ================= DASHBOARD PAGE ================= */
export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  /* ================= API CALL (UNCHANGED) ================= */
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/task");
        const list: TaskItem[] = res.data.data;
        setTasks(list);
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <p>Loading...</p>;

  /* ================= ANALYTICS CALCULATIONS ================= */
  const totalTasks = tasks.length;
  const highPriority = tasks.filter((t) => t.priority === "high").length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const completionPercent = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-slate-100 p-3 sm:p-4 lg:p-6 space-y-6">
      <h1 className="text-xl font-semibold">Project Management Dashboard</h1>

      {/* ================= TOP KPI CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Tasks"
          actual={totalTasks.toString()}
          planned="-"
          percent={0}
          color="blue"
        />
        <StatCard
          title="High Priority"
          actual={highPriority.toString()}
          planned="-"
          percent={0}
          color="purple"
        />
        <StatCard
          title="Completed"
          actual={completedTasks.toString()}
          planned="-"
          percent={0}
          color="green"
        />
        <StatCard
          title="Completion"
          actual={`${completionPercent}%`}
          planned="100%"
          percent={completionPercent}
          color="green"
        />
      </div>

      {/* ================= ANALYTICS CIRCLE UI ================= */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h2 className="text-lg font-semibold mb-4">Analytics Overview</h2>

        <div className="flex flex-wrap justify-around gap-6">
          <CircleProgress value={completionPercent} label="Overall Progress" />
          <CircleProgress
            value={
              totalTasks ? Math.round((highPriority / totalTasks) * 100) : 0
            }
            label="High Priority"
          />
          <CircleProgress
            value={
              totalTasks
                ? Math.round(((totalTasks - completedTasks) / totalTasks) * 100)
                : 0
            }
            label="Pending Tasks"
          />
        </div>
      </div>

      {/* ================= TASK GRID (PROGRESS CONNECTED ✅) ================= */}
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {tasks.map((task) => {
            const progress =
              task.progress ?? getProgressFromStatus(task.status);

            return (
              <div
                key={task._id}
                className={`border p-3 rounded ${getBorderColorForTask(task.priority)}`}
              >
                <StatCard
                  title={task.title}
                  actual={`${progress}%`}
                  planned="100%"
                  percent={progress}
                  color={
                    progress === 100
                      ? "green"
                      : task.priority === "high"
                        ? "purple"
                        : "blue"
                  }
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
