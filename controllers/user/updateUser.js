const uploadProductpermission = require("../../helpers/permission");
const userModel = require("../../models/userModel");

const updateUser = async (req, res) => {
  try {
    const sessionUserId = req.userId;
    // console.log("sessionUserId", sessionUserId);
    if (!uploadProductpermission(sessionUserId)) {
      throw new Error("permission denied");
    }
    const { userId, email, name, role } = req.body;
    const payload = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(role && { role: role }),
    };
    const sessionUser = req.userId;
    const user = await userModel.findById(req.userId);
    if (user) {
      const updatedUser = await userModel.findByIdAndUpdate(userId, payload);
      if (updatedUser) {
        return res.status(200).json({
          message: "User updated successfully",
          success: true,
          error: false,
        });
      } else {
        return res.status(404).json({
          message: "User not found",
          success: false,
          error: true,
        });
      }
    } else {
      return res.status(403).json({
        message: "Unauthorized to update this user",
        success: false,
        error: true,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message || error || "Internal Server Error",
      success: false,
      error: true,
    });
  }
};

module.exports = updateUser;
