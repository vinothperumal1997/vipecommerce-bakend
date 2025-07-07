const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

async function userSignUpController(req, res) {
  try {
    // Ensure req.body is defined
    if (!req.body) {
      return res
        .status(400)
        .json({ message: "Invalid request body", error: true, success: false });
    }

    const { email, password, name, profilePic } = req.body;

    if (!email) throw new Error("Please provide email");
    if (!password) throw new Error("Please provide password");
    if (!name) throw new Error("Please provide name");

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        error: true,
        success: false,
      });
    }

    // Hash password before saving
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create new user
    const userData = new userModel({
      email,
      password: hashedPassword,
      name,
      profilePic,
    });
    // Save user to the database
    // console.log("userData saved", userData);
    const savedUser = await userData.save();

    return res.status(201).json({
      message: "User created successfully",
      data: savedUser,
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error during user signup:", error);
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;
