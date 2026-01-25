import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const PORT = 5000;

const app = express();

const corsOption = {
  origin: "",
  optionSuccessStatua: 200,
  METHODS: "GET,POST, PUT , PATCH, DELETE, HEAD",
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOption));

mongoose
  .connect("")
  .then((e) => console.log("mongoDB connected successfully", e))
  .catch((error) => console.log("Error in mongoDB connection", error));

app.post("/src/app/auth", (req, res) => {
  console.log(req.body);
  return res.json(req.body);
});

app.get("/src/app/auth", (req, res) => {
  res.end(req.body);
});

app.get("/", (req, res) => {
  res.send("Hello World 👋");
});

app.listen(5000, () => console.log(`Server running on port ${PORT}`));
