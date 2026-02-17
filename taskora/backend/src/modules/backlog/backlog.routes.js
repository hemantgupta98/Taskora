import express from "express";
import {
  createBacklog,
  getBacklog,
  getBacklogById,
  deleteBacklog,
  updateBacklogStatus,
} from "./backlog.controller.js";

const router = express.Router();

router.post("/createbacklog", createBacklog);
router.get("/", getBacklog);
router.get("/:id", getBacklogById);
router.delete("/deletebacklog/:id", deleteBacklog);
router.patch("/update-status/:id", updateBacklogStatus);

export default router;
