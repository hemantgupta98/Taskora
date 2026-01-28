import mongoose from "mongoose";
import { hashpassword } from "./auth.hashed.js";

const authSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

authSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await hashpassword(this.password);
});

const User = mongoose.model("SignupHistory", authSchema);

const loginSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    email: String,
    loginAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const LoginHistory = mongoose.model("LoginHistory", loginSchema);

export { User, LoginHistory };
