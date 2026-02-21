"use client";

import Image from "next/image";
import { Toaster, toast } from "sonner";

export default function CallToActionPage() {
  return (
    <main className="bg-white ">
      {/* ================= CTA SECTION ================= */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto bg-blue-500 rounded-2xl sm:rounded-3xl px-5 sm:px-8 lg:px-10 py-12 sm:py-16 lg:py-20 text-center text-white shadow-lg relative overflow-hidden">
          {/* Decorative Circle */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-20 h-20 sm:w-32 sm:h-32 border border-white/20 rounded-full" />

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Ready to boost your productivity?
          </h2>

          <p className="mt-4 text-base sm:text-lg text-white/90 max-w-2xl mx-auto">
            Join 50,000+ teams who have already simplified their day with
            Taskora. No credit card required to start.
          </p>
          <Toaster position="top-center" richColors />
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => toast.warning("work on progress")}
              className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
            >
              Start Your 14-Day Trial
            </button>
            <button
              onClick={() => toast.warning("work on progress")}
              className="bg-white/20 text-white px-8 py-3 rounded-md font-semibold hover:bg-white/30 transition"
            >
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="logo"
                height={42}
                width={42}
                className="sm:h-[50px] sm:w-[50px]"
              />
              <span className="text-xl font-semibold text-gray-900">
                Taskora
              </span>
            </div>

            <p className="mt-4 text-gray-600 max-w-sm">
              Empowering teams to achieve more through intelligent task
              management and effortless collaboration.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-2 text-gray-600">
              <li>Features</li>
              <li>Integrations</li>
              <li>Enterprise</li>
              <li>Pricing</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-600">
              <li>Documentation</li>
              <li>Help Center</li>
              <li>Community</li>
              <li>API Status</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-2 text-gray-600">
              <li>About Us</li>
              <li>Careers</li>
              <li>Legal</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-6xl mx-auto mt-10 sm:mt-12 pt-6 border-t flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
          <p>© 2026 Taskora Inc. All rights reserved.</p>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <span className="hover:text-gray-700 cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-gray-700 cursor-pointer">
              Terms of Service
            </span>
            <span className="hover:text-gray-700 cursor-pointer">
              Cookie Policy
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
