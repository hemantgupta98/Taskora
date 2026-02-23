import backlog from "./backlog.model.js";
import { createNotification } from "../notification/notification.service.js";
const allowedFields = [
  "admin",
  "title",
  "description",
  "priority",
  "status",
  "startDate",
  "dueDate",
  "feature",
];

export const createBacklog = async (req, res) => {
  try {
    const data = {};
    for (const key of allowedFields) {
      if (req.body[key] !== undefined) data[key] = req.body[key];
    }

    data.userId = req.user.id;

    const doc = await backlog.create(data);
    await createNotification({
      userId: req.user.id,
      type: "BACKLOG_CREATED",
      title: "Backlog Created",
      message: `You created a backlog "${doc.title}"`,
    });

    return res.status(201).json({ success: true, data: doc });
  } catch (err) {
    const message = err?.message || "Failed to create backlog";
    return res.status(400).json({ success: false, message });
  }
};

export const getBacklog = async (req, res) => {
  try {
    const filter = { userId: req.user.id };
    if (req.query.admin) filter.admin = req.query.admin;

    const list = await backlog.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: list });
  } catch (err) {
    const message = err?.message || "Failed to fetch backlog";
    return res.status(500).json({ success: false, message });
  }
};

export const getBacklogById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await backlog.findOne({ _id: id, userId: req.user.id });
    if (!doc)
      return res
        .status(404)
        .json({ success: false, message: "Backlog not found or unauthorized" });
    return res.status(200).json({ success: true, data: doc });
  } catch (err) {
    const message = err?.message || "Failed to fetch backlog";
    return res.status(400).json({ success: false, message });
  }
};

export const deleteBacklog = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPlan = await backlog.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!deletedPlan) {
      return res.status(404).json({
        success: false,
        message: "backlog not found",
      });
    }

    try {
      await createNotification({
        userId: req.user.id,
        type: "BACKLOG_DELETED",
        title: "Backlog Deleted",
        message: `You deleted a backlog "${deletedPlan.title}"`,
      });
    } catch (notifyErr) {
      console.warn("Backlog notification failed:", notifyErr.message);
    }

    res.status(200).json({
      success: true,
      message: "Backlog deleted successfully",
    });
  } catch (error) {
    console.error("Delete plan error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
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

    const plan = await backlog.findOne({ _id: id, userId: req.user.id });
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Backlog not found or unauthorized",
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
      type: "BACKLOG_UPDATE",
      title: "Backlog Update",
      message: `You updated a backlog "${plan.title}"`,
    });

    return res.status(200).json({
      success: true,
      message: "Plan status updated successfully",
      data: plan,
    });
  } catch (error) {
    console.error("Update status error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update plan status",
    });
  }
};
