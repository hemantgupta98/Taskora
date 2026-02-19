import planModel from "./plans.model.js";

const allowedFields = [
  "name",
  "access",
  "work",
  "startDate",
  "dueDate",
  "board",
  "status",
  "teamMembers",
];

export const createPlans = async (req, res) => {
  try {
    const data = {};
    for (const key of allowedFields) {
      if (req.body[key] !== undefined) data[key] = req.body[key];
    }

    if (typeof data.teamMembers === "string") {
      data.teamMembers = [data.teamMembers];
    }

    const plans = await planModel.create(data);
    return res.status(200).json({ success: true, data: plans });
  } catch (error) {
    console.log("Error in creating plans", error.message);
    return res.status(400).json({
      success: false,
      message: error?.message || "Failed to create plan",
    });
  }
};

export const getPlans = async (req, res) => {
  try {
    const filter = {};
    if (req.query.admin) filter.admin = req.query.admin;

    const list = await planModel.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: list });
  } catch (err) {
    const message = err?.message || "Failed to fetch plans";
    return res.status(500).json({ success: false, message });
  }
};

export const getPlansById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await planModel.findById(id);
    if (!doc)
      return res
        .status(404)
        .json({ success: false, message: "Plans not found" });
    return res.status(200).json({ success: true, data: doc });
  } catch (err) {
    const message = err?.message || "Failed to fetch Plans";
    return res.status(400).json({ success: false, message });
  }
};

export const deletePlan = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPlan = await planModel.findByIdAndDelete(id);

    if (!deletedPlan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Plan deleted successfully",
    });
  } catch (error) {
    console.error("Delete plan error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const updatePlanStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, confirmDone } = req.body;

    if (!["todo", "progress", "done"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const plan = await planModel.findById(id);
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

export const getBacklogPlans = async (req, res) => {
  try {
    const today = new Date();

    const plans = await planModel
      .find({
        status: { $ne: "done" },
        dueDate: { $lt: today },
      })
      .sort({ dueDate: 1 });

    const backlog = plans.map((plan) => {
      const pendingDays = Math.floor(
        (today.getTime() - new Date(plan.dueDate).getTime()) /
          (1000 * 60 * 60 * 24),
      );

      return {
        _id: plan._id,
        admin: plan.name,
        work: plan.work,
        board: plan.board,
        startDate: plan.startDate,
        dueDate: plan.dueDate,
        status: plan.status,
        teamMembers: plan.teamMembers,
        pendingDays,
      };
    });

    return res.status(200).json({
      success: true,
      count: backlog.length,
      data: backlog,
    });
  } catch (error) {
    console.error("Backlog fetch error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch backlog plans",
    });
  }
};
