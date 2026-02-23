import express from "express";
import {
  githubLogin,
  githubCallback,
  getGithubRepos,
} from "./github.controllers.js";
import { githubAuth } from "./github.auth.middleware.js";
import { verifyToken } from "../../middleware/main.middleware.js";

const router = express.Router();

router.get("/login", verifyToken, githubLogin);

router.get("/callback", verifyToken, githubCallback);
router.get("/repos", verifyToken, githubAuth, getGithubRepos);

export default router;
