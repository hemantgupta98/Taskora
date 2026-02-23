import express from "express";
import {
  createPlans,
  getPlans,
  getPlansById,
  deletePlan,
  getBacklogPlans,
  updatePlanStatus,
} from "./plans.controllers.js";
import { verifyToken } from "../../middleware/main.middleware.js";

const router = express.Router();

router.post("/createplans", verifyToken, createPlans);
router.get("/", verifyToken, getPlans);
router.get("/backlog", verifyToken, getBacklogPlans);
router.get("/:id", verifyToken, getPlansById);
router.delete("/deleteplans/:id", verifyToken, deletePlan);
router.patch("/update-status/:id", verifyToken, updatePlanStatus);

export default router;
