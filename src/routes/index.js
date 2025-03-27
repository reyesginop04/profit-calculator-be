import express from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import productCalculationRoutes from "./product-calculation.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/product-calculation", productCalculationRoutes);

export default router;
