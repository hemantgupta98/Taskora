"use client";

import { useState } from "react";
import StatusBadge from "../../components/layout/StatusBadge";
import TypeBadge from "../../components/layout/typebadge";
import Github from "../../components/layout/github";

type Contact = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  type: "Lead" | "Customer";
  status: "Active" | "Inactive" | "New";
};

const contacts: Contact[] = [
  {
    id: 1,
    name: "Thabo Isaac",
    email: "thabo-isaac355@bellsouth.biz",
    createdAt: "Oct 2, 2021",
    type: "Lead",
    status: "Inactive",
  },
  {
    id: 2,
    name: "Sergio Koch",
    email: "sergiokoch@me.info",
    createdAt: "Apr 15, 2020",
    type: "Lead",
    status: "Active",
  },
  {
    id: 3,
    name: "Masao Peter",
    email: "masaopeter586@freenet.info",
    createdAt: "Jun 3, 2021",
    type: "Customer",
    status: "Active",
  },
];

export default function ContactsTable() {
  const [activeTab, setActiveTab] = useState<"All" | "Leads" | "Customers">(
    "All",
  );
  const [open, setOpen] = useState(true);

  const filteredContacts = contacts.filter((c) => {
    if (activeTab === "Leads") return c.type === "Lead";
    if (activeTab === "Customers") return c.type === "Customer";
    return true;
  });
  const loginWithGithub = () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
    window.location.href = `${API_URL}/api/github/login`;
  };
  return (
    <main className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-5">
        {/* Header */}
        <div onClick={loginWithGithub}>
          <Github open={open} onClose={() => setOpen(false)} />
        </div>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-gray-900">Contacts</h1>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search by name or email..."
              className="w-64 rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />

            <button className="rounded-md bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700">
              Add person
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-4">
          {["All", "Leads", "Customers"].map((tab) => (
            <button
              key={tab}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onClick={() => setActiveTab(tab as any)}
              className={`rounded-md px-4 py-2 text-sm font-medium ${
                activeTab === tab
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}

          <button className="ml-2 rounded-md border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
            Filter
          </button>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50">
              <tr className="text-left text-sm text-gray-500">
                <th className="px-4 py-3">
                  <input type="checkbox" />
                </th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Created at</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredContacts.map((contact) => (
                <tr
                  key={contact.id}
                  className="border-t text-sm text-gray-700 hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <input type="checkbox" />
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {contact.name}
                  </td>
                  <td className="px-4 py-3">{contact.email}</td>
                  <td className="px-4 py-3">{contact.createdAt}</td>
                  <td className="px-4 py-3">
                    <TypeBadge type={contact.type} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={contact.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
