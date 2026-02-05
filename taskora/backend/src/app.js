import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import corsOption from "./config/cors.js";
import routes from "./modules/auth/auth.routes.js";
// Load environment variables before any strategy imports
dotenv.config();
// Register Google OAuth strategy (side-effect import)
import "./modules/auth/auth.google.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOption));
app.use(passport.initialize());

app.use("/api/auth", routes);

app.get("/", (req, res) => {
  res.send("Hello word baby");
});

export default app;
