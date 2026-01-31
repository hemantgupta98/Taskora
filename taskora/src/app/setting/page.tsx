"use client";

import { User, Briefcase, Palette } from "lucide-react";
import { forwardRef, useState } from "react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { Upload } from "lucide-react";
import { Switch } from "../../components/ui/switch";

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

  return (
    <>
      <div className="flex  gap-6 bg-white border shadow-xl rounded-lg p-4 w-fit">
        <button
          onClick={() => setMode("Profile")}
          className={` flex p-2 rounded-md shadow-xl ${mode === "Profile" ? " ring-1 ring-blue-400" : "border"}`}
        >
          <User className="p-1 " />
          Profile
        </button>
        <button
          onClick={() => setMode("Workspace")}
          className={`flex p-2 rounded-md shadow-xl ${mode === "Workspace" ? "ring-1 ring-blue-400" : "border"}`}
        >
          <Briefcase className="p-1" />
          Workspace
        </button>
        <button
          onClick={() => setMode("Theme")}
          className={`flex p-2 rounded-md shadow-xl  ${mode === "Theme" ? "ring-1 ring-blue-400" : "border"}`}
        >
          <Palette className="p-1" />
          Theme
        </button>
      </div>
      <div className="m-5 p-5 rounded-2xl shadow-2xl">
        {mode === "Profile" && (
          <div>
            <h1 className="text-2xl text-black font-semibold">
              Basic information
            </h1>
            <p className="text-sm text-gray-400">
              Manage your personal profile details
            </p>
            <div className="flex gap-4 mt-10">
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
              <div className="space-x-5 grid grid-cols-2 mt-10 ">
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
              <div className=" grid grid-cols-2 pt-10 gap-5 ">
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
              <div className="pt-10 space-x-5 flex justify-center align-top">
                <button
                  onClick={() => reset()}
                  className="bg-gray-300 shadow-xl text-white font-semibold rounded-sm p-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 shadow-xl text-white font-semibold rounded-sm p-2 w-40"
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
              <div className=" grid grid-cols-2 space-x-5">
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
              <div className="grid grid-cols-3 space-x-5">
                <h1 className="text-xl font-semibold text-black ">
                  Logo & Icons
                </h1>
                <label className="h-50 w-50 border-2 border-dashed border-blue-400 rounded-md flex flex-col items-center justify-between cursor-pointer p-1 hover:bg-blue-50">
                  <span className="text-md font-medium text-gray-500">
                    Upload Logo
                  </span>

                  <Upload size={18} className="text-blue-600 mb-1" />

                  <Input type="file" accept="image/*" className="hidden" />
                </label>
                <label className="h-50 w-50 border-2 border-dashed border-blue-400 rounded-md flex flex-col items-center justify-between cursor-pointer p-1 hover:bg-blue-50">
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
              <div className=" grid grid-cols-3">
                <h1 className="text-xl font-semibold text-black ">Time zone</h1>
                <Select>
                  <SelectTrigger className="w-[250px]">
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
              <div className="pt-10 space-x-5 flex justify-center align-top">
                <button
                  onClick={() => reset()}
                  className="bg-gray-300 shadow-xl text-white font-semibold rounded-sm p-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 shadow-xl text-white font-semibold rounded-sm p-2 w-40"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {mode === "Theme" && (
          <div>
            <h1 className="text-2xl font-semibold text-black">
              Theme Settings
            </h1>
            <p className="text-sm  text-gray-400">
              Customize your theme prefrences
            </p>
            <div className="flex items-center gap-4 my-6">
              <h1 className="text-xl text-black font-semibold">Appearance</h1>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className=" grid grid-cols-3 ml-15">
              <label className="h-50 w-50 border border-2 border-gray-400 rounded-md flex flex-col items-center justify-between cursor-pointer p-1 hover:bg-blue-50"></label>
              <label className="h-50 w-50 border-2 border border-gray-400 rounded-md flex flex-col items-center justify-between cursor-pointer p-1 hover:bg-blue-50"></label>
            </div>
            <div className="flex ml-15 mt-10 gap-5">
              <Upload size={20} />
              <h1 className=" text-md text-black font-semibold">
                Use system prefrences
              </h1>
              <Switch />
            </div>
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
