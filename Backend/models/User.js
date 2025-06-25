const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
  },
  signupDate: {
    type: Date,
    default: Date.now, // sets the default value to the current date and time
  },
  phoneNumber: {
    type: String,
    required: true, // Optional, depending on whether you want to enforce this field
    unique: true, // Optional: To ensure phone number is unique
  },
  status: {
    type: String,
    enum: ["active", "inactive"], // Ensuring only "active" or "inactive" can be set
    default: "active", // Default value will be "active"
  },
});

module.exports = mongoose.model("User", userSchema);
