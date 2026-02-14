"use client";

import { useState } from "react";
import Image from "next/image";
import Input from "@/src/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { Toaster, toast } from "sonner";

type Accept = {
  name: string;
  phone: number;
  email: string;
  password: string;
  confirmpassword: string;
};

export default function AcceptInvite() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Accept>();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const onSubmit: SubmitHandler<Accept> = async (data) => {
    const { password, confirmpassword } = data;

    if (password !== confirmpassword) {
      toast.error("Password does not match");
      return;
    }
    console.log(data);
    try {
      const url = "http://localhost:5000/api/accept/acceptinvite";

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
        toast.error(result.message || "Authentication failed");
        return reset();
      }

      toast.success("Account create successfully");

      reset();
    } catch (error) {
      console.error("AUTH ERROR 👉", error);
      toast.error("Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold">Welcome to Taskora 🎉</h1>
          <p className="text-gray-500 text-sm mt-1">
            You’re invited to join <b>Team Alpha</b> as <b>Editor</b>
          </p>
        </div>
        <Toaster position="top-center" richColors />

        {/* Profile Image */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center mb-5">
            <div className="w-24 h-24 rounded-full border flex items-center justify-center overflow-hidden bg-gray-100">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Profile Preview"
                  width={96}
                  height={96}
                  className="object-cover"
                />
              ) : (
                <span className="text-gray-400 text-sm">Upload</span>
              )}
            </div>
            <label className="mt-2 text-sm text-blue-600 cursor-pointer">
              Upload Photo
              <Input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
                label={""}
              />
            </label>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Full Name"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              label=""
              {...register("name", { required: "Full name is required" })}
            />
            {errors.name && (
              <p className=" text-sm text-red-500 mt-2 ml-2">
                {errors.name.message}
              </p>
            )}

            <Input
              type="tel"
              placeholder="Phone Number"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              label=""
              {...register("phone", {
                required: "Phone number is required is required",
              })}
            />
            {errors.phone && (
              <p className=" text-sm text-red-500 mt-2 ml-2">
                {errors.phone.message}
              </p>
            )}
            <Input
              type="email"
              placeholder="Email ID"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              label=""
              {...register("email", {
                required: "Email is required is required",
              })}
            />
            {errors.email && (
              <p className=" text-sm text-red-500 mt-2 ml-2">
                {errors.email.message}
              </p>
            )}

            <Input
              type="password"
              placeholder="Set Password"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              label=""
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className=" text-sm text-red-500 mt-2 ml-2">
                {errors.password.message}
              </p>
            )}

            <Input
              type="password"
              placeholder="Confirm Password"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              label=""
              {...register("confirmpassword", {
                required: "Password does not match",
              })}
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Join Team
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="text-xs text-center text-gray-400 mt-4">
          By joining, you agree to Taskora’s Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}
