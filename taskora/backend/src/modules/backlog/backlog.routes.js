import express from "express";
import {
  createBacklog,
  getBacklog,
  getBacklogById,
  deleteBacklog,
  updateBacklogStatus,
} from "./backlog.controller.js";
import { verifyToken } from "../../middleware/main.middleware.js";

const router = express.Router();

router.post("/createbacklog", verifyToken, createBacklog);
router.get("/", verifyToken, getBacklog);
router.get("/:id", verifyToken, getBacklogById);
router.delete("/deletebacklog/:id", verifyToken, deleteBacklog);
router.patch("/update-status/:id", verifyToken, updateBacklogStatus);

export default router;
