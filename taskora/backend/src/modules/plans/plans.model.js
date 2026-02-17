import mongoose, { model } from "mongoose";

const planSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    board: { type: String, required: true },
    work: { type: String, required: true },
    startDate: { type: Number, required: true },
    access: { type: String, required: true },
    dueDate: { type: Number, required: true },
    teamMembers: {
      type: [String],
      required: true,
      validate: {
        validator: (value) => Array.isArray(value) && value.length > 0,
        message: "At least one team member is required",
      },
    },
    status: {
      type: String,
      enum: ["todo", "progress", "done"],
      default: "todo",
    },
  },
  { timestamps: true },
);

const planModel = mongoose.model("createPlans", planSchema);

export default planModel;
