"use client";

import { useEffect, useState } from "react";
import NotificationItem from "./item";
import { api } from "../../lib/api";

export default function NotificationList() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/notification").then((res) => {
      setNotifications(res.data.data);
      setLoading(false);
    });
  }, []);

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n._id !== id));
  };

  const handleDeleteAll = async () => {
    await api.delete("/notification");
    setNotifications([]);
  };

  if (loading) {
    return <p>Loading notifications...</p>;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Notifications</h2>

        {notifications.length > 0 && (
          <button
            onClick={handleDeleteAll}
            className="text-sm text-red-500 hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Empty State */}
      {notifications.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          <p className="text-lg">🔕</p>
          <p>No notifications yet</p>
        </div>
      )}

      {/* List */}
      <div className="max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
        {notifications.map((n) => (
          <NotificationItem
            key={n._id}
            notification={n}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
