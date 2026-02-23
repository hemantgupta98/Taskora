import mongoose from "mongoose";
import task from "./task.model.js";
import { createNotification } from "../notification/notification.service.js";
const allowedFields = [
  "title",
  "descripition",
  "priority",
  "startDate",
  "assign",
  "category",
  "status",
  "dueDate",
  "restrict",
  "attachment",
];

export const createTask = async (req, res) => {
  try {
    const data = {};
    for (const key of allowedFields) {
      if (req.body[key] !== undefined) data[key] = req.body[key];
    }

    data.userId = req.user.id;

    const doc = await task.create(data);

    try {
      await createNotification({
        userId: req.user.id,
        type: "TASK_CREATED",
        title: "Task Created",
        message: `You created a task "${doc.title}"`,
      });
    } catch (notifyErr) {
      console.warn("Task notification failed:", notifyErr.message);
    }

    return res.status(201).json({ success: true, data: doc });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message || "Failed to create task",
    });
  }
};

export const getTasks = async (req, res) => {
  try {
    const list = await task
      .find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: list });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
    });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task id",
      });
    }

    const doc = await task.findOne({
      _id: id,
      userId: req.user.id,
    });

    if (!doc) {
      return res.status(404).json({
        success: false,
        message: "Task not found or unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      data: doc,
    });
  } catch (err) {
    console.error("Get task error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch task",
    });
  }
};
export const deleteTask = async (req, res) => {
  const deleted = await task.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id,
  });

  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: "Task not found or unauthorized",
    });
  }
  await createNotification({
    userId: req.user.id,
    type: "TASK_DELETED",
    title: "Task Deleted",
    message: `Task "${deleted.title}" was deleted`,
  });
  res.json({ success: true, message: "Task deleted successfully" });
};

export const updateBacklogStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, confirmDone } = req.body;

    if (!["todo", "progress", "done"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const plan = await task.findOne({
      _id: id,
      userId: req.user.id,
    });
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Task not found or unauthorized",
      });
    }

    const today = new Date();
    const due = new Date(plan.dueDate);

    const diffDays = Math.floor(
      (today.getTime() - due.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (status === "done" && diffDays > 1 && !confirmDone) {
      return res.status(200).json({
        success: false,
        confirmRequired: true,
        message:
          "This plan is overdue. If your work is completed, please confirm.",
      });
    }

    plan.status = status;
    await plan.save();

    await createNotification({
      userId: req.user.id,
      type: "TASK_STATUS_UPDATED",
      title: "Task Status Updated",
      message: `Task "${plan.title}" moved to ${status}`,
    });

    return res.status(200).json({
      success: true,
      message: "Pending status updated successfully",
      data: plan,
    });
  } catch (error) {
    console.error("Update status error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update pending status",
    });
  }
};
