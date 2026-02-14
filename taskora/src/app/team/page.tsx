"use client";

import { UserPlus, SlidersHorizontal, Mail, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { api } from "../../lib/socket";
import { useEffect, useState } from "react";

type TeamMember = {
  name: string;
  email: string;
  phone: number | string;
  status: "online" | "away" | "busy" | "offline";
  avatar: string;
  role: string;
};

export default function TeamManagementPage() {
  const router = useRouter();

  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await api.get("/accept");

        const apiData = res.data.data;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formattedMembers: TeamMember[] = apiData.map((user: any) => ({
          name: user.name,
          email: user.email,
          phone: user.phone,
          status: "online",
          avatar: "/logo.png",
        }));

        setMembers(formattedMembers);
      } catch (error) {
        console.error("Failed to fetch team members", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
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
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm cursor-pointer"
              >
                <UserPlus size={16} />
                Invite Member
              </button>

              <button className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm cursor-pointer">
                <SlidersHorizontal size={16} />
                Bulk Assign Role
              </button>
            </div>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              <p className="text-gray-500">Loading team members...</p>
            ) : members.length === 0 ? (
              <p className="text-gray-500">No team members found</p>
            ) : (
              members.map((member) => (
                <MemberCard key={member.email} member={member} />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="bg-white border rounded-2xl p-5 space-y-4">
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

        <div>
          <p className="font-medium">{member.name}</p>
          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">
            {member.role}
          </span>
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Mail size={14} />
          {member.email}
        </div>
        <div className="flex items-center gap-2">
          <Phone size={14} />
          {member.phone}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button className="flex-1 border rounded-lg py-2 text-sm hover:bg-gray-50 cursor-pointer">
          View Profile
        </button>
        <button className="text-blue-600 text-sm cursor-pointer">
          Edit Role
        </button>
      </div>
    </div>
  );
}
