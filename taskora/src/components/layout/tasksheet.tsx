"use  client";
import { SubmitHandler, Controller, useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { forwardRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import {
  ChevronDownIcon,
  ChevronsDownIcon,
  ChevronsUpIcon,
  ChevronUpIcon,
} from "lucide-react";

type Data = {
  admin: string;
  title: string;
  description: string;
  feature: string;
  priority: string;
  status: string;
};

type Status = "todo" | "progress" | "done";

const statusCode: { value: Status; label: string }[] = [
  { value: "todo", label: "TO DO" },
  { value: "progress", label: "PROGRESS" },
  { value: "done", label: "DONE" },
];

export default function AddTaskSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<Status>("todo");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<Data>({
    defaultValues: {
      feature: "select",
      priority: "select",
      status: "todo",
    },
  });

  const statusStyles: Record<Status, string> = {
    todo: "bg-red-100 text-red-700 border-red-200",
    progress: "bg-blue-100 text-blue-700 border-blue-200",
    done: "bg-green-100 text-green-700 border-green-200",
  };
  if (!open) return null;

  const onSubmit: SubmitHandler<Data> = async (data) => {
    console.log(data);
    try {
      const url = "http://localhost:5000/api/backlog/createbacklog";
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      let result;
      const contentType = res.headers.get("content-type");

      if (contentType?.includes("application/json")) {
        result = await res.json();
      } else {
        const text = await res.text();
        throw new Error(text || "Invalid server response");
      }

      if (!res.ok) {
        toast.error(result.message || "Backlog failed");
        return reset();
      }

      toast.success("Backlog created");

      reset();
    } catch (error) {
      console.error("AUTH ERROR 👉", error);
      toast.error("Server error. Please try again.");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-end">
      <Toaster position="top-center" richColors />
      <div className="bg-white w-full rounded-t-3xl p-6 space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className=" space-y-5">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold">Add Task</h2>
            <button onClick={onClose}>✕</button>
          </div>

          <label className="mb-2 block text-sm font-medium text-gray-800">
            Admin <span className="text-red-500">*</span>
          </label>
          <Input
            placeholder="Task title"
            className="w-full h-10 border rounded-lg px-3"
            {...register("admin", { required: "Admin name is required" })}
          />

          {errors.admin && (
            <p className="mt-2 ml-2 text-sm text-red-500">
              {errors.admin.message}
            </p>
          )}
          <label className="mb-2 block text-sm font-medium text-gray-800">
            Ttile <span className="text-red-500">*</span>
          </label>
          <Input
            placeholder="Task title"
            className="w-full h-10 border rounded-lg px-3"
            {...register("title", { required: "Title is required" })}
          />

          {errors.title && (
            <p className="mt-2 ml-2 text-sm text-red-500">
              {errors.title.message}
            </p>
          )}
          <label className="mb-2 block text-sm font-medium text-gray-800">
            Descripition <span className="text-red-500">*</span>
          </label>
          <Input
            placeholder="Description"
            className="w-full border rounded-lg px-3 py-2 mt-5"
            {...register("description", {
              required: "Descripiton is required",
            })}
          />
          {errors.description && (
            <p className="mt-2 ml-2 text-sm text-red-500">
              {errors.description.message}
            </p>
          )}

          <div className="relative space-y-5">
            <label className="mb-2 block text-sm font-medium text-gray-800">
              Feature&apos;s <span className="text-red-500">*</span>
            </label>
            <Controller
              name="feature"
              control={control}
              rules={{
                validate: (value) =>
                  value !== "select" || "Please choose feature type",
              }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full h-10 border rounded-lg px-3">
                    <SelectValue placeholder="Select feature" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="select" disabled>
                      Select
                    </SelectItem>
                    <SelectItem value="bug">Bug</SelectItem>
                    <SelectItem value="imporovement">Imporvement</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            {errors.feature && (
              <p className="mt-2 ml-2 text-sm text-red-500">
                {errors.feature.message}
              </p>
            )}
          </div>

          <div className=" gap-6  ">
            <div className="space-y-1">
              <label className="mb-2 block text-sm font-medium text-gray-800">
                Priority&apos;s <span className="text-red-500">*</span>
              </label>
              <Controller
                name="priority"
                control={control}
                rules={{
                  validate: (value) =>
                    value !== "select" || "Please choose priority type",
                }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full h-10 border rounded-lg px-3">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="select" disabled>
                        Select
                      </SelectItem>
                      <SelectItem value="high">
                        <div className="flex items-center gap-2">
                          <ChevronsUpIcon size={14} className=" text-red-700" />
                          <span>High</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="medium">
                        <div className="flex items-center gap-2">
                          <ChevronUpIcon size={14} className=" text-red-500" />
                          <span>Medium</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="low">
                        <div className="flex items-center gap-2">
                          <ChevronDownIcon
                            size={14}
                            className=" text-blue-500"
                          />
                          <span>Low</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="lowest">
                        <div className="flex items-center gap-2">
                          <ChevronsDownIcon
                            size={14}
                            className=" text-blue-300"
                          />
                          <span>Lowest</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.priority && (
                <p className="mt-2 ml-2 text-sm text-red-500">
                  {errors.priority.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <label className="mb-2 block text-sm font-medium text-gray-800">
              Status <span className="text-red-500">*</span>
            </label>
            <Controller
              name="status"
              control={control}
              rules={{
                required: "This field is required",
              }}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(v) => {
                    setStatus(v as Status);
                    field.onChange(v);
                  }}
                  onOpenChange={() => {
                    field.onBlur();
                  }}
                >
                  <SelectTrigger
                    className={`w-full h-10 border rounded-lg px-3 ${
                      errors.status ? "border-red-500" : ""
                    } ${statusStyles[status]}`}
                  >
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>

                  <SelectContent>
                    {statusCode.map((e) => (
                      <SelectItem
                        key={e.value}
                        value={e.value}
                        className={statusStyles[e.value]}
                      >
                        {e.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            {errors.status && (
              <p className="mt-2 ml-2 text-sm text-red-500">
                {errors.status.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full h-11 bg-blue-600 text-white rounded-xl"
          >
            Save to Backlog
          </button>
        </form>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Input = forwardRef<HTMLInputElement, any>(({ icon, ...props }, ref) => (
  <div className="flex items-center gap-3 border rounded-lg px-4 py-3">
    <span className="text-gray-400">{icon}</span>
    <input ref={ref} {...props} className="w-full outline-none text-sm" />
  </div>
));

Input.displayName = "Input";
