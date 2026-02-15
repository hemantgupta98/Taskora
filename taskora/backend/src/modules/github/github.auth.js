import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";
const GITHUB_USER_URL = "https://api.github.com/user";
const GITHUB_EMAILS_URL = "https://api.github.com/user/emails";

export async function exchangeCodeForToken(code) {
  const resp = await axios.post(
    GITHUB_TOKEN_URL,
    {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    },
    {
      headers: { Accept: "application/json" },
    },
  );

  if (resp.data.error) {
    throw new Error(resp.data.error_description || resp.data.error);
  }

  return resp.data.access_token;
}

export async function fetchGithubUser(accessToken) {
  const resp = await axios.get(GITHUB_USER_URL, {
    headers: {
      Authorization: `token ${accessToken}`,
      Accept: "application/vnd.github.v3+json",
    },
  });
  return resp.data;
}

export async function fetchPrimaryEmail(accessToken) {
  try {
    const resp = await axios.get(GITHUB_EMAILS_URL, {
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    const emails = resp.data || [];
    const primary =
      emails.find((e) => e.primary && e.verified) ||
      emails.find((e) => e.verified) ||
      emails[0];
    return primary ? primary.email : null;
  } catch (err) {
    return null;
  }
}

export default {
  exchangeCodeForToken,
  fetchGithubUser,
  fetchPrimaryEmail,
};
