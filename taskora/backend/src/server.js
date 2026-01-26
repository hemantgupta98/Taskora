import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import User from "./schema/auth";

const PORT = 5000;

const app = express();

const corsOption = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOption));
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect("mongodb://localhost:27017/taskora")
  .then(() => console.log("mongoDB connected successfully"))
  .catch((error) => console.error("Error in mongoDB connection", error));

app.post("/api/signup", async (req, res) => {
  try {
    const user = new User(req.body); // create document
    await user.save(); // save to DB

    res.status(201).json({
      success: true,
      message: "User saved successfully",
      data: user,
    });
  } catch (error) {
    console.error("Save error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save user",
    });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World 👋 good boy hemant");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
