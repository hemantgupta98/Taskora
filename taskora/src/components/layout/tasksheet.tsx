export default function AddTaskSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-end">
      <div className="bg-white w-full rounded-t-3xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">Add Task</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <input
          placeholder="Task title"
          className="w-full h-10 border rounded-lg px-3"
        />

        <textarea
          placeholder="Description"
          className="w-full border rounded-lg px-3 py-2"
        />

        <select className="w-full h-10 border rounded-lg px-3">
          <option>Feature</option>
          <option>Bug</option>
          <option>Improvement</option>
        </select>

        <select className="w-full h-10 border rounded-lg px-3">
          <option>High Priority</option>
          <option>Medium Priority</option>
          <option>Low Priority</option>
        </select>

        <button className="w-full h-11 bg-blue-600 text-white rounded-xl">
          Save to Backlog
        </button>
      </div>
    </div>
  );
}
