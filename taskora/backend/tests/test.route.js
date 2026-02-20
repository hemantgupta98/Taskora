import { client } from "../src/config/db.js";

export const testInsert = async (req, res) => {
  try {
    const { name, email } = req.body;

    const db = client.db("taskora");
    const users = db.collection("users");

    const result = await users.insertOne({
      name,
      email,
      createdAt: new Date(),
    });

    res.status(201).json({
      message: "Data inserted",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
