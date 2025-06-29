const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

// Example using Express + Mongoose
router.post("/add", async (req, res) => {
  try {
    const { name, slug, imageUrl, status } = req.body;

    // Validation
    if (!name || !slug || !imageUrl || !status) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // Optional: check for duplicates
    const existing = await Category.findOne({ slug });
    if (existing) {
      return res.status(409).json({ message: "Category already exists" });
    }

    // Create and save
    const newCategory = new Category({ name, slug, imageUrl, status });
    await newCategory.save();

    res.status(201).json({ message: "Category added", category: newCategory });
  } catch (error) {
    console.error("🔥 Error saving category:", error);
    res.status(500).json({
      message: "Error saving category",
      error: error.message || "Unknown error",
    });
  }
});
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json({ categories });
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
});
module.exports = router;
