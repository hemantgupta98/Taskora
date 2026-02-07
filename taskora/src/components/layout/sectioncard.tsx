import { ReactNode } from "react";

export default function SectionCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-sm font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}
