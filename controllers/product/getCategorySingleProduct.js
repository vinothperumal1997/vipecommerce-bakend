const productModel = require("../../models/productModel");

const getCategoryProduct = async (req, res) => {
  try {
    const productCategory = await productModel.distinct("category");

    // console.log("productCategory", productCategory);

    // array to store one product from eact category
    const productByCategory = [];

    for (const category of productCategory) {
      const product = await productModel.findOne({ category });
      if (product) {
        productByCategory.push(product);
      }
    }
    res.status(200).json({
      message: "Products fetched successfully",
      error: false,
      success: true,
      data: productByCategory,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || err || "Error fetching products",
      error: true,
      success: false,
      data: null,
    });
  }
};

module.exports = getCategoryProduct;
