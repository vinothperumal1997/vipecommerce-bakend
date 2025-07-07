const addToCartModel = require("../../models/cartProduct");

const updateAddToCartProduct = async (req, res) => {
  try {
    const currentUserId = req?.userId;
    const addToCartProductId = req?.body._id;
    const qty = req?.body.quantity;
    if (!currentUserId || !addToCartProductId || !qty) {
      return res.status(400).json({
        message: "Missing required fields",
        success: false,
      });
    }
    const updateProduct = await addToCartModel.updateOne(
      {
        _id: addToCartProductId,
      },
      {
        ...(qty && { quantity: qty }),
      }
    );
    res.json({
      message: "Product updated successfully",
      success: true,
      error: false,
      data: updateProduct,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || err || "Internal Server Error",
      success: false,
      error: true,
    });
  }
};

module.exports = updateAddToCartProduct;
