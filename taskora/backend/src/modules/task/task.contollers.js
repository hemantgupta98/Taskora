import task from "./task.model.js";

// Allowed fields based on the Mongoose schema
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
