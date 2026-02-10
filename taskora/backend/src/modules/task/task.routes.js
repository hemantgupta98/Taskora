import express from "express";
import { createTask, getTasks, getTaskById } from "./task.contollers.js";

const router = express.Router();

router.post("/createtask", createTask);
router.get("/", getTasks);
router.get("/:id", getTaskById);

export default router;
