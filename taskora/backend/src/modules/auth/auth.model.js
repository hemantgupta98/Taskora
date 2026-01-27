import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

const loginSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

const signSchema = mongoose.model("signup", authSchema);
const loginDB = mongoose.model("login", loginSchema);

export { signSchema, loginDB };
