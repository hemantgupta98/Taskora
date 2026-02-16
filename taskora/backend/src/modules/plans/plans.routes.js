import express from "express";
import {
  createPlans,
  getPlans,
  getPlansById,
  deletePlan,
  getBacklogPlans,
  updatePlanStatus,
} from "./plans.controllers.js";

const router = express.Router();

router.post("/createplans", createPlans);
router.get("/", getPlans);
router.get("/backlog", getBacklogPlans);
router.get("/:id", getPlansById);
router.delete("/deleteplans/:id", deletePlan);
router.patch("/update-status/:id", updatePlanStatus);

export default router;
