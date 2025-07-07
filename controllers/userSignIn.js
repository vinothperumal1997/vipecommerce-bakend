// const { jwt } = require("jsonwebtoken");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

async function userSignInControlleree(req, res) {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
        success: false,
      });
    }
    if (!password) {
      return res.status(400).json({
        message: "Password is required",
        success: false,
      });
    } // Implement user signin logic here
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email ",
        success: false,
      });
    }
    const checkPassword = await bcrypt.compareSync(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({
        message: "Invalid  password",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Login successful",
      success: true,
      user: { email: user.email },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: true,
    });
  }
}

module.exports = userSignInControlleree;
