import express from "express";
import { createPlans } from "./plans.controllers.js";

const router = express.Router();

router.post("/createplans", createPlans);

export default router;
