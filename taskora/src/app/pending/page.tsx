"use client";
import { useEffect, useState } from "react";
import { api } from "../../lib/socket";
import { Toaster, toast } from "sonner";
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
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState<Data[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await api.get("/task");
        const list: Data[] = res.data.data;
        setPlans(list);
        setSections(groupByAdmin(list));
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
                const updated = prev.map((p) =>
                  p._id === task._id
                    ? { ...p, status: "done" as PlanStatus }
                    : p,
                );
                setSections(groupByAdmin(updated));
                return updated;
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
        const updated = prev.map((p) =>
          p._id === task._id ? { ...p, status: value as PlanStatus } : p,
        );
        setSections(groupByAdmin(updated));
        return updated;
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
    <div className="mx-auto p-5 mt-5 max-w-5xl rounded-xl shadow-2xl">
      <Toaster position="top-center" richColors />
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

                <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                  <p>
                    <b>Priority:</b> {task.priority}
                  </p>
                  <p>
                    <b>Status:</b>
                    <Select
                      value={task.status}
                      onValueChange={(value) =>
                        updateStatus(task, value as PlanStatus)
                      }
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todo">To Do</SelectItem>
                        <SelectItem value="progress">Progress</SelectItem>
                        <SelectItem value="done">Done</SelectItem>
                      </SelectContent>
                    </Select>
                  </p>

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
