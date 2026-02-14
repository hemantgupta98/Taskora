import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import {
  exchangeCodeForToken,
  fetchGithubUser,
  fetchPrimaryEmail,
} from "./github.auth.js";

const FRONTEND_URL = process.env.FRONTEND_URL ?? "http://localhost:3000";

export const githubLogin = (req, res) => {
  const base = "https://github.com/login/oauth/authorize";
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID,
    scope: "read:user user:email",
    // optional: you can set redirect_uri via env if needed
    redirect_uri:
      process.env.GITHUB_REDIRECT_URI ||
      `${process.env.BACKEND_URL || "http://localhost:5000"}/api/github/callback`,
  }).toString();

  return res.redirect(`${base}?${params}`);
};

export const githubCallback = async (req, res) => {
  const { code } = req.query;
  if (!code) return res.redirect(`${FRONTEND_URL}/login?oauth=missing_code`);

  try {
    const accessToken = await exchangeCodeForToken(code);
    const ghUser = await fetchGithubUser(accessToken);
    const email =
      (ghUser && ghUser.email) || (await fetchPrimaryEmail(accessToken));

    const payload = {
      provider: "github",
      providerId: ghUser.id,
      name: ghUser.name || ghUser.login,
      email: email || null,
      avatar: ghUser.avatar_url,
    };

    const secret = process.env.JWT_TOKEN;
    if (!secret) {
      console.error("Missing JWT_TOKEN env var");
      return res.redirect(`${FRONTEND_URL}/login?oauth=server_misconfig`);
    }

    const token = jwt.sign(payload, secret, { expiresIn: "7d" });

    return res.redirect(`${FRONTEND_URL}/dashboard/?token=${token}`);
  } catch (err) {
    console.error("GitHub callback error:", err.message || err);
    return res.redirect(`${FRONTEND_URL}/login?oauth=failed`);
  }
};

export default { githubLogin, githubCallback };
