"use client";

import React from "react";

type Feature = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

export default function FeaturesPage() {
  const features: Feature[] = [
    {
      title: "Instant Organization",
      description:
        "Import your data from Trello, Asana, or Excel in seconds. Our smart mapper handles the heavy lifting so you can start working.",
      icon: "⚡",
    },
    {
      title: "AI-Driven Focus",
      description:
        "Our proprietary algorithm analyzes deadlines and dependencies to highlight exactly what you should work on next.",
      icon: "🧠",
    },
    {
      title: "Seamless Collaboration",
      description:
        "Live cursors, contextual threading, and instant notifications keep your team aligned without the constant 'quick syncs'.",
      icon: "👥",
    },
    {
      title: "Advanced Reporting",
      description:
        "Visualize bottleneck issues before they become delays with real-time velocity charts and resource heatmaps.",
      icon: "📊",
    },
    {
      title: "Customizable Views",
      description:
        "Switch between Kanban boards, Gantt charts, List views, and Calendar mode with a single click.",
      icon: "🗂️",
    },
    {
      title: "Goal Tracking",
      description:
        "Connect daily tasks to high-level quarterly objectives. See exactly how every action contributes to the big picture.",
      icon: "🎯",
    },
  ];

  return (
    <main className="min-h-screen bg-white px-6 py-24">
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900">
          Built for modern workflows
        </h1>
        <p className="mt-4 text-gray-600 text-lg">
          Stop juggling tools. Taskora centralizes your strategy, communication,
          and execution in one beautiful space.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white border rounded-xl p-8 shadow-sm hover:shadow-md transition"
          >
            {/* Icon */}
            <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg text-xl">
              {feature.icon}
            </div>

            {/* Title */}
            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="mt-3 text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
