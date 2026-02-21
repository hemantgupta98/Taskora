"use client";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { Toaster, toast } from "sonner";
import Input from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

type Data = {
  _id: string;
  admin: string;
  title: string;
  descripition: string;
  priority: string;
  startDate: number;
  assign: string;
  category: string;
  status: PlanStatus;
  dueDate: number;
  restrict: string;
};

type Section = {
  admin: string;
  tasks: Data[];
};

type PlanStatus = "todo" | "progress" | "done";

function groupByAdmin(list: Data[]): Section[] {
  const map = new Map<string, Data[]>();

  for (const t of list) {
    const key = t.admin || "Unassigned";
    const arr = map.get(key) || [];
    arr.push(t);
    map.set(key, arr);
  }

  return Array.from(map.entries()).map(([admin, tasks]) => ({
    admin,
    tasks,
  }));
}

export default function Pending() {
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState<Data[]>([]);
  const [search, setSearch] = useState("");

  const filteredTasks = plans.filter((task) => {
    const query = search.toLowerCase();

    return (
      task._id.toLowerCase().includes(query) ||
      task.assign.toLowerCase().includes(query) ||
      task.status.toLowerCase().includes(query) ||
      task.title.toLowerCase().includes(query) ||
      task.descripition.toLowerCase().includes(query) ||
      task.priority.toLowerCase().includes(query) ||
      task.category.toLowerCase().includes(query) ||
      task.admin.toLowerCase().includes(query)
    );
  });

  const sections = groupByAdmin(filteredTasks);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await api.get("/task");
        const list: Data[] = res.data.data;
        setPlans(list);
      } catch (err) {
        console.error("Failed to fetch plans", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const updateStatus = async (task: Data, value: PlanStatus) => {
    const today = new Date();
    const due = new Date(task.dueDate);

    const isOverdue = today.getTime() > due.getTime();

    if (value === "done" && isOverdue) {
      toast("This plan is overdue. Is your work completed?", {
        action: {
          label: "Yes, Done",
          onClick: async () => {
            try {
              await api.patch(`/task/update-status/${task._id}`, {
                status: "done",
                confirmDone: true,
              });

              setPlans((prev) => {
                return prev.map((p) =>
                  p._id === task._id
                    ? { ...p, status: "done" as PlanStatus }
                    : p,
                );
              });

              toast.success("Pending marked as done");
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
              toast.error(
                err?.response?.data?.message || "Failed to update status",
              );
            }
          },
        },
      });
      return;
    }

    try {
      await api.patch(`/task/update-status/${task._id}`, {
        status: value,
      });

      setPlans((prev) => {
        return prev.map((p) =>
          p._id === task._id ? { ...p, status: value as PlanStatus } : p,
        );
      });

      toast.success("Status updated");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Update failed");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="mx-auto mt-5 max-w-5xl rounded-xl p-4 shadow-2xl sm:p-5">
      <Toaster position="top-center" richColors />
      <div className="space-y-3 p-3 sm:p-4">
        <Input
          placeholder="Search pending…"
          className="w-full h-10 rounded-lg border px-3 text-sm"
          label=""
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
        />
      </div>
      {sections.length === 0 && (
        <p className="text-center text-gray-500">No tasks found</p>
      )}

      {sections.map((section) => (
        <div key={section.admin} className="mb-8">
          {/* Admin Header */}
          <h2 className="text-xl font-bold mb-4 text-blue-600">
            Admin: {section.admin}
          </h2>

          {/* Tasks */}
          <div className="space-y-4">
            {section.tasks.map((task) => (
              <div
                key={task._id}
                className="relative p-4 border rounded-lg bg-gray-50 hover:shadow"
              >
                <h3 className="font-semibold text-lg">{task.title}</h3>

                <p className="text-sm text-gray-600">{task.descripition}</p>

                <div className="mt-3 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                  <p>
                    <b>Priority:</b> {task.priority}
                  </p>
                  <div>
                    <b>Status:</b>
                    <Select
                      value={task.status}
                      onValueChange={(value) =>
                        updateStatus(task, value as PlanStatus)
                      }
                    >
                      <SelectTrigger className="mt-1 w-full sm:w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todo">To Do</SelectItem>
                        <SelectItem value="progress">Progress</SelectItem>
                        <SelectItem value="done">Done</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <p>
                    <b>Category:</b> {task.category}
                  </p>
                  <p>
                    <b>Assigned:</b> {task.assign}
                  </p>
                  <p>
                    <b>Start:</b> {new Date(task.startDate).toDateString()}
                  </p>
                  <p>
                    <b>Due:</b> {new Date(task.dueDate).toDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
