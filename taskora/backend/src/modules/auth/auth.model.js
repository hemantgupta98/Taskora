import mongoose from "mongoose";
import { hashpassword } from "./auth.hashed.js";

const authSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otpCode: { type: String },
    otpExpiresAt: { type: Date },
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
const resetPasswordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SignupHistory",
      required: true,
    },
    email: { type: String, required: true },
    password: { type: String, required: true }, // hashed new password
    confirmPassword: { type: String, required: true }, // hashed confirm password (same as password)
    changedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const googleschema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    googleId: String,
    avatar: String,
  },
  { timestamps: true },
);

const googleDB = mongoose.model("googlelogin", googleschema);
// Use explicit collection name "resetpassword" per requirement
const ResetPassword = mongoose.model(
  "ResetPassword",
  resetPasswordSchema,
  "resetpassword",
);

export { User, LoginHistory, ResetPassword, googleDB };
