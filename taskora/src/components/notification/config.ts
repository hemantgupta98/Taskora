export const notificationConfig: Record<
  string,
  { icon: string; bg: string }
> = {
  TASK_CREATED: {
    icon: "📝",
    bg: "bg-blue-50",
  },
  TASK_DELETED: {
    icon: "🗑️",
    bg: "bg-red-50",
  },
  TASK_STATUS_UPDATED: {
    icon: "🔄",
    bg: "bg-yellow-50",
  },
  PLAN_CREATED: {
    icon: "🗺️",
    bg: "bg-green-50",
  },
  GITHUB_CONNECTED: {
    icon: "🔗",
    bg: "bg-gray-50",
  },
};