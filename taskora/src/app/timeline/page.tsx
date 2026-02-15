"use client";

import { useMemo, useState } from "react";
import { ChevronDownIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";

/* ---------------- TYPES ---------------- */

type Person = {
  id: string;
  name: string;
  role: string;
  avatar: string;
};

type Task = {
  id: string;
  personId: string;
  title: string;
  subtitle?: string;
  startDate: string; // ISO date
  endDate: string;
  hours?: number;
  color: string;
};

/* ---------------- DATA ---------------- */

const people: Person[] = [
  {
    id: "p1",
    name: "Herse Hedman",
    role: "Designer",
    avatar: "https://i.pravatar.cc/40?img=12",
  },
  {
    id: "p2",
    name: "Quinten Summers",
    role: "Developer",
    avatar: "https://i.pravatar.cc/40?img=32",
  },
];

const tasks: Task[] = [
  {
    id: "t1",
    personId: "p1",
    title: "Banking App Design",
    subtitle: "Alumni Finance",
    startDate: "2025-10-03",
    endDate: "2025-10-06",
    hours: 8,
    color: "bg-indigo-500",
  },
  {
    id: "t2",
    personId: "p2",
    title: "Stripe Setup",
    subtitle: "Regent",
    startDate: "2025-10-10",
    endDate: "2025-10-11",
    hours: 6,
    color: "bg-rose-500",
  },
];

/* ---------------- HELPERS ---------------- */

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

/* ---------------- COMPONENTS ---------------- */

const HeaderRow = ({ totalDays }: { totalDays: number }) => (
  <div className="grid grid-cols-[240px_repeat(auto-fit,minmax(48px,1fr))] border-b bg-gray-50 text-xs font-semibold">
    <div className="p-3">People</div>
    {Array.from({ length: totalDays }).map((_, i) => (
      <div key={i} className="border-l p-2 text-center">
        {i + 1}
      </div>
    ))}
  </div>
);

const TaskBlock = ({
  task,
  year,
  month,
  totalDays,
}: {
  task: Task;
  year: number;
  month: number;
  totalDays: number;
}) => {
  const start = new Date(task.startDate);
  const end = new Date(task.endDate);

  if (start.getMonth() !== month || start.getFullYear() !== year) return null;

  const startDay = start.getDate() - 1;
  const duration =
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1;

  return (
    <div
      className={`${task.color} absolute top-1 h-14 rounded-md p-2 text-xs text-white shadow`}
      style={{
        left: `calc(${startDay} * 100% / ${totalDays})`,
        width: `calc(${duration} * 100% / ${totalDays} - 6px)`,
      }}
    >
      <div className="font-semibold">{task.title}</div>
      {task.subtitle && <div className="opacity-90">{task.subtitle}</div>}
      {task.hours && (
        <div className="absolute bottom-1 right-2 text-[10px]">
          {task.hours}h
        </div>
      )}
    </div>
  );
};

const PersonRow = ({
  person,
  year,
  month,
  totalDays,
}: {
  person: Person;
  year: number;
  month: number;
  totalDays: number;
}) => {
  const personTasks = tasks.filter((t) => t.personId === person.id);

  return (
    <div className="grid grid-cols-[240px_repeat(auto-fit,minmax(48px,1fr))] border-b min-h-[72px]">
      <div className="flex items-center gap-3 p-3">
        <img src={person.avatar} className="h-8 w-8 rounded-full" />
        <div>
          <div className="text-sm font-semibold">{person.name}</div>
          <div className="text-xs text-gray-500">{person.role}</div>
        </div>
      </div>

      <div className="relative col-span-full">
        <div className="absolute inset-0 grid grid-cols-[repeat(auto-fit,minmax(48px,1fr))]">
          {Array.from({ length: totalDays }).map((_, i) => (
            <div key={i} className="border-l" />
          ))}
        </div>

        {personTasks.map((task) => (
          <TaskBlock
            key={task.id}
            task={task}
            year={year}
            month={month}
            totalDays={totalDays}
          />
        ))}
      </div>
    </div>
  );
};

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );

  const year = selectedDate?.getFullYear() ?? new Date().getFullYear();
  const month = selectedDate?.getMonth() ?? new Date().getMonth();

  const totalDays = useMemo(() => daysInMonth(year, month), [year, month]);

  const label = selectedDate?.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="relative h-screen overflow-hidden">
      {/* HEADER */}
      <HeaderRow totalDays={totalDays} />

      {/* BODY */}
      <div className="overflow-auto">
        {people.map((p) => (
          <PersonRow
            key={p.id}
            person={p}
            year={year}
            month={month}
            totalDays={totalDays}
          />
        ))}
      </div>

      {/* CALENDAR (Bottom Right) */}
      <div className="fixed bottom-4 right-4 rounded-md border bg-white p-3 shadow-lg">
        <Popover>
          <PopoverTrigger asChild className="w-full md:w-[320px]">
            <Button
              variant="outline"
              data-empty={!selectedDate}
              className="data-[empty=true]:text-muted-foreground w-53 justify-between text-left font-normal"
            >
              {selectedDate ? (
                selectedDate.toDateString()
              ) : (
                <span>Pick a date</span>
              )}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              defaultMonth={selectedDate}
            />
          </PopoverContent>
        </Popover>
        <div className="mt-2 text-center text-xs font-semibold">{label}</div>
      </div>
    </div>
  );
}
