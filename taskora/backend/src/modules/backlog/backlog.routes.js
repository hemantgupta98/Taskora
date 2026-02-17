import express from "express";
import {
  createBacklog,
  getBacklog,
  getBacklogById,
} from "./backlog.controller.js";

const router = express.Router();

router.post("/createbacklog", createBacklog);
router.get("/", getBacklog);
router.get("/:id", getBacklogById);

export default router;
