import mongoose from "mongoose";

const inviteSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true },
  },
  { timestamps: true },
);

const inviteModel = mongoose.model("inviteData", inviteSchema);
export default inviteModel;
