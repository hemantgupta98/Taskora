"use client";
import { useState } from "react";
import { api } from "../../lib/socket";
import { Toaster, toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Task = {
  _id: string;
  title: string;
  description: string;
  type: string;
  priority: string;
  dueDate: number;
  startDate: number;
  estimate: PlanStatus;
  assignee?: string;
  status: PlanStatus;
};

type PlanStatus = "todo" | "progress" | "done";

export default function TaskCard({
  task,
  onDelete,
}: {
  task: Task;
  onDelete?: () => void;
}) {
  const [, setPlans] = useState<Task[]>([]);

  const updateStatus = async (plan: Task, value: PlanStatus) => {
    const today = new Date();
    const due = new Date(plan.dueDate);

    const diffDays = Math.floor(
      (today.getTime() - due.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (value === "done" && diffDays > 1) {
      toast("This plan is overdue. Is your work completed?", {
        action: {
          label: "Yes, Done",
          onClick: async () => {
            try {
              await api.patch(`/backlog/update-status/${plan._id}`, {
                status: "done",
                confirmDone: true,
              });

              setPlans((prev) =>
                prev.map((p) =>
                  p._id === plan._id ? { ...p, status: "done" } : p,
                ),
              );

              toast.success("Plan marked as done");
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
      await api.patch(`/backlog/update-status/${plan._id}`, {
        status: value,
      });

      setPlans((prev) =>
        prev.map((p) => (p._id === plan._id ? { ...p, status: value } : p)),
      );

      toast.success("Status updated");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Update failed");
    }
  };
  return (
    <div className="bg-white  p-4 rounded-2xl border shadow-2xl ">
      <div className="flex justify-between items-start">
        <Toaster position="top-center" richColors />
        <p>
          Feature :{" "}
          <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700">
            {task.type}
          </span>
        </p>
        <span className="text-slate-400">
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="text-red-500 text-xs hover:underline"
            >
              Delete
            </button>
          )}
        </span>
      </div>
      <span className=" mt-2 mb-2">
        {task.assignee && <span>👤 {task.assignee}</span>}
      </span>

      <h3 className="mt-2  text-sm text-slate-500">
        {" "}
        Title:{" "}
        <span className="font-semibold text-slate-900 ">
          {" "}
          {task.title}
        </span>{" "}
      </h3>
      {task.description && (
        <p className="mt-1 text-sm text-slate-600">
          Descripition: {task.description}
        </p>
      )}
      {task.startDate && (
        <p className="mt-1 text-sm text-slate-600">Start:{task.startDate}</p>
      )}
      {task.dueDate && (
        <p className="mt-1 text-sm text-slate-600">Complete:{task.dueDate}</p>
      )}

      <div className="flex flex-wrap gap-3 mt-3 text-sm text-slate-500">
        {task.estimate && (
          <span>
            Progress:{" "}
            <Select
              value={task.estimate}
              onValueChange={(value) => updateStatus(task, value as PlanStatus)}
            >
              <SelectTrigger className="w-40 mt-5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="progress">Progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
          </span>
        )}

        {task.priority && <span>Priority: {task.priority}</span>}
      </div>
    </div>
  );
}
