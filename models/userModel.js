const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: String,

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    address: {
      type: String,
    },
    contact: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    registrationDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
