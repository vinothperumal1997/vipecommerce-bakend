// const userModel = require("../models/userModel");

const uploadProductpermission = require("../../helpers/permission");
const productModel = require("../../models/productModel");

const allProducts = async (req, res) => {
  try {
    // console.log("userid test", req.userId);
    const sessionUserId = req.userId;
    // console.log("sessionUserId", sessionUserId);
    if (!uploadProductpermission(sessionUserId)) {
      throw new Error("permission denied");
    }
    const allproducts = await productModel.find();
    // .select("-password -updatedAt -__v -createdAt");
    res.json({
      message: "All product",
      data: allproducts,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error || "Server Error",
      success: false,
      error: true,
    });
  }
};

module.exports = allProducts;
