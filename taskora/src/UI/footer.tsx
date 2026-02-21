"use client";

import React from "react";

export default function CallToActionPage() {
  return (
    <main className="bg-white">
      {/* ================= CTA SECTION ================= */}
      <section className="px-6 py-24">
        <div className="max-w-5xl mx-auto bg-blue-500 rounded-3xl px-10 py-20 text-center text-white shadow-lg relative overflow-hidden">
          {/* Decorative Circle */}
          <div className="absolute top-6 right-6 w-32 h-32 border border-white/20 rounded-full" />

          <h2 className="text-4xl font-bold">
            Ready to boost your productivity?
          </h2>

          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
            Join 50,000+ teams who have already simplified their day with
            Taskora. No credit card required to start.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition">
              Start Your 14-Day Trial
            </button>
            <button className="bg-white/20 text-white px-8 py-3 rounded-md font-semibold hover:bg-white/30 transition">
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t px-6 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-md" />
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
        <div className="max-w-6xl mx-auto mt-12 pt-6 border-t flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
          <p>© 2024 Taskora Technologies Inc. All rights reserved.</p>

          <div className="flex gap-6">
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
