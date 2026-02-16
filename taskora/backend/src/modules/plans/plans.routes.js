import express from "express";
import {
  createPlans,
  getPlans,
  getPlansById,
  deletePlan,
} from "./plans.controllers.js";

const router = express.Router();

router.post("/createplans", createPlans);
router.get("/", getPlans);
router.get("/:id", getPlansById);
router.delete("/deleteplans/:id", deletePlan);

export default router;
