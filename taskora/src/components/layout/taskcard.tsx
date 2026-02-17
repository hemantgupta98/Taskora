type Task = {
  title: string;
  description: string;
  type: string;
  priority: string;
  due?: string;
  estimate?: string;
  assignee?: string;
};

export default function TaskCard({
  task,
  onDelete,
}: {
  task: Task;
  onDelete?: () => void;
}) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border">
      <div className="flex justify-between items-start">
        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
          {task.type}
        </span>
        <span className="text-slate-400">
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="text-red-500 text-xs hover:underline"
            >
              Delete
            </button>
          )}
        </span>
      </div>

      <h3 className="mt-2 font-semibold text-slate-900">{task.title}</h3>

      <p className="text-sm text-slate-600 mt-1 line-clamp-2">
        {task.description}
      </p>

      <div className="flex flex-wrap gap-3 mt-3 text-xs text-slate-500">
        {task.estimate && <span>⏱ {task.estimate}</span>}
        {task.due && <span>📅 {task.due}</span>}
        {task.assignee && <span>👤 {task.assignee}</span>}
      </div>
    </div>
  );
}
