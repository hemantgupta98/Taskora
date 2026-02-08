"use client";

import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Bell,
  HelpCircle,
} from "lucide-react";

// -------------------- Types --------------------
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
  dayIndex: number; // 0 = Mon
  duration: number; // number of days
  hours?: number;
  color: string; // tailwind bg color
};

// -------------------- Mock Data --------------------
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
  {
    id: "p3",
    name: "Jenny Murtaugh",
    role: "UX / Content",
    avatar: "https://i.pravatar.cc/40?img=45",
  },
  {
    id: "p4",
    name: "Vuong Nhi",
    role: "Manager",
    avatar: "https://i.pravatar.cc/40?img=56",
  },
];

const days = [
  "25 Mon",
  "26 Tue",
  "27 Wed",
  "28 Thu",
  "29 Fri",
  "30 Sat",
  "31 Sun",
  "1 Mon",
  "2 Tue",
  "3 Wed",
  "4 Thu",
  "5 Fri",
];

const tasks: Task[] = [
  {
    id: "t1",
    personId: "p1",
    title: "Banking App Design",
    subtitle: "Alumni Finance",
    dayIndex: 0,
    duration: 2,
    hours: 8,
    color: "bg-indigo-500",
  },
  {
    id: "t2",
    personId: "p1",
    title: "iPhone App Design",
    subtitle: "Regent",
    dayIndex: 2,
    duration: 1,
    hours: 7,
    color: "bg-blue-500",
  },
  {
    id: "t3",
    personId: "p1",
    title: "Login Screens",
    subtitle: "Bees Knees",
    dayIndex: 3,
    duration: 1,
    hours: 8,
    color: "bg-amber-400",
  },

  {
    id: "t4",
    personId: "p2",
    title: "Reddoor Security",
    subtitle: "Regent",
    dayIndex: 0,
    duration: 1,
    hours: 8,
    color: "bg-red-400",
  },
  {
    id: "t5",
    personId: "p2",
    title: "Backup Servers",
    subtitle: "Green Ways",
    dayIndex: 1,
    duration: 2,
    hours: 5,
    color: "bg-purple-400",
  },
  {
    id: "t6",
    personId: "p2",
    title: "Stripe Setup",
    subtitle: "Regent",
    dayIndex: 4,
    duration: 1,
    hours: 7,
    color: "bg-rose-400",
  },

  {
    id: "t7",
    personId: "p3",
    title: "Campaign",
    subtitle: "Sharpes",
    dayIndex: 0,
    duration: 1,
    hours: 8,
    color: "bg-pink-300",
  },
  {
    id: "t8",
    personId: "p3",
    title: "Summer Marketing Plan",
    subtitle: "Green Ways",
    dayIndex: 7,
    duration: 2,
    hours: 5,
    color: "bg-violet-400",
  },

  {
    id: "t9",
    personId: "p4",
    title: "Client Services Strategy Week",
    subtitle: "Razor Agency",
    dayIndex: 0,
    duration: 5,
    hours: 5,
    color: "bg-green-400",
  },
];

// -------------------- Components --------------------
const TopBar = () => (
  <div className="flex items-center justify-between bg-sky-500 px-4 py-3 text-white">
    <input
      placeholder="Search people"
      className="w-72 rounded-md px-3 py-1.5 text-sm text-black outline-none"
    />
    <div className="flex items-center gap-3">
      <button className="flex items-center gap-1 rounded-md bg-emerald-400 px-3 py-1.5 text-sm font-medium text-white">
        <Plus size={16} /> Task
      </button>
      <nav className="hidden md:flex gap-5 text-sm font-semibold">
        <span>SCHEDULE</span>
        <span>LOG TIME</span>
        <span>PEOPLE</span>
        <span>PROJECTS</span>
        <span>REPORTS</span>
      </nav>
      <Bell size={18} />
      <HelpCircle size={18} />
      {/**  <img
        className="h-8 w-8 rounded-full"
        src="https://i.pravatar.cc/40?img=5"
      />*/}
    </div>
  </div>
);

const HeaderRow = () => (
  <div className="grid grid-cols-[240px_repeat(12,minmax(90px,1fr))] border-b bg-gray-50 text-xs font-semibold">
    <div className="p-3">People</div>
    {days.map((d) => (
      <div key={d} className="border-l p-3 text-center">
        {d}
      </div>
    ))}
  </div>
);

const TaskBlock = ({ task }: { task: Task }) => (
  <div
    className={`${task.color} absolute top-1 h-14 rounded-md p-2 text-xs text-white shadow`}
    style={{
      left: `calc(${task.dayIndex} * 100% / 12)`,
      width: `calc(${task.duration} * 100% / 12 - 6px)`,
    }}
  >
    <div className="font-semibold leading-tight">{task.title}</div>
    {task.subtitle && <div className="opacity-90">{task.subtitle}</div>}
    {task.hours && (
      <div className="absolute bottom-1 right-2 text-[10px]">{task.hours}h</div>
    )}
  </div>
);

const PersonRow = ({ person }: { person: Person }) => {
  const personTasks = tasks.filter((t) => t.personId === person.id);

  return (
    <div className="grid grid-cols-[240px_repeat(12,minmax(90px,1fr))] border-b min-h-[72px]">
      <div className="flex items-center gap-3 p-3">
        <img src={person.avatar} className="h-8 w-8 rounded-full" />
        <div>
          <div className="text-sm font-semibold">{person.name}</div>
          <div className="text-xs text-gray-500">{person.role}</div>
        </div>
      </div>

      <div className="relative col-span-12">
        <div className="absolute inset-0 grid grid-cols-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-l" />
          ))}
        </div>
        {personTasks.map((task) => (
          <TaskBlock key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default function SchedulePage() {
  return (
    <div className="h-screen w-full overflow-hidden">
      <TopBar />
      <div className="flex h-[calc(100%-56px)] flex-col overflow-auto">
        <HeaderRow />
        {people.map((p) => (
          <PersonRow key={p.id} person={p} />
        ))}
      </div>

      {/* Bottom controls */}
      <div className="fixed bottom-4 right-4 flex items-center gap-2 rounded-md bg-gray-800 px-3 py-2 text-xs text-white">
        <ChevronLeft size={14} />
        <span>Oct 2021</span>
        <ChevronRight size={14} />
      </div>
    </div>
  );
}
