"use client";
import { motion } from "framer-motion";
import { BackgroundGradient } from "../../UI/background";
import Image from "next/image";

export default function ProjectShowcasePage() {
  return (
    <div className="min-h-screen  px-6 py-12 ">
      <div className="mx-5 max-w-full">
        <div className="flex justify-center md:justify-center ">
          <motion.div
            initial={{ opacity: 0, y: 50, filter: "blur(20px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 80,
            }}
          >
            <BackgroundGradient className=" rounded-full ">
              <Image
                src="/newOne.png"
                alt="Hero Image"
                width={300}
                height={200}
                className="rounded-full "
              />
            </BackgroundGradient>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(20px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 80,
          }}
        >
          <div className="mb-10 mt-10">
            <h1 className="text-5xl font-semibold text-gray-900 mb-5">
              Taskora
            </h1>
            <p className="mt-2 max-w-4xl text-2xl text-gray-600">
              A modern project management platform inspired by Jira, built to
              plan, track, and manage work efficiently across teams and
              projects.
            </p>
          </div>
        </motion.div>

        {/* Overview */}
        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(20px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 80,
          }}
        >
          <section className="mb-10">
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">
              Project Overview
            </h2>
            <p className="leading-relaxed text-gray-700 text-2xl">
              Taskora is a full-stack project management application designed to
              simulate real-world SaaS workflows. The platform focuses on clean
              UI/UX, scalable architecture, and secure authentication, making it
              suitable for managing tasks, boards, timelines, and team
              collaboration in a structured way.
            </p>
          </section>
        </motion.div>

        {/* Inspiration */}
        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(20px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 80,
          }}
        >
          <section className="mb-10">
            <h2 className="mb-3 text-xl font-semibold text-gray-900">
              Inspiration
            </h2>
            <p className="leading-relaxed text-gray-700 text-2xl">
              This project is inspired by Jira’s workflow-driven approach to
              project management. Taskora is built from scratch to deeply
              understand how large-scale task management platforms work, while
              implementing my own design and engineering decisions.
            </p>
          </section>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(20px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 80,
          }}
        >
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
                <ul className="space-y-1 text-gray-700 text-2xl">
                  <li>• Next.js (React + TypeScript)</li>
                  <li>• Tailwind CSS</li>
                  <li>• Shadcn UI & Radix UI</li>
                  <li>• React Hook Form + Zod</li>
                  <li>• Lucide Icons</li>
                  <li>• socket-io-client</li>
                  <li>• framer Motion</li>
                  <li>• React Bits</li>
                </ul>
              </div>

              {/* Backend */}
              <div className="rounded-lg border border-gray-200 p-5">
                <h3 className="mb-2 text-lg font-semibold text-gray-800">
                  Backend
                </h3>
                <ul className="space-y-1 text-gray-700 text-2xl">
                  <li>• Node.js & Express.js</li>
                  <li>• MongoDB & Mongoose</li>
                  <li>• JWT Authentication</li>
                  <li>• Nodemailer for email & OTP</li>
                  <li>• Google Authentication</li>
                  <li>• GitHub Authentication</li>
                  <li>• web-sockets</li>
                  <li>• Bcrypt for password security</li>
                </ul>
              </div>
            </div>
          </section>
        </motion.div>

        {/* Development Approach */}
        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(20px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 80,
          }}
        >
          <section className="mb-10">
            <h2 className="mb-3 text-xl font-semibold text-gray-900">
              Development Approach
            </h2>
            <p className="leading-relaxed text-gray-700 text-2xl">
              Taskora is developed using a clean separation between frontend and
              backend responsibilities. APIs are REST-based, components are
              modular and reusable, and the overall structure follows
              production-level best practices to ensure maintainability,
              scalability, and performance.
            </p>
          </section>
        </motion.div>

        {/* Developer */}
        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(20px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 80,
          }}
        >
          <section className="rounded-lg border border-gray-200 bg-gray-50 p-6">
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              About the Developer
            </h2>
            <p className="leading-relaxed text-gray-700 text-2xl">
              Hi, I’m{" "}
              <span className=" text-3xl font-semibold text-orange-400">
                Hemant Gupta
              </span>
              , a 2nd-year BCA student at Jharkhand Rai University, Ranchi, and
              a passionate full-stack developer focused on building real-world,
              scalable, and user-centric applications. I enjoy turning ideas
              into reliable software through clean code, thoughtful
              architecture, and intuitive user interfaces. My development
              approach balances strong fundamentals with practical
              problem-solving—writing code that is not just functional, but
              maintainable and purposeful.
            </p>
            <p className=" pt-5 text-2xl text-red-500">
              {" "}
              Through these roles, I’ve learned how real production systems are
              built—collaboration with teams, writing scalable features,
              debugging complex issues, and shipping reliable code under real
              constraints.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
