import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const PORT = 5000;

const app = express();

const corsOption = {
  origin: "http://localhost:3000",
  optionSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOption));
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect("mongodb://localhost:27017/taskora")
  .then((e) => console.log("mongoDB connected successfully"))
  .catch((error) => console.log("Error in mongoDB connection", error));

app.post("/api/auth", (req, res) => {
  console.log("Body");
  res.json({ success: true, data: req.body });
});

app.get("/", (req, res) => {
  res.send("Hello World 👋 good boy hemant");
});

app.listen(5000, () => console.log(`Server running on port ${PORT}`));
