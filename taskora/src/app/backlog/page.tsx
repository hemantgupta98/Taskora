"use client";

import { useState, useEffect } from "react";
import TaskCard from "../../components/layout/taskcard";
import AddTaskSheet from "../../components/layout/tasksheet";
import { api } from "../../lib/socket";
import Input from "@/src/components/ui/input";

type TaskItem = {
  _id: string;
  title: string;
  description: string;
  feature: string;
  priority: string;
  dueDate: number;
  startDate: number;
  admin: string;
  delete?: boolean;
};

type Section = {
  admin: string;
  tasks: TaskItem[];
};

const mapTaskItemToTask = (item: TaskItem) => ({
  _id: item._id,
  title: item.title,
  description: item.description,
  type: item.feature,
  priority: item.priority,
  assignee: item.admin,
  dueDate: item.dueDate,
  startDate: item.startDate,
  estimate: "todo" as const,
});

function groupByAdmin(list: TaskItem[]): Section[] {
  const map = new Map<string, TaskItem[]>();
  for (const t of list) {
    const key = t.admin || "Unassigned";
    const arr = map.get(key) || [];
    arr.push(t);
    map.set(key, arr);
  }
  return Array.from(map.entries()).map(([admin, tasks]) => ({ admin, tasks }));
}
export default function BacklogMobile() {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [, setSectionsData] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const filteredTasks = tasks.filter((task) => {
    const query = search.toLowerCase();

    return (
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query) ||
      task.feature.toLowerCase().includes(query) ||
      task.priority.toLowerCase().includes(query) ||
      task.admin.toLowerCase().includes(query)
    );
  });

  const handleDeleteTask = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this?");
    if (!confirmed) return;

    try {
      await api.delete(`/backlog/deletebacklog/${id}`);
      const updated = tasks.filter((t) => t._id !== id);
      setTasks(updated);
      setSectionsData(groupByAdmin(updated));
    } catch (err) {
      console.error("Failed to delete backlog", err);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/backlog");
        const list: TaskItem[] = res.data.data;
        setTasks(list);
        setSectionsData(groupByAdmin(list));
      } catch (err) {
        console.error("Failed to fetch backlog", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <p>Loading...</p>;

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

      <div className="p-4 space-y-3">
        <Input
          placeholder="Search backlog…"
          className="w-full h-10 rounded-lg border px-3 text-sm"
          label=""
          value={search}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(e: any) => setSearch(e.target.value)}
        />
      </div>

      <div className="px-4 space-y-4">
        {filteredTasks.length === 0 ? (
          <p className="text-gray-500 text-center">No Backlog found</p>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={mapTaskItemToTask(task)}
              onDelete={() => handleDeleteTask(task._id)}
            />
          ))
        )}
      </div>

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
