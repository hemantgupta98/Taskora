"use client";

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
};

export default function TaskDrawer({
  open,
  onClose,
  task,
}: {
  open: boolean;
  onClose: () => void;
  task: Task | null;
}) {
  if (!open || !task) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
      <div className="w-[420px] bg-white h-full p-6">
        <button onClick={onClose} className="text-gray-500 mb-4">
          ✕ Close
        </button>

        <h2 className="text-xl font-semibold mb-2">{task.title}</h2>

        <p className="text-sm text-gray-600 mb-4">{task.description}</p>

        <span className="inline-block px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded">
          {task.status}
        </span>
      </div>
    </div>
  );
}
