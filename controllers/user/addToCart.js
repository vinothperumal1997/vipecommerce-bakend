const addToCartModel = require("../../models/cartProduct");

const addToCart = async (req, res) => {
  try {
    const { productId } = req?.body;
    const currentUser = req?.userId;
    const isProductAvailable = await addToCartModel.find({
      productId,
      userId: currentUser,
    });
    // console.log(isProductAvailable),
    // "Checking if product already exists in cart...  ";
    if (isProductAvailable.length > 0) {
      return res.status(400).json({
        message: "Already exists in the cart",
        error: true,
        success: false,
      });
    }

    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    };
    const newProduct = new addToCartModel(payload);
    const saveProduct = await newProduct.save();
    res.status(200).json({
      data: saveProduct,
      message: "Product added to cart",
      error: false,
      success: true,
    });

    // Implement cart logic here
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
};

module.exports = addToCart;
