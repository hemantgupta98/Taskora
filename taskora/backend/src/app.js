import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import path from "path";
import passport from "passport";
import corsOption from "./config/cors.js";
import allRoutes from "./routes/index.js";
import cookieParser from "cookie-parser";

import "./modules/auth/auth.google.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOption));
app.use(passport.initialize());

app.use("/uploads", express.static(path.join("uploads")));
app.use("/api", allRoutes);

export default app;
