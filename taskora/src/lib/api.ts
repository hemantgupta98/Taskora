import axios from "axios"

const apiOrigin =
  
  process.env.NEXT_PUBLIC_API_URL ??
  "https://taskora-88w5.onrender.com";

const normalizedApiBase = `${apiOrigin.replace(/\/$/, "")}/api`;

export const api = axios.create({
  baseURL: normalizedApiBase,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);