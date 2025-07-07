// const { hashPassword, comparePassword } = require("../utils/password.util");
const bcrypt = require("bcrypt");

const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/token.util");
const {
  addRefreshToken,
  removeRefreshToken,
  isRefreshTokenValid,
} = require("../services/token.service");
const userModel = require("../models/userModel");

const refresh = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken || !(await isRefreshTokenValid(refreshToken))) {
    return res.status(401).json({ message: "Refresh token required" });
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);
    // const user = await findUserById(decoded.id);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const accessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    await removeRefreshToken(refreshToken);
    await addRefreshToken(newRefreshToken, user._id);

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.json({ accessToken });
  } catch (error) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};

const logout = async (req, res) => {
  try {
    const refresh_token = req.cookies.refresh_token;
    const token = req.cookies.token;

    await removeRefreshToken(refresh_token);
    await removeRefreshToken(token);
    res.clearCookie("refresh_token");
    res.clearCookie("token");

    res.json({
      message: "Logged out successfully",
      success: true,
      error: false,
    });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false, error: true });
  }
};
const userSignInController = async (req, res) => {
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
    const user = await userModel.findOne({ email });
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

module.exports = {
  refresh,
  logout,
  userSignInController,
};
