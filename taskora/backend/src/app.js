import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import corsOption from "./config/cors.js";
import allRoutes from "./routes/index.js";
import cookieParser from "cookie-parser";

dotenv.config();

import "./modules/auth/auth.google.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOption));
app.use(passport.initialize());

app.use("/api", allRoutes);

app.get("/", (req, res) => {
  res.send("Hello word baby");
});

export default app;
