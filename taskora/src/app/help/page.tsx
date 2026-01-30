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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

export default function HelpPage() {
  const items = [
    {
      value: "notifications",
      trigger: "Notification Settings",
      content:
        "Manage how you receive notifications. You can enable email alerts for updates or push notifications for mobile devices.",
    },
    {
      value: "privacy",
      trigger: "Privacy & Security",
      content:
        "Control your privacy settings and security preferences. Enable two-factor authentication, manage connected devices, review active sessions, and configure data sharing preferences. You can also download your data or delete your account.",
    },
    {
      value: "billing",
      trigger: "Billing & Subscription",
      content:
        "View your current plan, payment history, and upcoming invoices. Update your payment method, change your subscription tier, or cancel your subscription.",
    },
  ];
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto  w-full rounded-2xl h-fit bg-white p-8 shadow">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center">
          <div className="flex-1">
            <h1 className="text-6xl font-bold text-slate-800">
              Help & Support
            </h1>
            <p className="mt-2 ml-2 text-2xl text-slate-600">
              How can we assist you today?
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid gap-4 sm:grid-cols-2   text-xl">
              <Card icon={<QuestionMarkCircleIcon />} title="FAQs" />
              <Card icon={<RocketLaunchIcon />} title="Getting Started" />
              <Card icon={<CreditCardIcon />} title="Account & Billing" />
              <Card icon={<WrenchScrewdriverIcon />} title="Troubleshooting" />
            </div>

            <div className="rounded-xl border p-6">
              <h2 className="mb-1 text-2xl font-semibold text-slate-800">
                Popular Articles
              </h2>
              <p className="mb-4 text-xl text-slate-500">
                Quick answers to common questions
              </p>
              <Accordion
                type="multiple"
                className="max-w-xl "
                defaultValue={["notifications"]}
              >
                {items.map((item) => (
                  <AccordionItem key={item.value} value={item.value}>
                    <AccordionTrigger>{item.trigger}</AccordionTrigger>
                    <AccordionContent>{item.content}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          <div className="space-y-6 rounded-xl bg-blue-50 p-6">
            <h3 className="text-2xl font-semibold text-slate-800">
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
              <p className="mb-3 text-md text-slate-600">
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
        <h4 className="font-semibold text-slate-800 text-2xl">{title}</h4>
        <p className="text-md text-slate-500">{desc}</p>
      </div>
    </div>
  );
}
