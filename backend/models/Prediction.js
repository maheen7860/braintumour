import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  tumorType: {
    type: String,
    required: true,
    enum: ["glioma", "meningioma", "pituitary", "notumor"]
  },

  confidence: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },

  hasTumor: {
    type: Boolean,
    required: true
  },

  inferenceTime: {
    type: Number,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Prediction", predictionSchema);