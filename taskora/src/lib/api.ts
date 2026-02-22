import axios from "axios"

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://taskora-88w5.onrender.com/api",
  withCredentials: true,
});