import axios from "axios";
import FormData from "form-data";
import Prediction from "../models/Prediction.js";

/**
 * ==============================
 * 🧠 PREDICT TUMOR
 * ==============================
 */
export const predict = async (req, res) => {
  try {
    console.log("🧠 Prediction request received");

    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    // Prepare form-data for FastAPI
    const form = new FormData();
    form.append("file", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    // Call FastAPI
    const mlResponse = await axios.post(
      `${process.env.FASTAPI_URL}/predict`,
      form,
      {
        headers: form.getHeaders(),
        timeout: 20000,
      }
    );

    const { tumorType, confidence, hasTumor, inferenceTime } =
      mlResponse.data;

    if (!tumorType || confidence === undefined) {
      return res.status(500).json({ message: "Invalid ML response" });
    }

    // Save to MongoDB
    const savedPrediction = await Prediction.create({
      user: req.user.id,
      tumorType,
      confidence,
      hasTumor,
      inferenceTime,
    });

    res.status(200).json({
      prediction_id: savedPrediction._id,
      tumorType,
      confidence,
      hasTumor,
      inferenceTime,
      createdAt: savedPrediction.createdAt,
    });

  } catch (err) {
    console.error("❌ Prediction error:", err.message);

    if (err.response?.data) {
      return res
        .status(err.response.status || 500)
        .json(err.response.data);
    }

    res.status(500).json({ message: "Prediction failed" });
  }
};

/**
 * ==============================
 * 📜 GET USER PREDICTION HISTORY
 * ==============================
 */
export const getHistory = async (req, res) => {
  try {
    const predictions = await Prediction.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json(predictions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch history" });
  }
};

/**
 * ==============================
 * 🔍 GET SINGLE PREDICTION
 * ==============================
 */
export const getSinglePrediction = async (req, res) => {
  try {
    const prediction = await Prediction.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!prediction) {
      return res.status(404).json({ message: "Prediction not found" });
    }

    res.status(200).json(prediction);
  } catch (error) {
    res.status(500).json({ message: "Error fetching prediction" });
  }
};

/**
 * ==============================
 * 🗑 DELETE PREDICTION
 * ==============================
 */
export const deletePrediction = async (req, res) => {
  try {
    const prediction = await Prediction.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!prediction) {
      return res.status(404).json({ message: "Prediction not found" });
    }

    res.status(200).json({ message: "Prediction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete prediction" });
  }
};