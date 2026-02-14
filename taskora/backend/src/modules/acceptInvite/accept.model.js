import mongoose from "mongoose";
import { hashpassword } from "../auth/auth.hashed.js";

const acceptSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: {
      type: String,
      required: true,
      match: [/^[0-9]{10,15}$/, "Invalid phone number"],
    },
    password: { type: String, required: true },
  },
  { timeseries: true },
);

acceptSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await hashpassword(this.password);
});
const acceptModel = mongoose.model("accept-user", acceptSchema);

export default acceptModel;
