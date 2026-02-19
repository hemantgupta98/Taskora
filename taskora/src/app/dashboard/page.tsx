"use client";

import { useEffect, useState } from "react";
import StatCard from "../../components/layout/Startcard";
import { api } from "../../lib/socket";

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
  restrict?: string;
  attachment?: string;
};

function getBorderColorForTask(priority?: string) {
  if (!priority) return "border-gray-300";
  if (priority === "high") return "border-red-500";
  if (priority === "medium") return "border-yellow-500";
  return "border-blue-500";
}
export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<TaskItem[]>([]);

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

  return (
    <div className="min-h-screen bg-slate-100 p-3 sm:p-4 lg:p-6">
      <h1 className="text-xl font-semibold mb-6">
        Project Management Dashboard
      </h1>

      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className={`border p-3 rounded ${getBorderColorForTask(
                task.priority,
              )}`}
            >
              <StatCard
                title={task.title}
                actual="0"
                planned="85"
                percent={0}
                color="green"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
