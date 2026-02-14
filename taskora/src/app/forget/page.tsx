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
import { useState, useEffect } from "react";

type Input = {
  email: string;
  password: string;
  confirmPassword: string;
  otp?: string;
};

export default function AuthForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = async (data) => {
    const { password, confirmPassword } = data;

    if (mode === "reset" && password !== confirmPassword) {
      toast.error("Password does not match");
      return;
    }

    try {
      let url = "";
      let payload = {};

      if (mode === "send") {
        url = "http://localhost:5000/api/auth/otp";
        payload = { email: data.email };
      }

      if (mode === "otp") {
        url = "http://localhost:5000/api/auth/verifyotp";
        payload = { email: data.email, otp };
      }

      if (mode === "reset") {
        url = "http://localhost:5000/api/auth/resetpassword";
        payload = {
          email: data.email,
          otp,
          newPassword: password,
          confirmPassword: confirmPassword,
        };
      }

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Something went wrong");
        return;
      }

      if (mode === "send") {
        toast.success("OTP sent successfully");
        setMode("otp");
      }

      if (mode === "otp") {
        toast.success("OTP verified");
        setMode("reset");
      }

      if (mode === "reset") {
        toast.success("Password reset successful");
        setResetSuccess(true);
        reset();
      }
    } catch (err) {
      toast.error("Server error");
      console.log(err);
    }
  };

  type Mode = "send" | "otp" | "reset";
  const [mode, setMode] = useState<Mode>("send");
  const [otp, setOtp] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  const router = useRouter();
  useEffect(() => {
    if (!resetSuccess) return;

    const timer = setTimeout(() => {
      router.push("/auth");
    }, 2000);

    return () => clearTimeout(timer);
  }, [resetSuccess, router]);

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
          <p className="text-gray-500 mb-6">
            Enter your email and we we&apos;ll send otp to reset your password
          </p>
          <Toaster position="top-center" richColors />
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

            {mode === "send" && (
              <button
                type="submit"
                className="w-full bg-blue-500 text-white cursor-pointer py-3 rounded-lg font-semibold"
              >
                Send OTP
              </button>
            )}
            {mode === "otp" && (
              <div className="space-y-5">
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={4}
                    value={otp}
                    onChange={(value) => setOtp(value)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <button
                  type="submit"
                  disabled={otp.length !== 4}
                  className="w-full bg-blue-500 cursor-pointer disabled:opacity-50 text-white py-3 rounded-lg font-semibold"
                >
                  Verify OTP
                </button>
              </div>
            )}

            {mode === "reset" && (
              <>
                <Input
                  icon={<Lock size={18} />}
                  placeholder="New password"
                  type="password"
                  {...register("password", { required: true })}
                />

                <Input
                  icon={<Lock size={18} />}
                  placeholder="Re-type password"
                  type="password"
                  {...register("confirmPassword", { required: true })}
                />

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-3 cursor-pointer rounded-lg font-semibold"
                >
                  Submit
                </button>
              </>
            )}
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
