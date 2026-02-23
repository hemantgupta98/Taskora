import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: [
        "TASK_CREATED",
        "TASK_DELETED",
        "TASK_UPDATE",
        "PLAN_CREATED",
        "PLAN_DELETED",
        "PLAN_UPDATE",
        "BACKLOG_CREATED",
        "BACKLOG_DELETED",
        "BACKLOG_UPDATE",
        "GITHUB_CONNECTED",
        "INVITE_SEND",
      ],
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Notification = mongoose.model("Notification", notificationSchema);
