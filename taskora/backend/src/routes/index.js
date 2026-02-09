import authRoutes from "../modules/auth/auth.routes.js";
import plansRoutes from "../modules/plans/plans.routes.js";
import taskRoutes from "../modules/task/task.routes.js";
import express from "express";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/plans", plansRoutes);
router.use("/task", taskRoutes);

export default router;
