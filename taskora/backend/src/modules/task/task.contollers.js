import task from "./task.model.js";

const allowedFields = [
  "admin",
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

    const doc = await task.create(data);
    return res.status(201).json({ success: true, data: doc });
  } catch (err) {
    const message = err?.message || "Failed to create task";
    return res.status(400).json({ success: false, message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const filter = {};
    if (req.query.admin) filter.admin = req.query.admin;

    const list = await task.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: list });
  } catch (err) {
    const message = err?.message || "Failed to fetch tasks";
    return res.status(500).json({ success: false, message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await task.findById(id);
    if (!doc)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    return res.status(200).json({ success: true, data: doc });
  } catch (err) {
    const message = err?.message || "Failed to fetch task";
    return res.status(400).json({ success: false, message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPlan = await task.findByIdAndDelete(id);

    if (!deletedPlan) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Delete task error:", error);
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

    const plan = await task.findById(id);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
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
