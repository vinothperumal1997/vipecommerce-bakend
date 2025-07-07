const uploadProductpermission = require("../../helpers/permission");
const productModel = require("../../models/productModel");

const UploadProductController = async (req, res) => {
  try {
    const sessionUserId = req.userId;
    if (!uploadProductpermission(sessionUserId)) {
      throw new Error("permission denied");
    }
    const uploadProduct = new productModel(req.body);
    const saveProduct = await uploadProduct.save();
    return res.status(200).json({
      message: "Product uploaded successfully",
      data: saveProduct,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error || "Internal server error",
      success: false,
      error: true,
    });
  }
};

module.exports = UploadProductController;
