"use client";

import { User, Briefcase, Palette } from "lucide-react";
import { forwardRef, useEffect, useState } from "react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { Upload, Moon, Sun, Check } from "lucide-react";
import { api } from "../../lib/socket";
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

type Data = {
  name?: string;
  email: string;
  password: string;
};

export default function SettingsTabs() {
  const [mode, setMode] = useState<"Profile" | "Workspace">("Profile");
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Data[]>([]);

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

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/auth/signup");
        const list: Data[] = res.data.data;
        setTasks(list);
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <p>Loading...</p>;

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
