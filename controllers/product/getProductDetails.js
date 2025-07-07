const productModel = require("../../models/productModel");

const getProductDetails = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({
      message: "Product details fetched successfully",
      data: product,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(500).json({
      message: err?.message || err || "Internal server error",
      error: true,
      success: false,
    });
  }
};

module.exports = getProductDetails;
