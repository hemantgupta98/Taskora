"use client";

import { User, Briefcase } from "lucide-react";
import { forwardRef, useEffect, useState } from "react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Url } from "next/dist/shared/lib/router/router";

type FormData = {
  name: string;
  email: string;
  username: string;
  contact: number;
  address: string;
  workName: string;
  workUrl: Url;
};

export default function SettingsTabs() {
  const [mode, setMode] = useState<"Profile" | "Workspace">("Profile");

  const { register, handleSubmit, reset, watch, setValue } =
    useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
    reset();
  };

  // 🔥 WATCH VALUES (TEXT ONLY)
  const name = watch("name");
  const email = watch("email");
  const contact = watch("contact");

  // 🔥 SYNC TEXT INPUTS
  useEffect(() => {
    if (name) setValue("username", name);
  }, [name, setValue]);

  useEffect(() => {
    if (email) setValue("workUrl", email as any);
  }, [email, setValue]);

  useEffect(() => {
    if (contact) setValue("address", String(contact));
  }, [contact, setValue]);

  return (
    <>
      {/* TABS */}
      <div className="flex w-full flex-wrap gap-3 rounded-lg border bg-white p-3 shadow-xl sm:w-fit sm:gap-6 sm:p-4">
        <button
          onClick={() => setMode("Profile")}
          className={`flex items-center gap-1 rounded-md p-2 shadow-xl ${
            mode === "Profile" ? "ring-1 ring-blue-400" : "border"
          }`}
        >
          <User className="p-1" />
          Profile
        </button>

        <button
          onClick={() => setMode("Workspace")}
          className={`flex items-center gap-1 rounded-md p-2 shadow-xl ${
            mode === "Workspace" ? "ring-1 ring-blue-400" : "border"
          }`}
        >
          <Briefcase className="p-1" />
          Workspace
        </button>
      </div>

      {/* CONTENT */}
      <div className="m-3 rounded-2xl p-4 shadow-2xl sm:m-5 sm:p-5">
        {mode === "Profile" && (
          <div>
            <h1 className="text-2xl font-semibold text-black">
              Basic information
            </h1>
            <p className="text-sm text-gray-400">
              Manage your personal profile details
            </p>

            {/* PROFILE IMAGE */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Image
                src="/logo.png"
                alt="profile logo"
                height={50}
                width={50}
                className="rounded-4xl bg-gray-100 object-cover"
              />

              <Input
                icon={
                  <Upload size={18} className="cursor-pointer text-blue-600" />
                }
                type="file"
                accept="image/*"
                className="font-semibold"
              />
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
                <label className="text-md font-semibold text-gray-500">
                  Full Name
                  <Input placeholder="John Doe" {...register("name")} />
                </label>

                <label className="text-md font-semibold text-gray-500">
                  Email
                  <Input
                    placeholder="example@gmail.com"
                    type="email"
                    {...register("email")}
                  />
                </label>

                <label className="text-md mt-5 font-semibold text-gray-500">
                  User Name
                  <Input placeholder="johndoe122" {...register("username")} />
                </label>
              </div>

              <h1 className="mt-10 text-xl font-semibold text-black">
                Contact Information
              </h1>
              <p className="pt-2 text-md font-semibold text-gray-400">
                Update your details for better communication
              </p>

              <div className="grid grid-cols-1 gap-5 pt-10 md:grid-cols-2">
                <label className="text-md font-semibold text-gray-500">
                  Phone Number
                  <Input
                    placeholder="+91 1800253698"
                    type="number"
                    {...register("contact")}
                  />
                </label>

                <label className="text-md font-semibold text-gray-500">
                  Address
                  <Input
                    placeholder="Ranchi Jharkhand, India"
                    {...register("address")}
                  />
                </label>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-10">
                <button
                  type="button"
                  onClick={() => reset()}
                  className="rounded-sm bg-gray-300 p-2 font-semibold text-white shadow-xl"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-full rounded-sm bg-blue-500 p-2 font-semibold text-white shadow-xl sm:w-40"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {mode === "Workspace" && (
          <div>
            <h1 className="text-2xl font-semibold text-black">
              Workspace Settings
            </h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="my-6 h-px bg-gray-200" />

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <label className="text-md font-semibold text-gray-500">
                  Workspace Name
                  <Input placeholder="Taskora" {...register("workName")} />
                </label>

                <label className="text-md font-semibold text-gray-500">
                  Workspace Url
                  <Input
                    placeholder="/taskora-project"
                    type="url"
                    {...register("workUrl")}
                  />
                </label>
              </div>

              <div className="my-6 h-px bg-gray-200" />

              {/* LOGO & ICON — NOT SYNCED */}
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                <h1 className="text-xl font-semibold text-black">
                  Logo & Icons
                </h1>

                <label className="flex h-40 w-full max-w-40 cursor-pointer flex-col items-center justify-between rounded-md border-2 border-dashed border-blue-400 p-1 hover:bg-blue-50">
                  <span className="text-md font-medium text-gray-500">
                    Upload Logo
                  </span>
                  <Upload size={18} className="mb-1 text-blue-600" />
                  <Input type="file" accept="image/*" className="hidden" />
                </label>

                <label className="flex h-40 w-full max-w-40 cursor-pointer flex-col items-center justify-between rounded-md border-2 border-dashed border-blue-400 p-1 hover:bg-blue-50">
                  <span className="text-md font-medium text-gray-500">
                    Upload Icon
                  </span>
                  <Upload size={18} className="mb-1 text-blue-600" />
                  <Input type="file" accept="image/*" className="hidden" />
                </label>
              </div>

              <div className="my-6 h-px bg-gray-200" />

              <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-3">
                <h1 className="text-xl font-semibold text-black">Time zone</h1>

                <Select>
                  <SelectTrigger className="w-full md:w-62.5">
                    <SelectValue placeholder="Time Zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="India">India – UTC +05:30</SelectItem>
                    <SelectItem value="Singapore">
                      Singapore – UTC +08:00
                    </SelectItem>
                    <SelectItem value="UAE">UAE – UTC +04:00</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-10">
                <button
                  type="button"
                  onClick={() => reset()}
                  className="rounded-sm bg-gray-300 p-2 font-semibold text-white shadow-xl"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-full rounded-sm bg-blue-500 p-2 font-semibold text-white shadow-xl sm:w-40"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

// INPUT COMPONENT (UNCHANGED)
const Input = forwardRef<HTMLInputElement, any>(
  ({ icon, className, ...props }, ref) => (
    <div className="flex items-center gap-3 rounded-lg border px-4 py-3">
      {icon && <span className="text-gray-400">{icon}</span>}
      <input
        ref={ref}
        {...props}
        className={`w-full text-sm outline-none ${className || ""}`}
      />
    </div>
  ),
);

Input.displayName = "Input";
