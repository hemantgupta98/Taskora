"use client";
import AuthForm from "../../components/ui/AuthForm";
import Image from "next/image";
import { motion } from "motion/react";

export default function Auth() {
  return (
    <>
      <div className=" min-h-screen flex items-center justify-center p-6  dark:bg-slate-900">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-5xl w-full grid md:grid-cols-2 overflow-hidden">
          {/* Left Illustration */}
          <motion.div
            initial={{ opacity: 0, y: 0, x: -100 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 80,
              duration: 5,
              delay: 1,
            }}
            className="hidden md:flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-700 dark:to-slate-600 p-10"
          >
            <div>
              <Image src="/logo.png" alt="logo" height={50} width={50} />
            </div>
            {/*<button
            onClick={() => router.push("/main")}
            className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90"
          >
            Continue to Dashboard →
          </button>*/}
          </motion.div>
          {/**right Illustration */}
          <motion.div
            initial={{ opacity: 0, y: 0, x: 100 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 80,
              duration: 5,
              delay: 1,
            }}
          >
            <AuthForm />
          </motion.div>
        </div>
      </div>
      <footer className="text-center text-xs text-gray-400 py-4 border-t">
        © 2026 Taskora. All rights reserved.
      </footer>
    </>
  );
}
