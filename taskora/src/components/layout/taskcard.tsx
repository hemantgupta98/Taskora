type Task = {
  title: string;
  description: string;
  type: string;
  priority: string;

  estimate: string;
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
    <div className="bg-white  p-4 rounded-2xl border shadow-2xl ">
      <div className="flex justify-between items-start">
        <p>
          Feature :{" "}
          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
            {task.type}
          </span>
        </p>
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
      <span className=" mt-2 mb-2">
        {task.assignee && <span>👤 {task.assignee}</span>}
      </span>

      <h3 className="mt-2  text-sm text-slate-500">
        {" "}
        Title:{" "}
        <span className="font-semibold text-slate-900 ">
          {" "}
          {task.title}
        </span>{" "}
      </h3>
      {task.description && (
        <p className="mt-1 text-sm text-slate-600">
          Descripition: {task.description}
        </p>
      )}

      <div className="flex flex-wrap gap-3 mt-3 text-sm text-slate-500">
        {task.estimate && <span>Progress: {task.estimate}</span>}

        {task.priority && <span>Priority: {task.priority}</span>}
      </div>
    </div>
  );
}
