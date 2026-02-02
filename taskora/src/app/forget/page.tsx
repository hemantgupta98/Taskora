"use client";
import { Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { FaAngleDoubleLeft } from "react-icons/fa";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../components/ui/otp";

type Input = {
  email: string;
  password: string;
  rePassword: string;
};

export default function AuthForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = (data) => {
    console.log(data);
    reset();
    if (data.email && data.password && data.rePassword) {
      toast.success("Successfully created");
    }
  };

  const router = useRouter();

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center px-4">
        <div className="p-8 sm:p-12 w-full sm:w-105 lg:w-1/3  rounded-2xl shadow-2xl overflow-hidden">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            <div>
              <Image src="/logo.png" alt="logo" height={50} width={50} />
            </div>
            <span className="font-semibold text-lg text-blue-600">Taskora</span>
          </div>

          <h2 className="text-2xl font-bold mb-2">Forget Our Password</h2>
          <p className="text-gray-500 mb-6">Hold it</p>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
              icon={<Mail size={18} />}
              placeholder="Enter your gmail"
              type="email"
              {...register("email", {
                required: "Enter your valid email",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a new password",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 ml-1">
                {errors.email.message}
              </p>
            )}

            <InputOTP maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <Input
              icon={<Lock size={18} />}
              placeholder="New password"
              type="password"
              {...register("password", {
                required: "Enter your new password",
                pattern: {
                  value: /^[A-Za-z]{1,10}$/,
                  message: "Enter a new password",
                },
                minLength: 4,
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1 ml-1">
                {errors.password.message}
              </p>
            )}
            <Input
              icon={<Lock size={18} />}
              placeholder="Re-type password"
              type="password"
              {...register("rePassword", {
                required: "Password not match",
                pattern: {
                  value: /^[A-Za-z]{1,10}$/,
                  message: "Password must be 1–10 letters only",
                },
                minLength: 4,
              })}
            />
            {errors.rePassword && (
              <p className="text-red-500 text-sm mt-1 ml-1">
                {errors.rePassword.message}
              </p>
            )}

            <Toaster position="top-center" expand={false} richColors />
            <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold cursor-pointer">
              Submit
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social */}
          <div
            onClick={() => router.push("/auth")}
            className=" cursor-pointer gap-2 flex justify-center text-gray-500"
          >
            <FaAngleDoubleLeft className="mt-1.5" />
            Login
          </div>
        </div>
      </div>
    </>
  );
}
{
  /**Impot this when you use input tag */
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
