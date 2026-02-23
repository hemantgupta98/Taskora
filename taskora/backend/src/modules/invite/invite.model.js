import mongoose from "mongoose";

const inviteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    teamMembers: {
      type: String,
      required: true,
    },
    email: { type: String, required: true },
  },
  { timestamps: true },
);

const inviteModel = mongoose.model("inviteData", inviteSchema);
export default inviteModel;
