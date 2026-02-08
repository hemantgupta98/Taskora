"use client";

import { useState, useEffect } from "react";
import TaskDrawer from "../../components/Task/TaskDrawer";
import { api } from "../../lib/socket";
import { Flag } from "lucide-react";
import { formatMMDDYYYY } from "../../lib/date";

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
  delete?: boolean;
};

type Section = {
  admin: string;
  tasks: TaskItem[];
};

type Status = "todo" | "progress" | "done";

// Maps task priority to a Tailwind border color class
function getBorderColorForTask(priority?: string) {
  if (!priority) return "border-gray-300";
  if (priority === "high") return "border-red-500";
  if (priority === "medium") return "border-yellow-500";

  return "border-blue-500";
}
const statusCode: { value: "todo" | "progress" | "done"; label: string }[] = [
  { value: "todo", label: "TO DO" },
  { value: "progress", label: "PROGRESS" },
  { value: "done", label: "DONE" },
];

const statusStyles: Record<Status, string> = {
  todo: "bg-red-100 text-red-700 border-red-200",
  progress: "bg-blue-100 text-blue-700 border-blue-200",
  done: "bg-green-100 text-green-700 border-green-200",
};

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
export default function ProjectPage() {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [sectionsData, setSectionsData] = useState<Section[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const handleDeleteTask = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this?");
    if (!confirmed) return;

    try {
      await api.delete(`/task/${id}`);
      const updated = tasks.filter((t) => t._id !== id);
      setTasks(updated);
      setSectionsData(groupByAdmin(updated));
    } catch (err) {
      console.error("Failed to delete task", err);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/task");
        const list: TaskItem[] = res.data.data;
        setTasks(list);
        setSectionsData(groupByAdmin(list));
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
      <div className="min-h-screen bg-gray-100 flex">
        <main className="flex-1 p-6">
          {tasks.length === 0 ? (
            <p>No tasks available.</p>
          ) : (
            <div className="space-y-10">
              {sectionsData.map((section) => (
                <div key={section.admin}>
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">
                    {section.admin}
                  </h3>

                  <div className="grid grid-cols-8 text-xs bg-gray-50 border rounded-t-md px-3 py-2">
                    <span>Task Title</span>
                    <span>Assignee</span>
                    <span>Status</span>
                    <span>Category</span>
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
                        key={task._id}
                        className={`grid grid-cols-8 items-center px-3 py-3 text-sm border-l-4 ${getBorderColorForTask(task.priority)}`}
                        onClick={() => {
                          setSelectedTask({
                            id: task._id,
                            title: task.title,
                            description: task.descripition,
                            status: task.status,
                          });
                          setOpen(true);
                        }}
                      >
                        {/* Task Title */}
                        <span className="font-medium text-gray-700">
                          {task.title}
                        </span>

                        {/* Assignee */}
                        <span className="text-xs">{task.assign}</span>

                        {/* Status */}
                        <span>
                          {(() => {
                            const statusClass =
                              statusStyles[task.status as Status] ||
                              "bg-gray-100 text-gray-700";
                            return (
                              <span
                                className={`${statusClass} px-2 py-0.5 text-xs font-semibold rounded-md`}
                              >
                                {task.status}
                              </span>
                            );
                          })()}
                        </span>

                        {/* Category */}
                        <span className="text-xs">{task.category}</span>

                        {/* Priority */}
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

                        {/* Start Date */}
                        <span className="text-xs text-green-600">
                          {formatMMDDYYYY(task.startDate)}
                        </span>

                        {/* Due Date */}
                        <span className="text-xs text-red-500">
                          {formatMMDDYYYY(task.dueDate)}
                        </span>

                        {/* Delete */}
                        <span>
                          <button
                            type="button"
                            className="text-red-500 hover:underline text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteTask(task._id);
                            }}
                          >
                            Delete
                          </button>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <TaskDrawer
        open={open}
        onClose={() => setOpen(false)}
        task={selectedTask}
      />
    </>
  );
}
