const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    brandName: { type: String, required: true },
    category: { type: String, required: true },
    productImage: { type: [String], required: true }, // Array of image URLs
    price: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    description: { type: String, required: true },
    availableStock: { type: Number }, // Fixed typo

    status: { type: String, enum: ["active", "inactive"], default: "active" },
    discounts: [{ startDate: Date, endDate: Date, percentage: Number }],
  },
  { timestamps: true } // Auto-generates createdAt & updatedAt
);

const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;
