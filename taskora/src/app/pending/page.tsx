"use client";
import { useEffect, useState } from "react";
import { api } from "../../lib/socket";
import { Toaster, toast } from "sonner";
import { X } from "lucide-react";

type Data = {
  _id: string;
  admin: string;
  title: string;
  descripition: string;
  priority: string;
  startDate: number;
  assign: string;
  category: string;
  status: string;
  dueDate: number;
  restrict: string;
};

type Section = {
  admin: string;
  tasks: Data[];
};

function groupByAdmin(list: Data[]): Section[] {
  const map = new Map<string, Data[]>();

  for (const t of list) {
    const key = t.admin || "Unassigned";
    const arr = map.get(key) || [];
    arr.push(t);
    map.set(key, arr);
  }

  return Array.from(map.entries()).map(([admin, tasks]) => ({
    admin,
    tasks,
  }));
}

export default function Pending() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState<Data[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await api.get("/task");
        const list: Data[] = res.data.data;
        setPlans(list);
        setSections(groupByAdmin(list));
      } catch (err) {
        console.error("Failed to fetch plans", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }
  const handleDeleteTask = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this?");
    if (!confirmed) return;

    try {
      await api.delete(`/plans/deleteplans/${id}`);

      const updated = plans.filter((t) => t._id !== id);
      setPlans(updated);
      setSections(groupByAdmin(updated));

      toast.success("Plan deleted successfully");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete plan");
    }
  };

  return (
    <div className="mx-auto p-5 mt-5 max-w-5xl rounded-xl shadow-2xl">
      <Toaster position="top-center" richColors />
      {sections.length === 0 && (
        <p className="text-center text-gray-500">No tasks found</p>
      )}

      {sections.map((section) => (
        <div key={section.admin} className="mb-8">
          {/* Admin Header */}
          <h2 className="text-xl font-bold mb-4 text-blue-600">
            Admin: {section.admin}
          </h2>

          {/* Tasks */}
          <div className="space-y-4">
            {section.tasks.map((task) => (
              <div
                key={task._id}
                className="relative p-4 border rounded-lg bg-gray-50 hover:shadow"
              >
                <button
                  type="button"
                  onClick={() => handleDeleteTask(task._id)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                  aria-label="Delete task"
                >
                  <X className="w-4 h-4" />
                </button>
                <h3 className="font-semibold text-lg">{task.title}</h3>

                <p className="text-sm text-gray-600">{task.descripition}</p>

                <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                  <p>
                    <b>Priority:</b> {task.priority}
                  </p>
                  <p>
                    <b>Status:</b> {task.status}
                  </p>
                  <p>
                    <b>Category:</b> {task.category}
                  </p>
                  <p>
                    <b>Assigned:</b> {task.assign}
                  </p>
                  <p>
                    <b>Start:</b> {new Date(task.startDate).toDateString()}
                  </p>
                  <p>
                    <b>Due:</b> {new Date(task.dueDate).toDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
