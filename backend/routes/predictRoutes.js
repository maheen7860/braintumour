import express from "express";
import {
  predict,
  getHistory,
  getSinglePrediction,
  deletePrediction,
} from "../controllers/predictController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

/**
 * POST /api/predict
 */
router.post("/", authMiddleware, upload.single("file"), predict);

/**
 * GET /api/predict/history
 */
router.get("/history", authMiddleware, getHistory);

/**
 * GET /api/predict/:id
 */
router.get("/:id", authMiddleware, getSinglePrediction);

/**
 * DELETE /api/predict/:id
 */
router.delete("/:id", authMiddleware, deletePrediction);

export default router;