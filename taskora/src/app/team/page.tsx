"use client";

import { UserPlus, SlidersHorizontal, Mail, Phone, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { api } from "../../lib/socket";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

type TeamMember = {
  _id: string;
  name: string;
  email: string;
  phone: number | string;
  status: "online" | "away" | "busy" | "offline";
  avatar: string;
  teamMember: string;
};

type Section = {
  admin: string;
  tasks: TeamMember[];
};

function groupByAdmin(list: TeamMember[]) {
  const map = new Map<string, TeamMember[]>();
  for (const t of list) {
    const key = t._id || "Unassigned";
    const arr = map.get(key) || [];
    arr.push(t);
    map.set(key, arr);
  }
  return Array.from(map.entries()).map(([admin, tasks]) => ({ admin, tasks }));
}

export default function TeamManagementPage() {
  const router = useRouter();
  const [plans, setPlans] = useState<TeamMember[]>([]);
  const [, setSectionsData] = useState<Section[]>([]);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"view" | "edit" | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await api.get("/accept");

        const apiData = res.data.data;

        const formattedMembers: TeamMember[] = await Promise.all(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          apiData.map(async (user: any) => {
            let teamMember = "";

            try {
              const teamMemberRes = await api.get("/accept/team-member", {
                params: { email: user.email },
              });
              teamMember = teamMemberRes?.data?.data?.teamMember ?? "";
            } catch (error) {
              console.error("Failed to fetch invited team member", error);
            }

            return {
              _id: user._id,
              name: user.name,
              email: user.email,
              phone: user.phone,
              status: "online",
              avatar: "/logo.png",
              teamMember,
            };
          }),
        );

        setPlans(formattedMembers);
        setSectionsData(groupByAdmin(formattedMembers));
        setMembers(formattedMembers);
      } catch (error) {
        console.error("Failed to fetch team members", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const handleDeleteTask = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this?");
    if (!confirmed) return;

    try {
      await api.delete(`/accept/deleteplans/${id}`);

      const updated = plans.filter((t) => t._id !== id);
      setPlans(updated);
      setSectionsData(groupByAdmin(updated));
      setMembers(updated);

      toast.success("Plan deleted successfully");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete plan");
    }
  };

  return (
    <div className="flex min-h-screen rounded-2xl bg-gray-50 shadow-2xl">
      <Toaster position="top-center" richColors />
      {/* Main */}
      <main className="flex-1 flex flex-col">
        {/* Content */}
        <div className="space-y-6 p-3 sm:p-4 lg:p-6">
          {/* Header */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-semibold">Team Management</h1>

            <div className="flex w-full flex-wrap gap-3 sm:w-auto">
              <button
                onClick={() => router.push("/invite-team")}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white cursor-pointer"
              >
                <UserPlus size={16} />
                Invite Member
              </button>

              <button
                onClick={() => toast.warning("can't be assign")}
                className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm cursor-pointer"
              >
                <SlidersHorizontal size={16} />
                Bulk Assign Role
              </button>
            </div>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
            {loading ? (
              <p className="text-gray-500">Loading team members...</p>
            ) : members.length === 0 ? (
              <p className="text-gray-500">No team members found</p>
            ) : (
              members.map((member) => (
                <MemberCard
                  key={member.email}
                  member={member}
                  onView={() => {
                    setSelectedMember(member);
                    setMode("view");
                  }}
                  onDelete={handleDeleteTask}
                  onEdit={() => toast.warning("Can't be edit")}
                />
              ))
            )}
          </div>
          <div className="w-full sm:w-fit">
            {mode === "view" && selectedMember && (
              <div className="bg-white p-4 rounded-xl border">
                <h2 className="font-semibold text-lg">Profile</h2>
                <p>Name: {selectedMember.name}</p>
                <p>Email: {selectedMember.email}</p>
                <p>Phone: {selectedMember.phone}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function MemberCard({
  member,
  onView,
  onDelete,
  onEdit,
}: {
  member: TeamMember;
  onView: () => void;
  onDelete: (id: string) => void;
  onEdit: () => void;
}) {
  return (
    <div className="space-y-4 rounded-2xl border bg-white p-4 sm:p-5">
      {/* Avatar + Status */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <Image
            src={member.avatar}
            alt="Member Avatar"
            height={50}
            width={50}
            className="rounded-full"
          />

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

        <div className="flex-1">
          <div className="flex items-start justify-between">
            <p className="font-medium">{member.name}</p>
            <X
              onClick={() => onDelete(member._id)}
              size={20}
              className="text-red-500 cursor-pointer"
            />
          </div>
          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">
            {member.teamMember}
          </span>
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2 break-all">
          <Mail size={14} />
          {member.email}
        </div>
        <div className="flex items-center gap-2">
          <Phone size={14} />
          {member.phone}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={onView}
          className="flex-1 border rounded-lg py-2 text-sm hover:bg-gray-50 cursor-pointer"
        >
          View Profile
        </button>
        <button
          onClick={onEdit}
          className="text-blue-600 text-sm cursor-pointer"
        >
          Edit Role
        </button>
      </div>
    </div>
  );
}
