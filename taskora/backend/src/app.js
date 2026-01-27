import express from "express";
import cors from "cors";
import corsOption from "./config/cors.js";
import routes from "./modules/auth/auth.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOption));

app.use("/api/auth", routes);

app.get("/", (req, res) => {
  res.send("Hello word baby");
});

export default app;
