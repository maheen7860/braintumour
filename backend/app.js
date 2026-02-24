import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import predictRoutes from "./routes/predictRoutes.js";

dotenv.config();

const app = express();

// ==============================
// Middleware
// ==============================
app.use(cors());
app.use(express.json());

// ==============================
// Routes
// ==============================
app.use("/api/auth", authRoutes);
app.use("/api/predict", predictRoutes);

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Brain Tumor Backend Running 🚀" });
});

// ==============================
// MongoDB Connection
// ==============================
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
    console.log("🔥 Connected database:", mongoose.connection.name);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // stop server if DB fails
  }
};

connectDB();

// ==============================
// Start Server
// ==============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Node backend running on port ${PORT}`);
});