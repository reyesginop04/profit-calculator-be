import ProductCalculation from "../models/product-calculation.model.js";

export const getUserCalculations = async (req, res) => {
  try {
    const userId = req.user.id;
    const calculations = await ProductCalculation.find({ userId }).sort({ createdAt: -1 });
    res.json(calculations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching calculations", error });
  }
};

export const calculateAndSaveProductCost = async (req, res) => {
  try {
    const { baseCOG, shipping, duties, otherCosts, platformFee, platformFeeType, targetMargin } = req.body;
    const userId = req.user.id; // Extracted from `authMiddleware`

    const landedCost = baseCOG + shipping + duties + otherCosts;

    let finalCOG;
    if (platformFeeType === "fixed") {
      finalCOG = landedCost + platformFee;
    } else if (platformFeeType === "percent") {
      finalCOG = landedCost + landedCost * (platformFee / 100);
    } else {
      return res.status(400).json({ message: "Invalid platform fee type" });
    }

    const suggestedPrice = finalCOG / (1 - targetMargin / 100);

    const profit = suggestedPrice - finalCOG;
    const profitMargin = (profit / suggestedPrice) * 100;

    const productCalculation = await ProductCalculation.create({
      userId,
      baseCOG,
      shipping,
      duties,
      otherCosts,
      platformFee,
      platformFeeType,
      targetMargin,
      landedCost,
      finalCOG,
      suggestedPrice,
      profit,
      profitMargin,
    });

    res.status(201).json({ message: "Calculation saved!", productCalculation });
  } catch (error) {
    res.status(500).json({ message: "Error saving product cost", error });
  }
};

export const updateProductCalculation = async (req, res) => {
  try {
    const { id } = req.params; // Product Calculation ID
    const userId = req.user.id; // Extracted from authMiddleware

    const { baseCOG, shipping, duties, otherCosts, platformFee, platformFeeType, targetMargin } = req.body;

    let productCalculation = await ProductCalculation.findOne({ _id: id, userId });
    if (!productCalculation) {
      return res.status(404).json({ message: "Calculation not found or unauthorized" });
    }

    const landedCost = baseCOG + shipping + duties + otherCosts;
    let finalCOG;
    if (platformFeeType === "fixed") {
      finalCOG = landedCost + platformFee;
    } else if (platformFeeType === "percent") {
      finalCOG = landedCost + landedCost * (platformFee / 100);
    } else {
      return res.status(400).json({ message: "Invalid platform fee type" });
    }

    const suggestedPrice = finalCOG / (1 - targetMargin / 100);
    const profit = suggestedPrice - finalCOG;
    const profitMargin = (profit / suggestedPrice) * 100;

    productCalculation = await ProductCalculation.findByIdAndUpdate(
      id,
      {
        baseCOG,
        shipping,
        duties,
        otherCosts,
        platformFee,
        platformFeeType,
        targetMargin,
        landedCost,
        finalCOG,
        suggestedPrice,
        profit,
        profitMargin,
      },
      { new: true } // Return updated document
    );

    res.json({ message: "Calculation updated successfully!", productCalculation });
  } catch (error) {
    res.status(500).json({ message: "Error updating product cost", error });
  }
};

export const deleteProductCalculation = async (req, res) => {
  try {
    const { id } = req.params; // Product Calculation ID
    const userId = req.user.id; // Extracted from authMiddleware

    const productCalculation = await ProductCalculation.findOne({ _id: id, userId });
    if (!productCalculation) {
      return res.status(404).json({ message: "Calculation not found or unauthorized" });
    }

    await ProductCalculation.findByIdAndDelete(id);

    res.json({ message: "Calculation deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product cost calculation", error });
  }
};
