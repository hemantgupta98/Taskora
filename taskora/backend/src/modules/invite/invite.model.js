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
      type: [String],
      required: true,
      validate: {
        validator: (value) => Array.isArray(value) && value.length > 0,
        message: "At least one team member is required",
      },
    },
    email: { type: String, required: true },
  },
  { timestamps: true },
);

const inviteModel = mongoose.model("inviteData", inviteSchema);
export default inviteModel;
