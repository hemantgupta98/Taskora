import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  deleteTask,
  updateBacklogStatus,
} from "./task.contollers.js";

const router = express.Router();

router.post("/createtask", createTask);
router.get("/", getTasks);
router.get("/:id", getTaskById);
router.delete("/deleteplans/:id", deleteTask);
router.patch("/update-status/:id", updateBacklogStatus);

export default router;
