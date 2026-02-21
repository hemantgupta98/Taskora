import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    originalName: {
      type: String,
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    fileType: {
      type: String, // image/png, image/jpeg
      required: true,
    },

    fileSize: {
      type: Number, // bytes
    },

    url: {
      type: String,
      required: true,
    },

    // 🔥 polymorphic relation
    module: {
      type: String,
      enum: ["auth", "plans", "task", "accept", "invite", "backlog"],
      required: true,
    },

    moduleId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "module",
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

export const Media = mongoose.model("Media", mediaSchema);
