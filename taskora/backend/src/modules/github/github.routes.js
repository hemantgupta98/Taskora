import express from "express";
import {
  githubLogin,
  githubCallback,
  getGithubRepos,
} from "./github.controllers.js";
import { githubAuth } from "./github.auth.middleware.js";

const router = express.Router();

router.get("/login", githubLogin);

router.get("/callback", githubCallback);
router.get("/repos", githubAuth, getGithubRepos);

export default router;
