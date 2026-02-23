"use client";

import { notificationConfig } from "./config";
import { api } from "../../lib/api";

type Props = {
  notification: any;
  onDelete: (id: string) => void;
};

export default function NotificationItem({ notification, onDelete }: Props) {
  const config = notificationConfig[notification.type] || {
    icon: "🔔",
    bg: "bg-white",
  };

  const handleDelete = async () => {
    await api.delete(`/notification/${notification._id}`);
    onDelete(notification._id);
  };

  return (
    <div
      className={`flex gap-4 p-4 rounded-xl border mb-3 ${
        notification.isRead ? "bg-white" : config.bg
      }`}
    >
      {/* Icon */}
      <div className="text-2xl mt-1">{config.icon}</div>

      {/* Content */}
      <div className="flex-1">
        <h4 className="font-semibold text-sm">{notification.title}</h4>

        <p className="text-sm text-gray-600">{notification.message}</p>

        <span className="text-xs text-gray-400">
          {new Date(notification.createdAt).toLocaleString()}
        </span>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-end">
        {!notification.isRead && (
          <span className="w-2 h-2 bg-blue-500 rounded-full mb-2" />
        )}

        <button
          onClick={handleDelete}
          className="text-gray-400 hover:text-red-500 text-sm"
          title="Delete notification"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
