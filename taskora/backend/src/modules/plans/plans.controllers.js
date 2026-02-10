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
