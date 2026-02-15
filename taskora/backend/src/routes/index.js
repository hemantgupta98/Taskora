import authRoutes from "../modules/auth/auth.routes.js";
import plansRoutes from "../modules/plans/plans.routes.js";
import taskRoutes from "../modules/task/task.routes.js";
import inviteRoutes from "../modules/invite/invite.routes.js";
import acceptinviteRoutes from "../modules/acceptInvite/accept.routes.js";
import githubRoutes from "../modules/github/github.routes.js";
import express from "express";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/plans", plansRoutes);
router.use("/task", taskRoutes);
router.use("/invite", inviteRoutes);
router.use("/accept", acceptinviteRoutes);
router.use("/github", githubRoutes);

export default router;
