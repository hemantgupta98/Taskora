"use client";

import { useState } from "react";
import TaskDrawer from "../../components/Task/TaskDrawer";

const tasks = [
  {
    id: 1,
    title: "Implement Authentication",
    description: "Login, signup and protected routes",
    status: "In Progress",
  },
  {
    id: 2,
    title: "Design Dashboard UI",
    description: "Create main dashboard layout",
    status: "Todo",
  },
];

export default function ProjectPage() {
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedTask, setSelectedTask] = useState<any>(null);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Project Board</h1>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
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

      {/* Drawer */}
      <TaskDrawer
        open={open}
        onClose={() => setOpen(false)}
        task={selectedTask}
      />
    </>
  );
}
