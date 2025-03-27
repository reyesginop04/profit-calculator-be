import express from "express";
import {
  calculateAndSaveProductCost,
  deleteProductCalculation,
  getUserCalculations,
  updateProductCalculation,
} from "../controllers/product-calculation.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getUserCalculations);
router.post("/", authMiddleware, calculateAndSaveProductCost);
router.put("/:id", authMiddleware, updateProductCalculation);
router.delete("/:id", authMiddleware, deleteProductCalculation);

export default router;
