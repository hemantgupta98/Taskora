import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  deleteTask,
  updateBacklogStatus,
} from "./task.contollers.js";
import { verifyToken } from "../../middleware/main.middleware.js";

const router = express.Router();

router.post("/createtask", verifyToken, createTask);
router.get("/", verifyToken, getTasks);
router.get("/:id", verifyToken, getTaskById);
router.delete("/deleteplans/:id", verifyToken, deleteTask);
router.patch("/update-status/:id", verifyToken, updateBacklogStatus);

export default router;
