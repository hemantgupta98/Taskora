"use client";
import { Mail, Lock, User2Icon } from "lucide-react";
import SocialButton from "./SocailButton";
import { useState } from "react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type Input = {
  name: string;
  password: string;
  email: string;
};

export default function AuthForm() {
  const [mode, setMode] = useState<"login" | "signup" | "forget">("login");
  const { register, handleSubmit, reset } = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = (data) => {
    console.log(data);
    reset();
  };

  const router = useRouter();

  return (
    <div className="p-8 sm:p-12">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-6">
        <div>
          <Image src="/logo.png" alt="logo" height={50} width={50} />
        </div>
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
          className={`flex-1 py-2 rounded-lg font-medium cursor-pointer ${
            mode === "login" ? "bg-blue-500 text-white" : "border"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setMode("signup")}
          className={`flex-1 py-2 rounded-lg font-medium cursor-pointer ${
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
            type="name"
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
          <div className="text-right text-sm text-blue-500 cursor-pointer">
            Forgot Password?
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold cursor-pointer"
        >
          {mode === "login" ? "Submit" : "Create Account"}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-sm text-gray-400">OR</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Social */}
      <div className="grid grid-cols-2 gap-4 cursor-pointer ">
        <SocialButton label="Google" />
        <SocialButton label="GitHub" />
      </div>
    </div>
  );
}

function Input({
  icon,
  ...props
}: {
  icon: React.ReactNode;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="flex items-center gap-3 border rounded-lg px-4 py-3">
      <span className="text-gray-400">{icon}</span>
      <input {...props} className="w-full outline-none text-sm" />
    </div>
  );
}
