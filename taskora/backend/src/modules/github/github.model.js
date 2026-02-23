import mongoose from "mongoose";

const githubSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    githubId: { type: String, required: true, unique: true },
    provider: { type: String, default: "github" },
    username: { type: String },
    displayName: { type: String },
    profileUrl: { type: String },
    email: { type: String, index: true },
    avatarUrl: { type: String },
    accessToken: { type: String },
    refreshToken: { type: String },
    scopes: { type: [String], default: [] },
    raw: { type: Object },
    isActive: { type: Boolean, default: true },
    lastLoginAt: { type: Date },
  },
  { timestamps: true },
);

const githubDB = mongoose.model("githublogin", githubSchema, "githublogin");

export { githubDB };
