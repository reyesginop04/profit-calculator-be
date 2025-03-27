import mongoose from "mongoose";

const ProductCalculationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to User
    baseCOG: { type: Number, required: true },
    shipping: { type: Number, required: true },
    duties: { type: Number, required: true },
    otherCosts: { type: Number, required: true },
    platformFee: { type: Number, required: true },
    platformFeeType: { type: String, enum: ["fixed", "percent"], required: true },
    targetMargin: { type: Number, required: true },

    // Calculated Fields
    landedCost: { type: Number, required: true },
    finalCOG: { type: Number, required: true },
    suggestedPrice: { type: Number, required: true },
    profit: { type: Number, required: true },
    profitMargin: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("ProductCalculation", ProductCalculationSchema);
