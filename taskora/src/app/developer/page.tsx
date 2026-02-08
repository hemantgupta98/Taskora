"use client";

import { BackgroundGradient } from "../../ui/background";
import Image from "next/image";

export default function ProjectShowcasePage() {
  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <div className="mx-5 max-w-4xl">
        <div className="flex justify-center md:justify-end ">
          <BackgroundGradient className="rounded-full ">
            <Image
              src="/developer.png"
              alt="Hero Image"
              width={400}
              height={400}
              className="rounded-full "
            />
          </BackgroundGradient>
        </div>
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-gray-900">Taskora</h1>
          <p className="mt-2 max-w-2xl text-gray-600">
            A modern project management platform inspired by Jira, built to
            plan, track, and manage work efficiently across teams and projects.
          </p>
        </div>

        {/* Overview */}
        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            Project Overview
          </h2>
          <p className="leading-relaxed text-gray-700">
            Taskora is a full-stack project management application designed to
            simulate real-world SaaS workflows. The platform focuses on clean
            UI/UX, scalable architecture, and secure authentication, making it
            suitable for managing tasks, boards, timelines, and team
            collaboration in a structured way.
          </p>
        </section>

        {/* Inspiration */}
        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            Inspiration
          </h2>
          <p className="leading-relaxed text-gray-700">
            This project is inspired by Jira’s workflow-driven approach to
            project management. Taskora is built from scratch to deeply
            understand how large-scale task management platforms work, while
            implementing my own design and engineering decisions.
          </p>
        </section>

        {/* Tech Stack */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Tech Stack
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Frontend */}
            <div className="rounded-lg border border-gray-200 p-5">
              <h3 className="mb-2 text-lg font-semibold text-gray-800">
                Frontend
              </h3>
              <ul className="space-y-1 text-gray-700">
                <li>• Next.js (React + TypeScript)</li>
                <li>• Tailwind CSS</li>
                <li>• Shadcn UI & Radix UI</li>
                <li>• React Hook Form + Zod</li>
                <li>• Lucide Icons</li>
              </ul>
            </div>

            {/* Backend */}
            <div className="rounded-lg border border-gray-200 p-5">
              <h3 className="mb-2 text-lg font-semibold text-gray-800">
                Backend
              </h3>
              <ul className="space-y-1 text-gray-700">
                <li>• Node.js & Express.js</li>
                <li>• MongoDB & Mongoose</li>
                <li>• JWT Authentication</li>
                <li>• Bcrypt for password security</li>
                <li>• Nodemailer for email & OTP</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Development Approach */}
        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            Development Approach
          </h2>
          <p className="leading-relaxed text-gray-700">
            Taskora is developed using a clean separation between frontend and
            backend responsibilities. APIs are REST-based, components are
            modular and reusable, and the overall structure follows
            production-level best practices to ensure maintainability,
            scalability, and performance.
          </p>
        </section>

        {/* Developer */}
        <section className="rounded-lg border border-gray-200 bg-gray-50 p-6">
          <h2 className="mb-2 text-xl font-semibold text-gray-900">
            About the Developer
          </h2>
          <p className="leading-relaxed text-gray-700">
            Hi, I’m <span className="font-medium">Hemant Gupta</span>, a
            full-stack developer focused on building real-world, scalable
            applications. Taskora reflects my approach to development—clean
            code, thoughtful architecture, and user interfaces that feel
            intuitive and purposeful.
          </p>
        </section>
      </div>
    </div>
  );
}
