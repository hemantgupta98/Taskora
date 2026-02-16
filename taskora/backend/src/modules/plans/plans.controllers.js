import planModel from "./plans.model.js";

const allowedFields = [
  "name",
  "access",
  "work",
  "startDate",
  "dueDate",
  "board",
];

export const createPlans = async (req, res) => {
  try {
    const data = {};
    for (const key of allowedFields) {
      if (req.body[key] !== undefined) data[key] = req.body[key];
    }
    const plans = await planModel.create(data);
    return res.status(200).json({ success: true, data: plans });
  } catch (error) {
    console.log("Error in creating plans", error.message);
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
