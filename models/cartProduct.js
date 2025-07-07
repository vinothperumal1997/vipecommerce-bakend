const mongoose = require("mongoose");

const addToCartSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: Number,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true } // Auto-generates createdAt & updatedAt
);

const addToCartModel = mongoose.model("addToCart", addToCartSchema);
module.exports = addToCartModel;
