const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image_url: String,
    available: { type: Boolean, default: true },
    tags: [String],
  },
  { timestamps: true, collection: "menuItems" }
);

module.exports = mongoose.model("MenuItem", menuItemSchema);
