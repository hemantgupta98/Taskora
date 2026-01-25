import express from "express";

const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Hello World 👋");
});

app.listen(5000, () => console.log(`Server running on port ${PORT}`));
