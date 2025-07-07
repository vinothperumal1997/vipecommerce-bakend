const bcrypt = require("bcrypt");
const SellerModel = require("../../models/sellerModel");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../utils/token.util");
const sellerSignInController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ message: "Email is required", success: false });
    }
    if (!password) {
      return res
        .status(400)
        .json({ message: "Password is required", success: false });
    }

    // Find user by email
    const user = await SellerModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email", success: false });
    }

    // Check password
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res
        .status(401)
        .json({ message: "Invalid password", success: false });
    }

    // Generate JWT tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Store refresh token
    // await addRefreshToken(refreshToken, user._id);

    return res
      .cookie("token", accessToken)
      .cookie("refresh_token", refreshToken)
      .status(200)
      .json({
        message: "Login successful",
        success: true,
        accessToken,
        refreshToken,
        user: { email: user.email },
      });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

module.exports = sellerSignInController;
