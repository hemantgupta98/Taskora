import backlog from "./backlog.model.js";

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

    const doc = await backlog.create(data);
    return res.status(201).json({ success: true, data: doc });
  } catch (err) {
    const message = err?.message || "Failed to create backlog";
    return res.status(400).json({ success: false, message });
  }
};

export const getBacklog = async (req, res) => {
  try {
    const filter = {};
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
    const doc = await backlog.findById(id);
    if (!doc)
      return res
        .status(404)
        .json({ success: false, message: "Backlog not found" });
    return res.status(200).json({ success: true, data: doc });
  } catch (err) {
    const message = err?.message || "Failed to fetch backlog";
    return res.status(400).json({ success: false, message });
  }
};

export const deleteBacklog = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPlan = await backlog.findByIdAndDelete(id);

    if (!deletedPlan) {
      return res.status(404).json({
        success: false,
        message: "backlog not found",
      });
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

    const plan = await backlog.findById(id);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Backlog not found",
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
