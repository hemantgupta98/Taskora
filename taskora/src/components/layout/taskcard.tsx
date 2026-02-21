"use client";

import { api } from "../../lib/api";
import { Toaster, toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export type PlanStatus = "todo" | "progress" | "done";

export type Task = {
  _id: string;
  title: string;
  description?: string;
  type: string;
  priority: string;
  dueDate: number;
  startDate: number;
  assignee?: string;
  status: PlanStatus;
};

type Props = {
  task: Task;
  onDelete?: () => void;
  onStatusChange: (id: string, status: PlanStatus) => void;
};

export default function TaskCard({ task, onDelete, onStatusChange }: Props) {
  const updateStatus = async (plan: Task, value: PlanStatus) => {
    try {
      const response = await api.patch(`/backlog/update-status/${plan._id}`, {
        status: value,
      });

      if (response?.data?.confirmRequired) {
        toast(
          response?.data?.message ||
            "This plan is overdue. If your work is completed, please confirm.",
          {
            action: {
              label: "Yes, Done",
              onClick: async () => {
                try {
                  await api.patch(`/backlog/update-status/${plan._id}`, {
                    status: "done",
                    confirmDone: true,
                  });

                  onStatusChange(plan._id, "done");
                  toast.success("Plan marked as done");
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (err: any) {
                  toast.error(
                    err?.response?.data?.message || "Failed to update status",
                  );
                }
              },
            },
          },
        );
        return;
      }

      onStatusChange(plan._id, value);
      toast.success("Status updated");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="bg-white p-4 rounded-2xl border shadow-md">
      <Toaster position="top-center" richColors />

      {/* Header */}
      <div className="flex justify-between items-start">
        <p>
          Feature:{" "}
          <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700">
            {task.type}
          </span>
        </p>

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
      </div>

      {/* Assignee */}
      {task.assignee && (
        <p className="mt-2 text-sm text-slate-600">👤 {task.assignee}</p>
      )}

      {/* Title */}
      <h3 className="mt-2 text-sm text-slate-500">
        Title:{" "}
        <span className="font-semibold text-slate-900">{task.title}</span>
      </h3>

      {/* Description */}
      {task.description && (
        <p className="mt-1 text-sm text-slate-600">
          Description: {task.description}
        </p>
      )}

      {/* Dates */}
      {task.startDate && (
        <p className="mt-1 text-sm text-slate-600">
          Start: {new Date(task.startDate).toDateString()}
        </p>
      )}

      {task.dueDate && (
        <p className="mt-1 text-sm text-slate-600">
          Complete: {new Date(task.dueDate).toDateString()}
        </p>
      )}

      {/* Status & Priority */}
      <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-500 items-center">
        <span>
          Status:
          <Select
            value={task.status}
            onValueChange={(value) => updateStatus(task, value as PlanStatus)}
          >
            <SelectTrigger className="ml-2 w-full sm:w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="progress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>
        </span>

        <span>Priority: {task.priority}</span>
      </div>
    </div>
  );
}
