import express from "express";
import { githubLogin, githubCallback } from "./github.controllers.js";

const router = express.Router();

// Start GitHub OAuth
router.get("/", githubLogin);

// Callback endpoint GitHub will redirect to
router.get("/callback", githubCallback);

export default router;
