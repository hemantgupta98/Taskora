import mongoose from "mongoose";

const createTask = new mongoose.Schema(
  {
    admin: { type: String, required: true },
    title: { type: String, required: true },
    descripition: { type: String, required: true },
    priority: { type: String, required: true },
    startDate: { type: Number, required: true },
    assign: { type: String, required: true },
    category: { type: String, required: true },
    status: {
      type: String,
      enum: ["todo", "progress", "done"],
      default: "todo",
    },
    dueDate: { type: Number, required: true },
    restrict: { type: String, required: true },
    attachment: { type: String, required: false, default: "" },
  },
  { timestamps: true },
);

const task = mongoose.model("createTask", createTask);

export default task;
