import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  deleteTask,
} from "./task.contollers.js";

const router = express.Router();

router.post("/createtask", createTask);
router.get("/", getTasks);
router.get("/:id", getTaskById);
router.delete("/deleteplans/:id", deleteTask);

export default router;
