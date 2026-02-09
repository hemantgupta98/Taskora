"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { Toaster, toast } from "sonner";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { forwardRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { da, id } from "date-fns/locale";

type Data = {
  name: string;
  access: string;
  work: string;
  project: string;
};

export default function CreatePlanPage() {
  const [mode, setMode] = useState<"createplans" | "viewplans">("createplans");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<Data>({
    defaultValues: {
      access: "select",
      work: "select",
    },
  });

  const onSubmit: SubmitHandler<Data> = async (data) => {
    console.log(data);

    try {
      const url = "http://localhost:5000/api/plans/createplans";
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
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
        toast.error(result.message || "Plans failed");
        return reset();
      }
      reset();
      toast.success("Plans created");
    } catch (error) {
      console.log("Error in Api", error);
      toast.warning("server error please try again later");
    }
  };

  return (
    <>
      <div className="flex  gap-6 bg-white border shadow-xl rounded-lg p-4 w-fit">
        <button
          onClick={() => setMode("createplans")}
          className={` flex p-2 rounded-md shadow-xl ${mode === "createplans" ? " ring-1 ring-blue-400" : "border"}`}
        >
          Create Plans
        </button>
        <button
          onClick={() => setMode("viewplans")}
          className={` flex p-2 rounded-md shadow-xl ${mode === "viewplans" ? " ring-1 ring-blue-400" : "border"}`}
        >
          View Plans
        </button>
      </div>
      <div>
        {mode === "createplans" && (
          <div className="mx-auto  p-5 max-w-3xl rounded-xl shadow-2xl">
            {/* Header */}
            <Toaster richColors position="top-center" />
            <div className="mb-8">
              <div className=" flex">
                <div className="mb-4 flex items-center gap-2">
                  <Image src="/logo.png" alt="logo" height={50} width={50} />
                  <span className="text-xl font-semibold">Taskora</span>
                </div>
              </div>

              <h1 className="mb-2 text-2xl font-semibold text-gray-900">
                Create your plan
              </h1>
              <p className="text-gray-600">
                Visualize, plan, track, and report on work across multiple
                spaces, boards or teams.
              </p>
            </div>

            <p className="mb-6 text-sm text-gray-500">
              Required fields are marked with an asterisk
              <span className="text-red-500">*</span>
            </p>

            {/* Name */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="mb-6">
                <label className="mb-1 block text-sm font-medium text-gray-800">
                  Name <span className="text-red-500">*</span>
                </label>
                <Input
                  {...register("name", {
                    required: "Enter your plan",
                  })}
                  placeholder="Enter a plan name"
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none"
                />

                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Access */}
              <div className="mb-8">
                <label className="mb-1 block text-sm font-medium text-gray-800">
                  Access <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Controller
                    name="access"
                    control={control}
                    rules={{
                      validate: (value) =>
                        value !== "select" || "Please choose access type",
                    }}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full md:w-[320px]">
                          <SelectValue placeholder="Select access" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="select">Select</SelectItem>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />

                  {errors.access && (
                    <p className="mt-2 ml-2 text-sm text-red-500">
                      {errors.access.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Add work */}
              <div className="mb-10">
                <h2 className="mb-1 text-lg font-semibold text-gray-900">
                  Add work
                </h2>
                <p className="mb-4 text-sm text-gray-600">
                  Include work items from multiple spaces, boards, or using
                  filters.
                </p>

                <label className="mb-2 block text-sm font-medium text-gray-800">
                  Work <span className="text-red-500">*</span>
                </label>

                <div className="grid  gap-3">
                  {/* Work type */}
                  <div className="relative w-40">
                    <Controller
                      name="work"
                      control={control}
                      rules={{
                        validate: (value) =>
                          value !== "select" || "Please choose work type",
                      }}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full md:w-[320px]">
                            <SelectValue placeholder="Select work" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="select">Select</SelectItem>
                            <SelectItem value="board">Board</SelectItem>
                            <SelectItem value="project">Project</SelectItem>
                            <SelectItem value="filter">Filter</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />

                    {errors.work && (
                      <p className="mt-2 ml-2 text-sm text-red-500">
                        {errors.work.message}
                      </p>
                    )}
                  </div>

                  {/* Board name */}
                  <div className=" relative flex-row">
                    <Input
                      {...register("project", {
                        required: "Enter board name",
                      })}
                      placeholder="Enter board name"
                      className="w-full rounded border border-gray-300 px-3 py-2 pr-9 text-sm focus:border-blue-600 focus:outline-none"
                    />

                    {errors.project && (
                      <p className=" text-sm text-red-500 mt-2 ml-2">
                        {errors.project.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Add more work */}
                <button
                  type="button"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gray-400 cursor-not-allowed"
                >
                  <Plus size={16} />
                  Add more work
                </button>
              </div>

              {/* Footer */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="rounded bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700 cursor-pointer"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        )}
        <div className="mx-auto  p-5 max-w-3xl rounded-xl shadow-2xl">
          {mode === "viewplans" && <p>view it</p>}
        </div>
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
