"use client";

import { useEffect, useState } from "react";
import { api } from "../../lib/socket";

type Task = {
  _id: string;
  admin: string;
  title: string;
  descripition: string;
  priority: string;
  status: string;
  category: string;
  assign: string;
  dueDate: number;
};

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/task");
        setTasks(res.data.data);
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
    <div className="space-y-4 p-4">
      {tasks.map((task) => (
        <div key={task._id} className="border rounded p-4 shadow-sm">
          <h2 className="text-lg font-semibold">{task.title}</h2>
          <p className="text-gray-600">{task.descripition}</p>

          <div className="flex gap-4 text-sm mt-2">
            <span>📌 {task.priority}</span>
            <span>✅ {task.status}</span>
            <span>👤 {task.assign}</span>
          </div>

          <p className="text-xs text-gray-400 mt-1">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
