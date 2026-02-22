import axios from "axios"

const apiOrigin =
  process.env.NEXT_PUBLIC_API_URL2 ??
  process.env.NEXT_PUBLIC_API_URL ??
  "https://taskora-88w5.onrender.com";

const normalizedApiBase = `${apiOrigin.replace(/\/$/, "")}/api`;

export const api = axios.create({
  baseURL: normalizedApiBase,
  withCredentials: true,
});