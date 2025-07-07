const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  alterphone: { type: String },
  password: { type: String, required: true },
  businessName: { type: String, required: true },
  gstNumber: { type: String, required: true },
  address: { type: String, required: true },

  // New Fields
  isVerified: { type: Boolean, default: false }, // Seller verification status
  availableAreas: [{ type: String }], // List of service areas
  productCategories: [{ type: String, required: true }], // Categories seller deals in
  status: {
    type: String,
    enum: ["active", "inactive", "pending"],
    default: "pending",
  },
  passwordChangeDate: { type: Date }, // Date when password was last changed
  profilePic: { type: String },

  bankDetails: {
    accountHolderName: { type: String, required: true }, // Account holder name
    upiId: { type: String },
    accountNumber: { type: String },
    ifscCode: { type: String },
    bankName: { type: String },
  },
});

const SellerModel = mongoose.model("Seller", sellerSchema);
module.exports = SellerModel;
