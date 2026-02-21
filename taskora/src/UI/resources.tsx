"use client";

import React from "react";

export default function ResourcesPage() {
  return (
    <main className="bg-white text-gray-900">
      {/* ================= NAVBAR ================= */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 font-semibold text-lg">
            <div className="w-8 h-8 bg-blue-500 rounded-md" />
            SiteForge
          </div>

          <nav className="hidden md:flex gap-6 text-sm text-gray-600">
            <span>Product</span>
            <span>Resources</span>
            <span>Company</span>
            <span>Pricing</span>
          </nav>

          <div className="flex gap-4 items-center">
            <span className="text-sm text-gray-600">Log in</span>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="px-6 py-20 text-center max-w-3xl mx-auto">
        <span className="text-xs px-3 py-1 bg-gray-100 rounded-full">
          Resource Center
        </span>

        <h1 className="mt-6 text-4xl font-bold">
          Everything you need to build{" "}
          <span className="text-blue-500">faster</span>
        </h1>

        <p className="mt-4 text-gray-600">
          Access our comprehensive documentation, active community forums, and
          direct support channels to unlock the full potential of SiteForge.
        </p>

        <input
          className="mt-8 w-full border rounded-lg px-4 py-3 text-sm"
          placeholder="Search for documentation, components, or tutorials..."
        />

        <p className="mt-4 text-xs text-gray-500">
          Popular: API Auth · Next.js Integration · Custom Domains · CSS
          Variables
        </p>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-2xl font-semibold">Browse by Category</h2>
              <p className="text-gray-600 text-sm mt-1">
                Curated resources for every development stage.
              </p>
            </div>
            <button className="text-sm border px-4 py-2 rounded-md">
              View All Resources →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Documentation",
              "Help Center",
              "Community",
              "Status & Health",
            ].map((title) => (
              <div
                key={title}
                className="bg-white p-6 rounded-xl border hover:shadow-sm"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg mb-4" />
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Helpful guides and tools to support your workflow.
                </p>
                <span className="mt-4 inline-block text-blue-500 text-sm">
                  Explore →
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STATUS + QUICK START ================= */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="font-semibold text-lg">System Status</h3>
            <p className="text-sm text-gray-600 mt-2">
              Real-time operational tracking.
            </p>

            <div className="mt-6 border rounded-lg p-4 text-sm">
              <p className="font-medium text-green-600">
                All Systems Operational
              </p>
              <p className="text-gray-500 mt-1">
                API Latency: 42ms · Uptime: 99.99%
              </p>
            </div>
          </div>

          <div className="border rounded-xl p-6 bg-gray-900 text-white">
            <p className="text-sm mb-4">Quick Start</p>
            <pre className="text-xs bg-black/40 p-4 rounded-lg overflow-x-auto">
              {`npm install @siteforge/sdk

import { createClient } from "@siteforge/sdk";

const client = createClient({ apiKey: "sk_live_xxx" });
`}
            </pre>
          </div>
        </div>
      </section>

      {/* ================= GUIDE CTA ================= */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto bg-blue-50 rounded-2xl p-12 flex flex-col md:flex-row justify-between items-center">
          <div>
            <span className="text-xs bg-blue-100 px-3 py-1 rounded-full">
              New Guide
            </span>
            <h3 className="mt-4 text-2xl font-semibold">
              Mastering Dynamic Rendering with SiteForge Edge
            </h3>
            <p className="mt-2 text-gray-600 max-w-xl">
              Learn how to deliver personalized, sub-second page loads without
              complex infrastructure.
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex gap-4">
            <button className="bg-blue-500 text-white px-5 py-2 rounded-md">
              Read Full Guide
            </button>
            <button className="border px-5 py-2 rounded-md">
              Browse Tutorials
            </button>
          </div>
        </div>
      </section>

      {/* ================= SUPPORT ================= */}
      <section className="px-6 py-16 border-t">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <h4 className="font-semibold">Technical Support</h4>
            <p className="mt-2 text-gray-600">
              Get help from our engineering team.
            </p>
            <span className="text-blue-500">Open a Ticket</span>
          </div>

          <div>
            <h4 className="font-semibold">Security & Privacy</h4>
            <p className="mt-2 text-gray-600">
              Learn about encryption and compliance.
            </p>
            <span className="text-blue-500">Security Hub</span>
          </div>

          <div>
            <h4 className="font-semibold">Open Source</h4>
            <p className="mt-2 text-gray-600">
              Explore our GitHub repositories.
            </p>
            <span className="text-blue-500">GitHub Organization</span>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="px-6 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-10 text-sm">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-semibold">
              <div className="w-7 h-7 bg-blue-500 rounded-md" />
              SiteForge
            </div>
            <p className="mt-3 text-gray-600">
              Empowering creators with minimal design tools and robust
              infrastructure.
            </p>
          </div>

          {["Product", "Resources", "Company", "Social"].map((col) => (
            <div key={col}>
              <h5 className="font-semibold mb-3">{col}</h5>
              <ul className="space-y-2 text-gray-600">
                <li>Link</li>
                <li>Link</li>
                <li>Link</li>
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-xs text-gray-500">
          © 2026 SiteForge Inc. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
