const userModel = require("../../models/userModel");

const userDetailsController = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.userId)
      .select("-password -updatedAt -__v -createdAt");
    res.status(200).json({
      data: user,
      error: false,
      success: true,
      message: "User details",
    });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: error.message || error, success: false, error: true });
  }
};

module.exports = userDetailsController;
