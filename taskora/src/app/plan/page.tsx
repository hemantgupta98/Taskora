/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Toaster, toast } from "sonner";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { forwardRef } from "react";
import { Calendar } from "../../components/ui/calendar";
import { Button } from "../../components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { api } from "../../lib/api";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { format } from "date-fns";

type Data = {
  admin: string;
  _id: string;
  startDate: number;
  dueDate: number;
  name: string;
  access: string;
  work: string;
  board: string;
  status: PlanStatus;
  teamMembers: string[];
};

type Section = {
  admin: string;
  tasks: Data[];
};

type PlanStatus = "todo" | "progress" | "done";

function groupByAdmin(list: Data[]) {
  const map = new Map<string, Data[]>();
  for (const t of list) {
    const key = t._id || "Unassigned";
    const arr = map.get(key) || [];
    arr.push(t);
    map.set(key, arr);
  }
  return Array.from(map.entries()).map(([admin, tasks]) => ({ admin, tasks }));
}

export default function CreatePlanPage() {
  const [startDate, setStartDate] = useState<Date>();
  const [, setSectionsData] = useState<Section[]>([]);
  const [dueDate, setDueDate] = useState<Date>();
  const [plans, setPlans] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");

  const filteredTasks = plans.filter((task) => {
    const query = search.toLowerCase();

    return (
      task._id.toLowerCase().includes(query) ||
      task.status.toLowerCase().includes(query) ||
      task.status.toLowerCase().includes(query) ||
      task.access.toLowerCase().includes(query) ||
      task.work.toLowerCase().includes(query) ||
      task.board.toLowerCase().includes(query) ||
      task.admin.toLowerCase().includes(query)
    );
  });

  const [mode, setMode] = useState<
    "createplans" | "viewplans" | "backlogplans"
  >("createplans");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    setValue,
  } = useForm<Data>({
    defaultValues: {
      access: "select",
      work: "select",
      status: "todo",
      teamMembers: [],
    },
  });

  const onSubmit: SubmitHandler<Data> = async (data) => {
    console.log(data);
    if (!data.startDate || !data.dueDate) {
      toast.error("Start date and Due date are required");
      return;
    }

    try {
      const url = "https://taskora-88w5.onrender.com/api/plans/createplans";
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
        toast.error(result.message || "Plans failed");
        return reset();
      }
      reset();
      toast.success("Plans created ");
    } catch (error) {
      reset();
      console.log("Error in Api", error);
      toast.warning("server error please try again later");
    }
  };

  const handleDeleteTask = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this?");
    if (!confirmed) return;

    try {
      await api.delete(`/plans/deleteplans/${id}`);

      const updated = plans.filter((t) => t._id !== id);
      setPlans(updated);
      setSectionsData(groupByAdmin(updated));

      toast.success("Plan deleted successfully");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete plan");
    }
  };

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await api.get(`/plans`);
        const list: Data[] = res.data.data;
        setPlans(list);
        setSectionsData(groupByAdmin(list));
      } catch (err) {
        console.error("Failed to fetch plans", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  useEffect(() => {
    try {
      if (mode === "viewplans" && !loading) {
        const shown = localStorage.getItem("viewplans_popup_shown");
        if (plans.length === 0 && !shown) {
          // notify user and refresh once
          toast("No plans found — refreshing the page once");
          localStorage.setItem("viewplans_popup_shown", "1");

          setTimeout(() => {
            window.location.reload();
          }, 1400);
        }
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, loading]);

  const updateStatus = async (plan: Data, value: PlanStatus) => {
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
              await api.patch(`/plans/update-status/${plan._id}`, {
                status: "done",
                confirmDone: true,
              });

              setPlans((prev) =>
                prev.map((p) =>
                  p._id === plan._id ? { ...p, status: "done" } : p,
                ),
              );

              toast.success("Plan marked as done");
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
      await api.patch(`/plans/update-status/${plan._id}`, {
        status: value,
      });

      setPlans((prev) =>
        prev.map((p) => (p._id === plan._id ? { ...p, status: value } : p)),
      );

      toast.success("Status updated");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Update failed");
    }
  };

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <Toaster richColors position="top-center" />
      <div className="flex w-full flex-wrap gap-3 rounded-lg border bg-white p-3 shadow-xl sm:w-fit sm:gap-6 sm:p-4">
        <button
          onClick={() => setMode("createplans")}
          className={` flex p-2 rounded-md shadow-xl ${mode === "createplans" ? " ring-1 ring-blue-400" : "border"}`}
        >
          Create Plans
        </button>
        <button
          onClick={() => setMode("viewplans")}
          className={` flex p-2 rounded-md shadow-xl ${mode === "viewplans" ? " ring-1 ring-blue-400" : "border"}`}
        >
          View Plans
        </button>
        <button
          onClick={() => setMode("backlogplans")}
          className={` flex p-2 rounded-md shadow-xl ${mode === "backlogplans" ? " ring-1 ring-blue-400" : "border"}`}
        >
          Backlog Plans
        </button>
      </div>
      <div className="space-y-3 p-3 sm:p-4">
        <Input
          placeholder="Search plans…"
          className="w-full h-10 rounded-lg border px-3 text-sm"
          label=""
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
        />
      </div>
      <div>
        {mode === "createplans" && (
          <div className="mx-auto mt-5 max-w-3xl rounded-xl p-4 shadow-2xl sm:p-5">
            {/* Header */}
            <div className="mb-8">
              <div className=" flex">
                <div className="mb-4 flex items-center gap-2">
                  <Image src="/logo.png" alt="logo" height={50} width={50} />
                  <span className="text-xl font-semibold">Taskora</span>
                </div>
              </div>

              <h1 className="mb-2 text-2xl font-semibold text-gray-900">
                Create your plan
              </h1>
              <p className="text-gray-600">
                Visualize, plan, track, and report on work across multiple
                spaces, boards or teams.
              </p>
            </div>

            <p className="mb-6 text-sm text-gray-500">
              Required fields are marked with an asterisk
              <span className="text-red-500">*</span>
            </p>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="mb-6">
                <label className="mb-1 block text-sm font-medium text-gray-800">
                  Admin Name <span className="text-red-500">*</span>
                </label>
                <Input
                  {...register("name", {
                    required: "Enter your name",
                  })}
                  placeholder="Enter a admin name"
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none"
                />

                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-800">
                  Team Members<span className="text-red-500">*</span>
                </label>
                <Controller
                  name="teamMembers"
                  control={control}
                  rules={{
                    validate: (value) =>
                      value.length > 0 || "Add at least one team member",
                  }}
                  render={({ field, fieldState }) => (
                    <div className="w-full md:w-[320px]">
                      <div
                        className={`flex flex-wrap gap-2 rounded-md border px-3 py-2 min-h-10.5
            ${fieldState.error ? "border-red-500" : "border-input"}
          `}
                      >
                        {field.value.map((member, index) => (
                          <span
                            key={index}
                            className="flex items-center gap-1 bg-muted px-2 py-1 rounded text-sm"
                          >
                            {member}
                            <button
                              type="button"
                              onClick={() =>
                                field.onChange(
                                  field.value.filter((_, i) => i !== index),
                                )
                              }
                            >
                              <X size={14} />
                            </button>
                          </span>
                        ))}

                        <Input
                          value={input}
                          onChange={(e: any) => setInput(e.target.value)}
                          onKeyDown={(e: any) => {
                            if (e.key === "Enter" && input.trim()) {
                              e.preventDefault();
                              if (!field.value.includes(input.trim())) {
                                field.onChange([...field.value, input.trim()]);
                              }
                              setInput("");
                            }
                          }}
                          placeholder="Enter team member name"
                          className="flex-1 outline-none bg-transparent text-sm min-w-30"
                        />
                      </div>

                      {fieldState.error && (
                        <p className="text-sm text-red-500 mt-1">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>

              <div className="mb-8 mt-10">
                <label className="mb-1 block text-sm font-medium text-gray-800">
                  Access <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Controller
                    name="access"
                    control={control}
                    rules={{
                      validate: (value) =>
                        value !== "select" || "Please choose access type",
                    }}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full md:w-[320px]">
                          <SelectValue placeholder="Select access" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="select" disabled>
                            Select
                          </SelectItem>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />

                  {errors.access && (
                    <p className="mt-2 ml-2 text-sm text-red-500">
                      {errors.access.message}
                    </p>
                  )}
                </div>
              </div>

              <div className=" grid space-y-1">
                <label className="text-md font-medium text-gray-700">
                  Start date <span className="text-red-500">*</span>
                </label>
                <Popover>
                  <PopoverTrigger asChild className="w-full md:w-[320px]">
                    <Button
                      variant="outline"
                      data-empty={!startDate}
                      className="data-[empty=true]:text-muted-foreground w-full md:w-[320px] justify-between text-left font-normal"
                      {...register("startDate", {
                        required: "Date should be mandatory",
                      })}
                    >
                      {startDate ? (
                        format(startDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={(d) => {
                        setStartDate(d ?? undefined);
                        if (d) setValue("startDate", d.getTime());
                      }}
                      defaultMonth={startDate}
                    />
                  </PopoverContent>
                </Popover>
                {errors.startDate && (
                  <p className="mt-2 ml-2 text-sm text-red-500">
                    {errors.startDate.message}
                  </p>
                )}
              </div>

              <div className=" grid space-y-1 mt-5 mb-5">
                <label className="text-md font-medium text-gray-700">
                  Complete date <span className="text-red-500">*</span>
                </label>
                <Popover>
                  <PopoverTrigger asChild className="w-full md:w-[320px]">
                    <Button
                      variant="outline"
                      data-empty={!dueDate}
                      className="data-[empty=true]:text-muted-foreground w-full md:w-[320px] justify-between text-left font-normal"
                      {...register("dueDate", {
                        required: "Date should be mandatory",
                      })}
                    >
                      {dueDate ? (
                        format(dueDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dueDate}
                      onSelect={(d) => {
                        setDueDate(d ?? undefined);
                        if (d) setValue("dueDate", d.getTime());
                      }}
                      defaultMonth={dueDate}
                    />
                  </PopoverContent>
                </Popover>
                {errors.dueDate && (
                  <p className="mt-2 ml-2 text-sm text-red-500">
                    {errors.dueDate.message}
                  </p>
                )}
              </div>
              {/* Add work */}
              <div className="mb-10">
                <h2 className="mb-1 text-lg font-semibold text-gray-900">
                  Add work
                </h2>
                <p className="mb-4 text-sm text-gray-600">
                  Include work items from multiple spaces, boards, or using
                  filters.
                </p>

                <label className="mb-2 block text-sm font-medium text-gray-800">
                  Work <span className="text-red-500">*</span>
                </label>

                <div className="grid  gap-3">
                  {/* Work type */}
                  <div className="relative w-full md:w-[320px]">
                    <Controller
                      name="work"
                      control={control}
                      rules={{
                        validate: (value) =>
                          value !== "select" || "Please choose work type",
                      }}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full md:w-[320px]">
                            <SelectValue placeholder="Select work" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="select" disabled>
                              select
                            </SelectItem>
                            <SelectItem value="board">Board</SelectItem>
                            <SelectItem value="project">Project</SelectItem>
                            <SelectItem value="plans">Plans</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />

                    {errors.work && (
                      <p className="mt-2 ml-2 text-sm text-red-500">
                        {errors.work.message}
                      </p>
                    )}
                  </div>

                  {/* Board name */}
                  <div className=" relative flex-row">
                    <Input
                      {...register("board", {
                        required: "Enter work type name",
                      })}
                      placeholder="Enter work type name"
                      className="w-full rounded border border-gray-300 px-3 py-2 pr-9 text-sm focus:border-blue-600 focus:outline-none"
                    />

                    {errors.board && (
                      <p className=" text-sm text-red-500 mt-2 ml-2">
                        {errors.board.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="rounded bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700 cursor-pointer"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        )}

        {mode === "viewplans" && (
          <div className="mx-auto mt-5 max-w-6xl rounded-xl p-4 shadow-2xl sm:p-5">
            <div className="grid gap-4">
              {filteredTasks.length === 0 ? (
                <p className="text-gray-500 text-center">
                  No matching plans found
                </p>
              ) : (
                filteredTasks.map((plan) => (
                  <div
                    key={plan._id}
                    className="rounded-lg border bg-white p-4 shadow-md"
                  >
                    <div className=" flex justify-end ">
                      <X
                        onClick={() => handleDeleteTask(plan._id)}
                        size={20}
                        className=" text-gray-500"
                      />
                    </div>
                    <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <h2 className="text-lg font-semibold text-gray-800">
                        {plan.name}
                      </h2>
                      <span
                        className={`px-3 py-1 mt-3 text-xs rounded-full ${
                          plan.access === "public"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {plan.access}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-3 text-sm text-gray-600 sm:grid-cols-2">
                      <p>
                        <span className="font-medium text-gray-800">Work:</span>{" "}
                        {plan.work}
                      </p>

                      <p>
                        <span className="font-medium text-gray-800">Name:</span>{" "}
                        {plan.board}
                      </p>

                      <p>
                        <span className="font-medium text-gray-800">
                          Start:
                        </span>{" "}
                        {new Date(plan.startDate).toLocaleDateString()}
                      </p>

                      <p>
                        <span className="font-medium text-gray-800">Due:</span>{" "}
                        {new Date(plan.dueDate).toLocaleDateString()}
                      </p>
                      <Select
                        value={plan.status}
                        onValueChange={(value) =>
                          updateStatus(plan, value as PlanStatus)
                        }
                      >
                        <SelectTrigger className="w-full sm:w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todo">To Do</SelectItem>
                          <SelectItem value="progress">Progress</SelectItem>
                          <SelectItem value="done">Done</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {mode === "backlogplans" && (
          <div className="mx-auto mt-5 max-w-6xl rounded-xl p-4 shadow-2xl sm:p-5">
            <div className="grid  gap-4">
              {filteredTasks.length === 0 && (
                <p className="text-gray-500 text-center">
                  {" "}
                  No matching backlog plans!
                </p>
              )}

              {filteredTasks.map((plan) => (
                <div key={plan._id} className="border rounded-lg p-4 space-y-2">
                  <h3 className="font-semibold text-red-500">{plan.name}</h3>
                  <p>{plan.work}</p>
                  <p>
                    <b>Start:</b> {new Date(plan.startDate).toDateString()}
                  </p>
                  <p>
                    <b>Due:</b> {new Date(plan.dueDate).toDateString()}
                  </p>
                  <p
                    className={`text-sm font-medium ${
                      plan.status === "done" ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {plan.status === "done"
                      ? "✅ Plan work completed"
                      : "⚠ Overdue Plan"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const Input = forwardRef<HTMLInputElement, any>(
  ({ icon, className = "", ...props }, ref) => (
    <div className="flex items-center gap-3 border rounded-lg px-4 py-2">
      {icon && <span className="text-gray-400">{icon}</span>}
      <input
        ref={ref}
        {...props}
        className={`w-full outline-none text-sm ${className}`}
      />
    </div>
  ),
);

Input.displayName = "Input";
