"use client";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";

export interface TeamMember {
  name: string;
  role: string;
  email: string;
  phone: string;
  image: string;
  status: "online" | "away" | "offline";
}

export default function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <Image
            src={member.image}
            alt={member.name}
            width={48}
            height={48}
            className="rounded-full"
          />
          <span
            className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white
              ${member.status === "online" && "bg-green-500"}
              ${member.status === "away" && "bg-yellow-500"}
              ${member.status === "offline" && "bg-gray-400"}
            `}
          />
        </div>

        <div>
          <h3 className="font-semibold">{member.name}</h3>
          <span className="text-sm bg-gray-100 px-2 py-0.5 rounded">
            {member.role}
          </span>
        </div>
      </div>

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

      <div className="flex justify-between mt-4">
        <button className="px-4 py-2 border rounded-lg text-sm">
          View Profile
        </button>
        <button className="text-primary text-sm">Edit Role</button>
      </div>
    </div>
  );
}
