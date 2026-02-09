import mongoose, { model } from "mongoose";

const planSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    board: { type: String, required: true },
    work: { type: String, required: true },
    startDate: { type: Number, required: false },
    access: { type: String, required: true },
    dueDate: { type: Number, required: false },
  },
  { timestamps: true },
);

const planModel = mongoose.model("createPlans", planSchema);

export default planModel;
