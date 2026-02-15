import express from "express";
import { githubLogin, githubCallback } from "./github.controllers.js";

const router = express.Router();

router.get("/", githubLogin);

router.get("/callback", githubCallback);

export default router;
