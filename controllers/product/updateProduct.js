// const productModel = require("../models/productModel");

const productModel = require("../../models/productModel");

// const updateProduct = async (req, res) => {
//   try {
//     const {
//       _id,
//       productName,
//       brandName,
//       category,
//       productImage,
//       sellingPrice,
//       price,
//       status,
//       description,
//     } = req.body;
//     const payload = {
//       ...(productName && { productName: productName }),
//       ...(brandName && { brandName: brandName }),
//       ...(category && { category: category }),
//       ...(productImage && { productImage: productImage }),
//       ...(sellingPrice && { sellingPrice: sellingPrice }),
//       ...(price && { price: price }),
//       ...(status && { status: status }),
//       ...(description && { description: description }),
//     };
//     const updatedProduct = await productModel.findByIdAndUpdate(_id, payload);
//     if (updatedProduct) {
//       return res.status(200).json({
//         message: "Product updated successfully",
//         success: true,
//         error: false,
//       });
//     } else {
//       return res.status(404).json({
//         message: "Product not found",
//         success: false,
//         error: true,
//       });
//     }
//   } catch (err) {
//     res.status(500).json({
//       message: err.message || err || "Internal Server Error",
//       success: false,
//       error: true,
//     });
//   }
// };

// module.exports = updateProduct;

const updateProduct = async (req, res) => {
  try {
    const { _id, ...updateFields } = req.body;

    if (!_id) {
      return res.status(400).json({
        message: "Product ID is required",
        success: false,
        error: true,
      });
    }

    // Filter out undefined or empty values
    const payload = Object.fromEntries(
      Object.entries(updateFields).filter(
        ([_, value]) => value !== undefined && value !== ""
      )
    );

    const updatedProduct = await productModel.findByIdAndUpdate(_id, payload, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      success: true,
      error: false,
      data: updatedProduct, // Return updated product for reference
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal Server Error",
      success: false,
      error: true,
    });
  }
};

module.exports = updateProduct;
