const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema(
  {
    sectionName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    heading: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image_urls: {
      type: [String],
      default: [],
    },
    opening_hours: {
      type: Map,
      of: String,
      default: undefined,
    },
    content: {
      type: [Object],
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
    collection: "sections",
  }
);

module.exports = mongoose.models.Hero || mongoose.model("Hero", heroSchema);
