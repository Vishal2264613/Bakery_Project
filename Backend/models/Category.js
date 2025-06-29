// models/Category.js
const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["active", "inactive"], // Ensuring only "active" or "inactive" can be set
      default: "active", // Default value will be "active"
    },
  },
  { timestamps: true, collection: "categories" }
);

module.exports = mongoose.model("Category", CategorySchema);
