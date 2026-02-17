import mongoose from "mongoose";

const createBacklog = new mongoose.Schema(
  {
    admin: { type: String, required: true },
    title: { type: String, required: true },
    descripition: { type: String, required: true },
    priority: { type: String, required: true },
    feature: { type: String, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true },
);

const backlog = mongoose.model("createBacklog", createBacklog);

export default backlog;
