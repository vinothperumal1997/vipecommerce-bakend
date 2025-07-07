const bcrypt = require("bcryptjs");
const SellerModel = require("../../models/sellerModel");

const sellerSignUp = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      alterphone,
      password,
      businessName,
      gstNumber,
      address,
      sellerPinCode,
      availableAreas,
      productCategories,
      accountHolderName,
      upiId,
      accountNumber,
      ifscCode,
      bankName,
      profilePic,
    } = req.body;

    // Check if seller already exists
    const existingSeller = await SellerModel.findOne({ email });
    if (existingSeller) {
      return res
        .status(400)
        .json({ success: false, message: "Already Seller  Exists" });
    }

    // Hash password before saving (using bcrypt)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newSeller = new SellerModel({
      name,
      email,
      phone,
      alterphone, // Now included
      password: hashedPassword,
      businessName,
      gstNumber,
      address,
      sellerPinCode,
      availableAreas, // Added
      productCategories, // Includes custom categories
      status: "pending", // Ensuring default status
      profilePic,
      passwordChangeDate: new Date(),

      bankDetails: {
        accountHolderName,
        upiId,
        accountNumber,
        ifscCode,
        bankName,
      },
    });

    await newSeller.save();

    res
      .status(201)
      .json({
        success: true,
        error: false,
        message: "Seller registered successfully",
      });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: true,
      message: err.message || err || "Server error",
    });
  }
};

module.exports = sellerSignUp;
