import dotenv from "dotenv";
dotenv.config();

import axios from "axios";
import jwt from "jsonwebtoken";

import {
  exchangeCodeForToken,
  fetchGithubUser,
  fetchPrimaryEmail,
} from "./github.auth.js";
import { githubDB } from "./github.model.js";

const FRONTEND_URL = process.env.FRONTEND_URL ?? "http://localhost:3000";
const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:5000";

export const githubLogin = async (req, res) => {
  const base = "https://github.com/login/oauth/authorize";

  const redirectUri = `${BACKEND_URL}/api/github/callback`;

  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID,
    scope: "read:user user:email repo",
    redirect_uri: redirectUri,
    allow_signup: "true",
  }).toString();

  return res.redirect(`${base}?${params}`);
};

/**
 * 🔁 STEP 2: GitHub callback
 */
export const githubCallback = async (req, res) => {
  const { code } = req.query;
  if (!code) {
    return res.redirect(`${FRONTEND_URL}/auth?oauth=missing_code`);
  }

  try {
    // Exchange code → access token
    const accessToken = await exchangeCodeForToken(code);

    // Fetch GitHub user
    const ghUser = await fetchGithubUser(accessToken);

    const email = ghUser?.email || (await fetchPrimaryEmail(accessToken));

    const payload = {
      provider: "github",
      providerId: ghUser.id,
      name: ghUser.name || ghUser.login,
      email: email || null,
      avatar: ghUser.avatar_url,
      githubToken: accessToken,
    };

    // Save / update DB
    try {
      const update = {
        githubId: ghUser.id,
        provider: "github",
        username: ghUser.login,
        displayName: ghUser.name || ghUser.login,
        profileUrl: ghUser.html_url,
        email: email || null,
        avatarUrl: ghUser.avatar_url,
        accessToken,
        raw: ghUser,
        lastLoginAt: new Date(),
      };

      const userRecord = await githubDB.findOneAndUpdate(
        { githubId: ghUser.id },
        { $set: update },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      );

      if (userRecord?._id) {
        payload.userId = userRecord._id;
      }
    } catch (dbErr) {
      console.error("GitHub DB upsert error:", dbErr);
    }

    // Sign JWT
    const token = jwt.sign(payload, process.env.JWT_TOKEN, {
      expiresIn: "2d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // true in production (https)
    });

    // Redirect back to frontend
    return res.redirect(`${FRONTEND_URL}/dashboard`);
  } catch (err) {
    console.error("GitHub callback error:", err);
    return res.redirect(`${FRONTEND_URL}/auth?oauth=failed`);
  }
};

export const getGithubRepos = async (req, res) => {
  try {
    // ✅ Read JWT from cookie
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "GitHub not connected" });
    }

    // ✅ Decode JWT
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    const githubToken = decoded.githubToken; // 👈 MUST exist

    if (!githubToken) {
      return res.status(401).json({ message: "Invalid GitHub token" });
    }

    // ✅ Fetch repos from GitHub
    const response = await axios.get("https://api.github.com/user/repos", {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: "application/vnd.github+json",
      },
      params: {
        visibility: "all",
        sort: "updated",
        per_page: 50,
      },
    });

    return res.json({
      success: true,
      repos: response.data,
    });
  } catch (err) {
    console.error("Repo fetch error:", err.response?.data || err);
    return res.status(401).json({
      message: "Failed to fetch repositories",
    });
  }
};
