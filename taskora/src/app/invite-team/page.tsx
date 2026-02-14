"use client";

import { X, Send, Copy } from "lucide-react";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import Input from "../../components/ui/input";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

type Invite = {
  email: string;
  role: string;
};

export default function InviteTeamModal() {
  const [open, setOpen] = useState(true);
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Invite>();

  const teamLink = "http://taskora.com/join/team-abc-123";

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("copied..");
    } catch (err) {
      console.log("Failed to copy:", err);
    }
  };
  if (!open) return null;

  const onsubmit: SubmitHandler<Invite> = async (data) => {
    try {
      const res = await fetch("http://localhost:5000/api/invite/sendinvite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
        toast.error(result.message || "Failed to connect");
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
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Role</label>
              <Controller
                name="role"
                control={control}
                rules={{ required: "Role is required" }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full md:w-[320px]">
                      <SelectValue
                        defaultValue="select"
                        placeholder="Select Roles"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="viewer">Viewer</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="management">Management</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.role && (
                <p className="text-red-500 text-sm mt-1 ml-1">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Invite by Email */}
            <div className="border rounded-xl p-4 space-y-3">
              <h3 className="font-medium">Invite by Email</h3>
              <div className="space-y-1">
                <Input
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
            </div>
          </form>

          {/* Shareable Link */}
          <div className="border rounded-xl p-4 space-y-3">
            <h3 className="font-medium">Shareable Team Link</h3>
            <div className="flex items-center gap-2">
              <input
                readOnly
                value="https://taskora.com/join/team-abc-123"
                className="flex-1 border rounded-lg px-3 py-2 text-sm"
              />
              <button
                onClick={() => copyToClipboard(teamLink)}
                className="flex items-center gap-1 px-3 py-2 border rounded-lg text-sm"
              >
                <Copy size={16} /> Copy Link
              </button>
            </div>
            <p className="text-xs text-gray-500">
              Anyone with this link can join as a Viewer. Roles can be adjusted
              later.
            </p>
          </div>

          {/* Recent Activity */}
          <div className="border rounded-xl p-4 space-y-3">
            <h3 className="font-medium">Recent Activity</h3>
            <div className="flex items-center gap-3 text-sm">
              {/**<img
                src="https://i.pravatar.cc/32"
                className="w-8 h-8 rounded-full"
              /> */}

              <p className="text-gray-600">
                <span className="font-medium">Alice Johnson</span> invited
                <span className="font-medium"> Bob Williams</span> as Editor
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
