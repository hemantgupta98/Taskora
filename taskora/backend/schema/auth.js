import { model, Schema } from "mongoose";

const authSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const auth = model("taskora-auth", authSchema);

module.exports = auth;
