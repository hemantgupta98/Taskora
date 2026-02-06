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
};

type Section = {
  admin: string;
  tasks: TaskItem[];
};

// Maps task priority to a Tailwind border color class
function getBorderColorForTask(priority?: string) {
  if (!priority) return "border-gray-300";
  if (priority === "high") return "border-red-500";
  if (priority === "medium") return "border-yellow-500";
  // default/low
  return "border-blue-500";
}

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
          <div className="space-y-10">
            {sectionsData.map((section) => (
              <div key={section.admin}>
                <h3 className="text-sm font-semibold text-gray-600 mb-2">
                  {section.admin}
                </h3>

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
                      <span className="font-medium text-gray-700">
                        {task.title}
                      </span>

                      <div className="h-7 text-xs flex items-center justify-center">
                        {task.assign}
                      </div>

                      <span />

                      <span>{/* No labels in schema; left blank */}</span>

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
                        {formatMMDDYYYY(task.startDate)}
                      </span>
                      <span className="text-xs text-red-500">
                        {formatMMDDYYYY(task.dueDate)}
                      </span>
                      <span />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
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
