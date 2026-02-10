import express from "express";
import { createPlans, getPlans, getPlansById } from "./plans.controllers.js";

const router = express.Router();

router.post("/createplans", createPlans);
router.get("/", getPlans);
router.get("/:id", getPlansById);

export default router;
