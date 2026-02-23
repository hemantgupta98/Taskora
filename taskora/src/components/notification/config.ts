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
  TASK_UPDATE: {
    icon: "🔄",
    bg: "bg-yellow-50",
  },
  PLAN_CREATED: {
    icon: "🗺️",
    bg: "bg-green-50",
  },
  PLAN_DELETED: {
    icon: "🧹",
    bg: "bg-red-50",
  },
  PLAN_UPDATE: {
    icon: "📌",
    bg: "bg-yellow-50",
  },
  BACKLOG_CREATED: {
    icon: "📥",
    bg: "bg-blue-50",
  },
  BACKLOG_DELETED: {
    icon: "🗑️",
    bg: "bg-red-50",
  },
  BACKLOG_UPDATE: {
    icon: "📤",
    bg: "bg-yellow-50",
  },
  GITHUB_CONNECTED: {
    icon: "🔗",
    bg: "bg-gray-50",
  },
  INVITE_SEND: {
    icon: "✉️",
    bg: "bg-purple-50",
  },
};