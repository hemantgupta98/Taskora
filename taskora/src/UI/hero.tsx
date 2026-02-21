"use client";

import Dashboard from "./dashboard";

export default function Hero() {
  return (
    <section className="px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      {/* Left Content */}
      <div>
        <span className="inline-block mb-4 px-4 py-1 text-sm bg-blue-100 text-blue-600 rounded-full">
          New • Taskora 2.0 is now live with AI Insights →
        </span>

        <h1 className="text-5xl font-bold leading-tight">
          Master Your Work{" "}
          <span className="text-blue-500 italic">Without the Stress</span>
        </h1>

        <p className="mt-6 text-gray-600 max-w-lg">
          Taskora is the smart management platform that prioritizes your day,
          syncs your team, and turns chaos into clarity.
        </p>

        <div className="mt-8 flex items-center gap-6">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-600 flex items-center gap-2">
            Create Your First Project →
          </button>

          <p className="text-gray-500">
            Already have an account?{" "}
            <span className="text-blue-500 cursor-pointer">Sign In</span>
          </p>
        </div>

        {/* Trusted Logos */}
        <div className="mt-12">
          <p className="text-xs text-gray-400 mb-4">
            TRUSTED BY GLOBAL INNOVATORS
          </p>
          <div className="flex gap-6 opacity-40">
            <div className="w-10 h-6 bg-gray-300 rounded" />
            <div className="w-10 h-6 bg-gray-300 rounded" />
            <div className="w-10 h-6 bg-gray-300 rounded" />
            <div className="w-10 h-6 bg-gray-300 rounded" />
          </div>
        </div>
      </div>

      <Dashboard />
    </section>
  );
}
