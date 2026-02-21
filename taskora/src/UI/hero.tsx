"use client";

import Dashboard from "./dashboard";

export default function Hero() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20 mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      {/* Left Content */}
      <div>
        <span className="inline-block mb-4 px-3 sm:px-4 py-1 text-xs sm:text-sm bg-blue-100 text-blue-600 rounded-full">
          New • Taskora 2.0 is now live with AI Insights →
        </span>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
          Master Your Work{" "}
          <span className="text-blue-500 italic">Without the Stress</span>
        </h1>

        <p className="mt-5 sm:mt-6 text-gray-600 max-w-lg text-sm sm:text-base">
          Taskora is the smart management platform that prioritizes your day,
          syncs your team, and turns chaos into clarity.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <button className="bg-blue-500 text-white px-5 sm:px-6 py-3 rounded-md text-base sm:text-lg hover:bg-blue-600 flex items-center justify-center gap-2 w-full sm:w-auto">
            Create Your First Project →
          </button>

          <p className="text-gray-500 text-sm sm:text-base">
            Already have an account?{" "}
            <span className="text-blue-500 cursor-pointer">Sign In</span>
          </p>
        </div>

        {/* Trusted Logos */}
        <div className="mt-12">
          <p className="text-xs text-gray-400 mb-4">
            TRUSTED BY GLOBAL INNOVATORS
          </p>
          <div className="flex flex-wrap gap-4 sm:gap-6 opacity-40">
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
