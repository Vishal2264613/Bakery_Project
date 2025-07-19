const Category = require("../models/Category");

// ➕ Add a new category
exports.addCategory = async (req, res) => {
  try {
    const { name, slug, imageUrl, status } = req.body;

    if (!name || !slug || !imageUrl || !status) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const existing = await Category.findOne({ slug });
    if (existing) {
      return res.status(409).json({ message: "Category already exists" });
    }

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
};

// 📥 Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json({ categories });
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

// 🖊️ Update category
exports.updateCategory = async (req, res) => {
  try {
    const { name, slug, imageUrl, status } = req.body;

    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      { name, slug, imageUrl, status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category updated", category: updated });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Failed to update category" });
  }
};

// ❌ Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted", category: deleted });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Failed to delete category" });
  }
};
