import { JSX } from "react";
import {
  ChatBubbleLeftRightIcon,
  QuestionMarkCircleIcon,
  RocketLaunchIcon,
  CreditCardIcon,
  WrenchScrewdriverIcon,
  EnvelopeIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto  w-full rounded-2xl h-fit bg-white p-8 shadow">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-slate-800">
              Help & Support
            </h1>
            <p className="mt-2 text-slate-600">How can we assist you today?</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <Card icon={<QuestionMarkCircleIcon />} title="FAQs" />
              <Card icon={<RocketLaunchIcon />} title="Getting Started" />
              <Card icon={<CreditCardIcon />} title="Account & Billing" />
              <Card icon={<WrenchScrewdriverIcon />} title="Troubleshooting" />
            </div>

            <div className="rounded-xl border p-6">
              <h2 className="mb-1 text-xl font-semibold text-slate-800">
                Popular Articles
              </h2>
              <p className="mb-4 text-sm text-slate-500">
                Quick answers to common questions
              </p>
              <ul className="divide-y">
                {[
                  "How to Reset Your Password",
                  "Setting Up Your Account",
                  "Managing Your Subscription",
                  "Fixing Connection Issues",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex cursor-pointer items-center justify-between py-3 text-slate-700 hover:text-blue-600"
                  >
                    <span>{item}</span>
                    <ArrowRightIcon className="h-4 w-4" />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6 rounded-xl bg-blue-50 p-6">
            <h3 className="text-xl font-semibold text-slate-800">
              Need More Help?
            </h3>

            <ActionCard
              icon={<ChatBubbleLeftRightIcon />}
              title="Live Chat"
              desc="Chat with us"
            />

            <ActionCard
              icon={<EnvelopeIcon />}
              title="Contact Us"
              desc="Send us a message"
            />

            <div className="pt-4 text-center">
              <p className="mb-3 text-sm text-slate-600">
                Can&apos;t find what you&apos;re looking for?
              </p>
              <button className="rounded-full bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
                Go to Help Center
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ icon, title }: { icon: JSX.Element; title: string }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border p-4 shadow-sm hover:shadow transition">
      <div className="h-10 w-10 text-blue-600">{icon}</div>
      <span className="font-medium text-slate-800">{title}</span>
    </div>
  );
}

function ActionCard({
  icon,
  title,
  desc,
}: {
  icon: JSX.Element;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-white p-4 shadow">
      <div className="h-10 w-10 text-blue-600">{icon}</div>
      <div>
        <h4 className="font-semibold text-slate-800">{title}</h4>
        <p className="text-sm text-slate-500">{desc}</p>
      </div>
    </div>
  );
}
