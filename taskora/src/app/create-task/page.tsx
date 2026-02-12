"use client";

import { useState } from "react";
import { Toaster, toast } from "sonner";
import Input from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Calendar } from "../../components/ui/calendar";
import { ScrollArea } from "../../components/ui/scroll-area";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
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
import { Button } from "../../components/ui/button";

import {
  ChevronsDownIcon,
  ChevronDownIcon,
  Upload,
  ChevronsUpIcon,
  ChevronUpIcon,
  X,
} from "lucide-react";
import { format } from "date-fns";
import { Url } from "next/dist/shared/lib/router/router";

type Status = "todo" | "progress" | "done";

type Data = {
  admin: string;
  title: string;
  descripition: string;
  priority: string;
  startDate: number;
  assign: string;
  category: string;
  status: string;
  dueDate: number;
  restrict: string;
  attachment: Url | ImageBitmap | File;
};

const statusCode: { value: Status; label: string }[] = [
  { value: "todo", label: "TO DO" },
  { value: "progress", label: "PROGRESS" },
  { value: "done", label: "DONE" },
];

export default function CreateTaskPage() {
  const [startDate, setStartDate] = useState<Date>();
  const [dueDate, setDueDate] = useState<Date>();
  const [open, setOpen] = useState(true);
  const { register, handleSubmit, reset, control, setValue } = useForm<Data>({
    defaultValues: {
      priority: "high",
      assign: "michael",
      category: "design",
      status: "todo",
      restrict: "design",
    },
  });
  const [status, setStatus] = useState<Status>("todo");

  const statusStyles: Record<Status, string> = {
    todo: "bg-red-100 text-red-700 border-red-200",
    progress: "bg-blue-100 text-blue-700 border-blue-200",
    done: "bg-green-100 text-green-700 border-green-200",
  };
  if (!open) return null;

  const onSubmit: SubmitHandler<Data> = async (data) => {
    if (!data.startDate || !data.dueDate) {
      toast.error("Start date and Due date are required");
      return;
    }

    const attachmentName =
      typeof data.attachment === "object" &&
      data.attachment &&
      "name" in data.attachment
        ? (data.attachment as File).name
        : "";

    const payload = {
      admin: data.admin,
      title: data.title,
      descripition: data.descripition,
      priority: data.priority,
      startDate: data.startDate,
      assign: data.assign,
      category: data.category,
      status: data.status,
      dueDate: data.dueDate,
      restrict: data.restrict,
      attachment: attachmentName,
    };

    try {
      const url = "http://localhost:5000/api/task/createtask";
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
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
        toast.error(result.message || "Failed to create task");
        return reset();
      }

      reset();
      toast.success("Successfully created task");
    } catch (error) {
      console.log("Error in sending", error);
      toast.error("Can't create task");
    }
  };
  return (
    <>
      <ScrollArea className=" h-180 m-30 border-2 rounded-md ">
        <Toaster richColors position="top-center" />
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="ml-auto  max-w-2xl rounded-xl bg-white p-8 shadow-sm">
            <div className=" flex justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">
                Create New Task
              </h1>
              <span>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-500 mt-2"
                >
                  <X size={28} />
                </button>
              </span>
            </div>

            <p className="mt-1 text-sm text-gray-500">
              Add details for your new task
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className=" mt-5">
                <Input
                  label={"Admin"}
                  placeholder="user"
                  {...register("admin", { required: true })}
                />
              </div>

              <div className="mt-8 space-y-6">
                <div className=" ">
                  <Input
                    label="Task Title"
                    placeholder="Design Landing Page"
                    {...register("title", { required: true })}
                  />
                </div>

                <div className="space-y-1 text-sm font-semibold text-gray-800">
                  <label htmlFor="">Description</label>
                  <Textarea
                    id="description"
                    placeholder="Create a modern landing page design with responsive layout."
                    {...register("descripition", { required: true })}
                  />
                </div>

                <div className=" gap-6  ">
                  <div className="space-y-1">
                    <label className="text-md font-medium text-gray-700">
                      Priority
                    </label>
                    <Controller
                      name="priority"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full md:w-[320px]">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">
                              <div className="flex items-center gap-2">
                                <ChevronsUpIcon
                                  size={14}
                                  className=" text-red-700"
                                />
                                <span>High</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="medium">
                              <div className="flex items-center gap-2">
                                <ChevronUpIcon
                                  size={14}
                                  className=" text-red-500"
                                />
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
                  </div>
                </div>
                <div className=" grid space-y-1">
                  <label className="text-md font-medium text-gray-700">
                    Start date
                  </label>
                  <Popover>
                    <PopoverTrigger asChild className="w-full md:w-[320px]">
                      <Button
                        variant="outline"
                        data-empty={!startDate}
                        className="data-[empty=true]:text-muted-foreground w-53 justify-between text-left font-normal"
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
                </div>

                <div className="grid grid-cols-1 gap-6 ">
                  <div className="space-y-1">
                    <label className="text-md font-medium text-gray-700">
                      Assign To
                    </label>
                    <Controller
                      name="assign"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full md:w-[320px]">
                            <SelectValue placeholder="Select assignee" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="michael">
                              Michael Scott
                            </SelectItem>
                            <SelectItem value="pam">Pam Beesly</SelectItem>
                            <SelectItem value="jim">Jim Halpert</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-md font-medium text-gray-700">
                      Category
                    </label>
                    <Controller
                      name="category"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full md:w-[320px]">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="design">Design</SelectItem>
                            <SelectItem value="dev">Development</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-md font-medium text-gray-700">
                    Status
                  </label>
                  <Select
                    value={status}
                    onValueChange={(v) => {
                      setStatus(v as Status);
                      setValue("status", v);
                    }}
                  >
                    <SelectTrigger
                      className={`w-full md:w-[320px] ${statusStyles[status]}`}
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
                </div>
                <div className=" grid space-y-1">
                  <label className="text-md font-medium text-gray-700">
                    Due date
                  </label>
                  <Popover>
                    <PopoverTrigger asChild className="w-full md:w-[320px]">
                      <Button
                        variant="outline"
                        data-empty={!dueDate}
                        className="data-[empty=true]:text-muted-foreground w-53 justify-between text-left font-normal"
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
                </div>

                <div className="space-y-5">
                  <label className="text-md font-medium text-gray-700">
                    Restrict to
                  </label>
                  <Controller
                    name="restrict"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full md:w-[320px]">
                          <SelectValue placeholder="Select Roles" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="design">Administrator</SelectItem>
                          <SelectItem value="dev">Member</SelectItem>
                          <SelectItem value="marketing">View</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              {/* Attachments & Tags */}

              <div className=" mt-5">
                <h3 className="mb-2 text-sm font-medium text-gray-700">
                  Attachments
                </h3>
                <label className="h-50 w-50 border-2 border-dashed border-blue-400 rounded-md flex flex-col items-center justify-between cursor-pointer p-1 hover:bg-blue-50">
                  <Upload size={18} className="text-blue-600 mb-1 mt-18" />

                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    label=""
                    {...register("attachment", { required: false })}
                  />
                </label>
              </div>

              <div className=" mt-5 ">
                <h3 className="mb-2 text-sm font-medium text-gray-700">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <Tag color="blue">UI/UX</Tag>
                  <Tag color="pink">Landing Page</Tag>
                  <Tag color="yellow">Urgent</Tag>
                  <button className="text-sm font-medium text-blue-600 hover:underline">
                    + Add Tag
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-6">
                <Button variant="ghost" onClick={() => reset()}>
                  Cancel
                </Button>
                <Button type="submit">Create Task</Button>
              </div>
            </form>
          </div>
        </div>
      </ScrollArea>
    </>
  );
}

function Tag({
  children,
  color,
}: {
  children: React.ReactNode;
  color: "blue" | "pink" | "yellow";
}) {
  const colors = {
    blue: "bg-blue-100 text-blue-700",
    pink: "bg-pink-100 text-pink-700",
    yellow: "bg-yellow-100 text-yellow-700",
  };

  return (
    <span
      className={`rounded-md px-3 py-1 text-xs font-medium ${colors[color]}`}
    >
      {children}
    </span>
  );
}
