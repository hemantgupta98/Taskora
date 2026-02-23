"use client";

import { X, Send } from "lucide-react";
import Link from "next/link";
import {
  forwardRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { toast, Toaster } from "sonner";
import LabeledInput from "../../components/ui/input";
import { SubmitHandler, useForm, Controller } from "react-hook-form";

import { FaAngleDoubleLeft } from "react-icons/fa";

type Invite = {
  email: string;
  teamMembers: string;
};

export default function InviteTeamModal() {
  const [open, setOpen] = useState(true);

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Invite>({
    defaultValues: {
      email: "",
      teamMembers: "",
    },
  });

  const onsubmit: SubmitHandler<Invite> = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "https://taskora-88w5.onrender.com/api/invite/sendinvite",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({
            email: data.email,
            teamMembers: data.teamMembers,
          }),
        },
      );

      let result;
      const contentType = res.headers.get("content-type");

      if (contentType?.includes("application/json")) {
        result = await res.json();
      } else {
        const text = await res.text();
        throw new Error(text || "Invalid server response");
      }
      if (!res.ok) {
        toast.error(result.message || "Failed to connect");
        return;
      }

      toast.success("Invites sent successfully ✅");
      reset();
    } catch (error) {
      console.error(error);
      toast.warning("Something went wrong ❌");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <Toaster richColors position="top-center" />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b">
          <div>
            <h2 className="text-lg font-semibold">Invite Team Members</h2>
            <p className="text-sm text-gray-500">
              Invite new members to your team and manage their roles.
            </p>
          </div>
          <button onClick={() => setOpen(false)} className="text-gray-500 mb-4">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Role */}
          <form onSubmit={handleSubmit(onsubmit)}>
            <div className=" mt-2 mb-4">
              <label className="mb-1 block text-sm font-medium text-gray-800">
                Role<span className="text-red-500">*</span>
              </label>
              <Input
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none"
                placeholder="Enter team member role"
                {...register("teamMembers", { required: "Role is required" })}
              />
            </div>
            {/* Invite by Email */}
            <div className="border rounded-xl p-4 space-y-3">
              <h3 className="font-medium">Invite by Email</h3>
              <div className="space-y-1">
                <LabeledInput
                  {...register("email", { required: "Gmail is required" })}
                  placeholder="e.g. jane.doe@example.com, john.smith@example.com"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  label={"Email Addresses"}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 ml-1">
                    {errors.email.message}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  Separate multiple emails with commas.
                </p>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-2.5 rounded-lg text-sm font-medium"
              >
                <Send size={16} /> Send Invites
              </button>
              <Link
                href="/team"
                className=" cursor-pointer gap-2 flex justify-center text-gray-500"
              >
                <FaAngleDoubleLeft className="mt-1.5" />
                Back
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

type ChipInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactNode;
};

const Input = forwardRef<HTMLInputElement, ChipInputProps>(
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
