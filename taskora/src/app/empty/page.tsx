/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import Image from "next/image";
export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-2xl text-center">
        {/* Illustration */}
        <div className="flex justify-center">
          <img
            src="https://illustrations.popsy.co/white/app-launch.svg"
            alt="Onboarding illustration"
            className="w-[320px] sm:w-95"
          />
        </div>

        {/* Title */}
        <h1 className="mt-8 text-3xl sm:text-4xl font-semibold text-gray-900">
          Welcome to Taskora! Let&apos;s Get Started.
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-gray-500 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
          Taskora helps you manage projects and collaborate with your team
          effectively. Create your first project or import existing data to
          kickstart your journey.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition">
            Create Your First Project
          </button>

          <button className="w-full sm:w-auto border border-gray-300 px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition">
            Import Sample Data
          </button>
        </div>

        {/* Sign in */}
        <p className="mt-8 text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/auth"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign In
          </Link>
        </p>

        {/* Continue */}
        <div className="mt-8">
          <Link
            href="/dashboard"
            className="text-blue-600 text-sm font-medium hover:underline"
          >
            Continue to Dashboard
          </Link>
        </div>
        {/**<div>
          <Image src="/welcome.png" alt="logo" height={500} width={500} />
        </div> */}
      </div>
    </div>
  );
}
