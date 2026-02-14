import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const githubCallback = async (req, res) => {
  const { code } = req.query;

  try {
    // 1️⃣ Exchange code for access token
    const tokenRes = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: { Accept: "application/json" },
      },
    );

    const accessToken = tokenRes.data.access_token;

    // 2️⃣ Fetch user info
    const userRes = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    res.json({
      success: true,
      user: userRes.data,
    });
  } catch (error) {
    res.status(500).json({ error: "GitHub auth failed" });
  }
};
