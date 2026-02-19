"use client";

import { Mail, Lock, User2Icon } from "lucide-react";
import SocialButton from "./SocailButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { forwardRef } from "react";

type FormData = {
  name?: string;
  email: string;
  password: string;
};

export default function AuthForm() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const { register, handleSubmit, reset } = useForm<FormData>();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log("FORM DATA 👉", data);

    try {
      const url =
        mode === "signup"
          ? "http://localhost:5000/api/auth/signup"
          : "http://localhost:5000/api/auth/login";

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

      toast.success(
        mode === "signup" ? "Account created successfully" : "Login successful",
      );

      reset();
      router.push("/dashboard");
    } catch (error) {
      console.error("AUTH ERROR 👉", error);
      toast.error("Server error. Please try again.");
    }
  };
  const loginWithGoogle = () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
    window.location.href = `${API_URL}/api/auth/google`;
  };
  const loginWithGithub = () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
    window.location.href = `${API_URL}/api/github/login`;
  };

  return (
    <div className="p-8 sm:p-12">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-6">
        <Image src="/logo.png" alt="logo" height={50} width={50} />
        <span className="font-semibold text-lg text-blue-600">Taskora</span>
      </div>

      <h2 className="text-2xl font-bold mb-2">Welcome to Taskora</h2>
      <p className="text-gray-500 mb-6">
        Your ultimate project management solution.
      </p>

      {/* Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setMode("login")}
          className={`flex-1 py-2 rounded-lg font-medium ${
            mode === "login" ? "bg-blue-500 text-white" : "border"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setMode("signup")}
          className={`flex-1 py-2 rounded-lg font-medium ${
            mode === "signup" ? "bg-blue-500 text-white" : "border"
          }`}
        >
          Sign Up
        </button>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {mode === "signup" && (
          <Input
            icon={<User2Icon size={18} />}
            placeholder="Name"
            type="text"
            {...register("name", { required: true })}
          />
        )}

        <Input
          icon={<Mail size={18} />}
          placeholder="Email"
          type="email"
          {...register("email", { required: true })}
        />

        <Input
          icon={<Lock size={18} />}
          placeholder="Password"
          type="password"
          {...register("password", { required: true })}
        />

        {mode === "login" && (
          <div
            onClick={() => router.push("/forget")}
            className="text-right text-sm text-blue-500 cursor-pointer"
          >
            Forgot Password?
          </div>
        )}

        <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold">
          {mode === "login" ? "Login" : "Create Account"}
        </button>
      </form>

      <Toaster position="top-center" richColors />

      {/* Divider */}
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-sm text-gray-400">OR</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Social */}
      <div className="grid grid-cols-2 gap-4">
        <SocialButton label="Google" onClick={loginWithGoogle} />
        <SocialButton label="GitHub" onClick={loginWithGithub} />
      </div>
    </div>
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
