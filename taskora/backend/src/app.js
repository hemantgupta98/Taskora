import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import corsOption from "./config/cors.js";
import authRoutes from "./modules/auth/auth.routes.js";
import taskRoutes from "./modules/task/task.routes.js";
import allRoutes from "./routes/index.js";
// Load environment variables before any strategy imports
dotenv.config();
// Register Google OAuth strategy (side-effect import)
import "./modules/auth/auth.google.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOption));
app.use(passport.initialize());

app.use("/api", allRoutes);

app.get("/", (req, res) => {
  res.send("Hello word baby");
});

export default app;
