import mongoose from "mongoose";

const createBacklog = new mongoose.Schema(
  {
    admin: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Number, required: true },
    dueDate: { type: Number, required: true },
    priority: { type: String, required: true },
    feature: { type: String, required: true },
    status: {
      type: String,
      enum: ["todo", "progress", "done"],
      default: "todo",
    },
  },
  { timestamps: true },
);

const backlog = mongoose.model("createBacklog", createBacklog);

export default backlog;
