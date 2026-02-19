"use client";

import Link from "next/link";
import Image from "next/image";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center px-4 ">
      <div className="w-full max-w-2xl text-center mt-20">
        {/* Illustration */}
        <div className="flex justify-center">
          <Image src="/logo.png" alt={"pic"} height={100} width={100} />
        </div>

        {/* Title */}
        <h1 className="mt-8 text-3xl sm:text-4xl font-semibold text-white">
          Welcome to Taskora! Let&apos;s Get Started.
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-white text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
          Taskora helps you manage projects and collaborate with your team
          effectively. Create your first project or import existing data to
          kickstart your journey.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => alert("Login first")}
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition"
          >
            Create Your First Project
          </button>
        </div>
        <div>
          <p className=" text-sm mt-10 text-zinc-400">
            Taskora is a simple and smart task management platform designed to
            help individuals and teams plan, organize, and track their work
            efficiently. It allows users to create tasks, set priorities, assign
            work to team members, and monitor progress in one place.
          </p>
          <p className=" text-sm text-zinc-400 mt-5">
            Taskora focuses on improving productivity, collaboration, and time
            management by giving a clear view of what needs to be done, who is
            responsible, and when tasks are due. It’s especially useful for
            students, developers, and small teams who want an easy way to manage
            daily work without complexity.
          </p>
        </div>

        {/* Sign in */}
        <p className="mt-10 text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/auth"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
