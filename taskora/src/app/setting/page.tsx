"use client";

import { User, Briefcase, Palette } from "lucide-react";
import { forwardRef, useState } from "react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { Upload, Moon, Sun, Check } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Url } from "next/dist/shared/lib/router/router";

type FormData = {
  fullName?: string;
  email: string;
  username: string;
  contact: number;
  address: string;
  workName: string;
  workUrl: Url;
};

export default function SettingsTabs() {
  const [mode, setMode] = useState<"Profile" | "Workspace" | "Theme">(
    "Profile",
  );

  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
    reset();
  };

  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [useSystem, setUseSystem] = useState(false);
  const [accent, setAccent] = useState("#2563EB");
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">(
    "medium",
  );

  const accentColors = [
    "#2563EB",
    "#06B6D4",
    "#22C55E",
    "#F59E0B",
    "#7C3AED",
    "#EC4899",
    "#DC2626",
  ];

  return (
    <>
      <div className="flex w-full flex-wrap gap-3 rounded-lg border bg-white p-3 shadow-xl sm:w-fit sm:gap-6 sm:p-4">
        <button
          onClick={() => setMode("Profile")}
          className={`flex items-center gap-1 rounded-md p-2 shadow-xl ${mode === "Profile" ? " ring-1 ring-blue-400" : "border"}`}
        >
          <User className="p-1 " />
          Profile
        </button>
        <button
          onClick={() => setMode("Workspace")}
          className={`flex items-center gap-1 rounded-md p-2 shadow-xl ${mode === "Workspace" ? "ring-1 ring-blue-400" : "border"}`}
        >
          <Briefcase className="p-1" />
          Workspace
        </button>
        <button
          onClick={() => setMode("Theme")}
          className={`flex items-center gap-1 rounded-md p-2 shadow-xl ${mode === "Theme" ? "ring-1 ring-blue-400" : "border"}`}
        >
          <Palette className="p-1" />
          Theme
        </button>
      </div>
      <div className="m-3 rounded-2xl p-4 shadow-2xl sm:m-5 sm:p-5">
        {mode === "Profile" && (
          <div>
            <h1 className="text-2xl text-black font-semibold">
              Basic information
            </h1>
            <p className="text-sm text-gray-400">
              Manage your personal profile details
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <div>
                <Image
                  src="/logo.png"
                  alt="profile logo"
                  height={50}
                  width={50}
                  className="object-cover rounded-4xl bg-gray-100"
                />
              </div>

              <Input
                icon={
                  <Upload size={18} className=" cursor-pointer text-blue-600" />
                }
                type="file"
                accept="image/*"
                className=" font-semibold"
              />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
                <label className="text-md font-semibold text-gray-500 ">
                  full Name
                  <Input
                    placeholder="John Doe"
                    type="name"
                    {...register("fullName", { required: true })}
                  />
                </label>
                <label className="text-md font-semibold text-gray-500">
                  Email
                  <Input
                    placeholder="example@gmail.com"
                    type="name"
                    {...register("email", { required: true })}
                  />
                </label>
                <label className="text-md font-semibold text-gray-500 mt-5">
                  User Name
                  <Input
                    placeholder="johndoe122"
                    type="name"
                    {...register("username", { required: true })}
                  />
                </label>
              </div>
              <h1 className=" text-xl font-semibold text-black  mt-10">
                Contact Information
              </h1>
              <p className="text-md pt-2 font-semibold text-gray-400 ">
                Update your details for better communication
              </p>
              <div className="grid grid-cols-1 gap-5 pt-10 md:grid-cols-2">
                <label className="text-md font-semibold text-gray-500">
                  Phone Number
                  <Input
                    placeholder="+91 1800253698"
                    type="text"
                    {...register("contact", { required: true })}
                  />
                </label>
                <label className="text-md font-semibold text-gray-500">
                  Address
                  <Input
                    placeholder="Ranchi Jharkhand, India "
                    type="name"
                    {...register("address", { required: true })}
                  />
                </label>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-10">
                <button
                  onClick={() => reset()}
                  className="bg-gray-300 shadow-xl text-white font-semibold rounded-sm p-2"
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
            <h1 className="text-2xl text-black font-semibold">
              Workspace Settings
            </h1>
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <label className="text-md font-semibold text-gray-500 ">
                  Worksapce Name
                  <Input
                    placeholder="Taskora"
                    type="name"
                    {...register("workName", { required: true })}
                  />
                </label>
                <label className="text-md font-semibold text-gray-500 ">
                  Worksapce Url
                  <Input
                    placeholder="/taskora-project"
                    type="url"
                    accept="url/*"
                    {...register("workUrl", { required: true })}
                  />
                </label>
              </div>
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                <h1 className="text-xl font-semibold text-black ">
                  Logo & Icons
                </h1>
                <label className="h-40 w-full max-w-40 border-2 border-dashed border-blue-400 rounded-md flex flex-col items-center justify-between cursor-pointer p-1 hover:bg-blue-50">
                  <span className="text-md font-medium text-gray-500">
                    Upload Logo
                  </span>

                  <Upload size={18} className="text-blue-600 mb-1" />

                  <Input type="file" accept="image/*" className="hidden" />
                </label>
                <label className="h-40 w-full max-w-40 border-2 border-dashed border-blue-400 rounded-md flex flex-col items-center justify-between cursor-pointer p-1 hover:bg-blue-50">
                  <span className="text-md font-medium text-gray-500">
                    Upload Icon
                  </span>

                  <Upload size={18} className="text-blue-600 mb-1" />

                  <Input type="file" accept="image/*" className="hidden" />
                </label>
              </div>
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-3">
                <h1 className="text-xl font-semibold text-black ">Time zone</h1>
                <Select>
                  <SelectTrigger className="w-full md:w-62.5">
                    <SelectValue placeholder="Time Zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="India">
                      India – UTC +05:30 (IST)
                    </SelectItem>
                    <SelectItem value="Hong Kong">
                      Hong Kong – UTC +08:00
                    </SelectItem>
                    <SelectItem value="Singapore">
                      Singapore – UTC +08:00
                    </SelectItem>
                    <SelectItem value="Oman">Oman – UTC +04:00</SelectItem>
                    <SelectItem value="UAE">
                      United Arab Emirates (UAE) – UTC +04:00
                    </SelectItem>
                    <SelectItem value="saudi">
                      Saudi Arabia – UTC +03:00
                    </SelectItem>
                    <SelectItem value="kuwait">Kuwait – UTC +03:00</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-10">
                <button
                  onClick={() => reset()}
                  className="bg-gray-300 shadow-xl text-white font-semibold rounded-sm p-2"
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

        {mode === "Theme" && (
          <div className="rounded-xl bg-slate-100">
            {/* Sidebar */}

            {/* Main Content */}
            <main className="p-4 sm:p-6 lg:p-8">
              <h2 className="text-3xl font-bold text-slate-800">
                Theme Settings
              </h2>
              <p className="text-slate-500 mb-8">
                Customize your theme preferences.
              </p>

              {/* Appearance */}
              <section className="bg-white rounded-xl p-6 shadow mb-8">
                <h3 className="text-xl font-semibold mb-4">Appearance</h3>

                <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                  <button
                    onClick={() => setTheme("light")}
                    className={`flex-1 border rounded-xl p-4 flex flex-col items-center gap-3 transition ${
                      theme === "light"
                        ? "border-blue-600 ring-2 ring-blue-200"
                        : "hover:border-slate-300"
                    }`}
                  >
                    <Sun className="text-yellow-500" />
                    <span className="font-medium">Light Mode</span>
                  </button>

                  <button
                    onClick={() => setTheme("dark")}
                    className={`flex-1 border rounded-xl p-4 flex flex-col items-center gap-3 transition ${
                      theme === "dark"
                        ? "border-blue-600 ring-2 ring-blue-200"
                        : "hover:border-slate-300"
                    }`}
                  >
                    <Moon className="text-slate-700" />
                    <span className="font-medium">Dark Mode</span>
                  </button>
                </div>

                {/* System Toggle */}
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <span className="text-slate-700">Use System Preference</span>
                  <button
                    onClick={() => setUseSystem(!useSystem)}
                    className={`w-12 h-6 rounded-full relative transition ${
                      useSystem ? "bg-blue-600" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition ${
                        useSystem ? "translate-x-6" : ""
                      }`}
                    />
                  </button>
                </div>
              </section>

              {/* Accent Color */}
              <section className="bg-white rounded-xl p-6 shadow mb-8">
                <h3 className="text-xl font-semibold mb-4">Accent Color</h3>

                <div className="mb-4 flex flex-wrap gap-4">
                  {accentColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setAccent(color)}
                      style={{ backgroundColor: color }}
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                    >
                      {accent === color && <Check className="text-white" />}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <label className="font-medium">Custom Color:</label>
                  <input
                    type="color"
                    value={accent}
                    onChange={(e) => setAccent(e.target.value)}
                    className="w-12 h-10 p-1 border rounded"
                  />
                  <input
                    value={accent}
                    readOnly
                    className="border px-3 py-2 rounded w-32"
                  />
                </div>
              </section>

              {/* Font Size */}
              <section className="bg-white rounded-xl p-6 shadow mb-8">
                <h3 className="text-xl font-semibold mb-4">Font Size</h3>

                <div className="flex flex-wrap gap-4">
                  {(["small", "medium", "large"] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => setFontSize(size)}
                      className={`px-6 py-2 rounded-lg border transition ${
                        fontSize === size
                          ? "bg-blue-600 text-white"
                          : "hover:bg-slate-100"
                      }`}
                    >
                      {size.charAt(0).toUpperCase() + size.slice(1)}
                    </button>
                  ))}
                </div>
              </section>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-10">
                <button
                  onClick={() => reset()}
                  className="bg-gray-300 shadow-xl text-white font-semibold rounded-sm p-2"
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
            </main>
          </div>
        )}
      </div>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Input = forwardRef<HTMLInputElement, any>(({ icon, ...props }, ref) => (
  <div className="flex items-center gap-3 border rounded-lg px-4 py-3">
    <span className="text-gray-400">{icon}</span>
    <input ref={ref} {...props} className="w-full outline-none text-sm" />
  </div>
));

Input.displayName = "Input";
