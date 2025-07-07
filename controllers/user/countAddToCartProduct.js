const addToCartModel = require("../../models/cartProduct");

const countAddToCartProduct = async (req, res) => {
  try {
    const userId = req?.userId;
    const count = await addToCartModel.countDocuments({ userId });
    res.json({
      count,
      message: "ok",
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

module.exports = countAddToCartProduct;
