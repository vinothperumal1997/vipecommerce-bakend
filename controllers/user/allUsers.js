const uploadProductpermission = require("../../helpers/permission");
const userModel = require("../../models/userModel");

const allUsers = async (req, res) => {
  try {
    // console.log("userid test", req.userId);
    const sessionUserId = req.userId;
    // console.log("sessionUserId", sessionUserId);
    if (!uploadProductpermission(sessionUserId)) {
      throw new Error("permission denied");
    }
    const allusers = await userModel
      .find()
      .select("-password -updatedAt -__v -createdAt");
    res.json({
      message: "All user",
      data: allusers,
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

module.exports = allUsers;
