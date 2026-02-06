"use client";

import { useEffect, useState } from "react";
import TaskDrawer from "../../components/Task/TaskDrawer";
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

export default function ProjectPage() {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedTask, setSelectedTask] = useState<any>(null);

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
    <>
      <h1 className="text-2xl font-bold mb-4">Project Board</h1>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <div
            key={task.title}
            onClick={() => {
              setSelectedTask(task);
              setOpen(true);
            }}
            className="cursor-pointer bg-white p-4 rounded shadow hover:bg-gray-50"
          >
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-500">{task.status}</p>
          </div>
        ))}
      </div>

      <TaskDrawer
        open={open}
        onClose={() => setOpen(false)}
        task={selectedTask}
      />
    </>
  );
}
