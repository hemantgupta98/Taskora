import mongoose from "mongoose";
import hashpassword from "./auth.hashed.js";

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

authSchema.pre("save", async function (next) {
  try {
    if (this.isNew && this.password) {
      this.password = await hashpassword(this.password);
    }
    next();
  } catch (err) {
    next;
  }
});

const signSchema = mongoose.model("signup", authSchema);
const loginDB = mongoose.model("login", loginSchema);

export { signSchema, loginDB };
