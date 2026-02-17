import backlog from "./backlog.model.js";

const allowedFields = [
  "admin",
  "title",
  "descripition",
  "priority",
  "status",
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
