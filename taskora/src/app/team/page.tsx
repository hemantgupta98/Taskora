"use client";

import { UserPlus, SlidersHorizontal, Mail, Phone } from "lucide-react";
import { useRouter } from "next/navigation";

const teamMembers = [
  {
    name: "Alice Johnson",
    role: "Product Manager",
    email: "alice.j@taskora.com",
    phone: "+1 555-123-4567",
    avatar: "https://i.pravatar.cc/100?img=1",
    status: "online",
  },
  {
    name: "Bob Williams",
    role: "Software Engineer",
    email: "bob.w@taskora.com",
    phone: "+1 555-987-6543",
    avatar: "https://i.pravatar.cc/100?img=2",
    status: "away",
  },
  {
    name: "Charlie Brown",
    role: "UX Designer",
    email: "charlie.b@taskora.com",
    phone: "+1 555-111-2222",
    avatar: "https://i.pravatar.cc/100?img=3",
    status: "offline",
  },
  {
    name: "Diana Prince",
    role: "Quality Assurance",
    email: "diana.p@taskora.com",
    phone: "+1 555-333-4444",
    avatar: "https://i.pravatar.cc/100?img=4",
    status: "online",
  },
  {
    name: "Eve Adams",
    role: "Scrum Master",
    email: "eve.a@taskora.com",
    phone: "+1 555-555-6666",
    avatar: "https://i.pravatar.cc/100?img=5",
    status: "busy",
  },
];

export default function TeamManagementPage() {
  const router = useRouter();
  return (
    <div className="  flex min-h-screen bg-gray-50">
      {/* Main */}
      <main className="flex-1 flex flex-col">
        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Team Management</h1>
            <div className="flex gap-3">
              <button
                onClick={() => router.push("/invite-team")}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
              >
                <UserPlus size={16} /> Invite Member
              </button>
              <button className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm">
                <SlidersHorizontal size={16} /> Bulk Assign Role
              </button>
            </div>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <MemberCard key={member.email} member={member} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------- Components ---------- */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SidebarItem({ icon, label, active }: any) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm ${
        active ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {icon}
      {label}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MemberCard({ member }: any) {
  return (
    <div className="bg-white border rounded-2xl p-5 space-y-4">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img src={member.avatar} className="w-12 h-12 rounded-full" />
          <span
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
              member.status === "online"
                ? "bg-green-500"
                : member.status === "away"
                  ? "bg-yellow-400"
                  : member.status === "busy"
                    ? "bg-red-500"
                    : "bg-gray-400"
            }`}
          />
        </div>
        <div>
          <p className="font-medium">{member.name}</p>
          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">
            {member.role}
          </span>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Mail size={14} /> {member.email}
        </div>
        <div className="flex items-center gap-2">
          <Phone size={14} /> {member.phone}
        </div>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 border rounded-lg py-2 text-sm hover:bg-gray-50">
          View Profile
        </button>
        <button className="text-blue-600 text-sm">Edit Role</button>
      </div>
    </div>
  );
}
