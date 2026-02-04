"use client";

import { useState } from "react";
import Input from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Calendar } from "../../components/ui/calendar";
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
import { Checkbox } from "../../components/ui/checkbox";
import { ChevronDownIcon, Upload } from "lucide-react";
import { format } from "date-fns";

export default function CreateTaskPage() {
  const [subtasks, setSubtasks] = useState([
    "Create wireframe",
    "Design UI mockup",
    "Get feedback & revisions",
  ]);
  const [date, setDate] = useState<Date>();

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-900">
            Create New Task
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Add details for your new task
          </p>

          <div className="mt-8 space-y-6">
            <Input label="Task Title" placeholder="Design Landing Page" />

            <div className="space-y-1">
              <label
                className="text-sm font-medium text-gray-700"
                htmlFor="description"
              >
                Description
              </label>
              <Textarea
                id="description"
                placeholder="Create a modern landing page design with responsive layout."
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 ">
              <div className="space-y-1">
                <label className="text-md font-medium text-gray-700">
                  Priority
                </label>
                <Select defaultValue="high">
                  <SelectTrigger className="w-full md:w-[320px]">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 ">
              <div className="space-y-1">
                <label className="text-md font-medium text-gray-700">
                  Assign To
                </label>
                <Select defaultValue="michael">
                  <SelectTrigger className="w-full md:w-[320px]">
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="michael">Michael Scott</SelectItem>
                    <SelectItem value="pam">Pam Beesly</SelectItem>
                    <SelectItem value="jim">Jim Halpert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <label className="text-md font-medium text-gray-700">
                  Category
                </label>
                <Select defaultValue="design">
                  <SelectTrigger className="w-full md:w-[320px]">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="dev">Development</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className=" grid space-y-1">
              <label className="text-md font-medium text-gray-700">
                Due date
              </label>
              <Popover>
                <PopoverTrigger asChild className="w-full md:w-[320px]">
                  <Button
                    variant="outline"
                    data-empty={!date}
                    className="data-[empty=true]:text-muted-foreground w-[212px] justify-between text-left font-normal"
                  >
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    defaultMonth={date}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Subtasks */}
            <div>
              <h3 className="mb-3 text-sm font-medium text-gray-700">
                Subtasks
              </h3>
              <div className="space-y-3 rounded-lg bg-gray-50 p-4">
                {subtasks.map((task) => (
                  <Checkbox key={task} id={task} />
                ))}
                <button className="text-sm font-medium text-blue-600 hover:underline">
                  + Add Subtask
                </button>
              </div>
            </div>

            {/* Attachments & Tags */}

            <div>
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
                />
              </label>
            </div>

            <div className=" ">
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
              <Button variant="ghost">Cancel</Button>
              <Button>Create Task</Button>
            </div>
          </div>
        </div>
      </div>
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
