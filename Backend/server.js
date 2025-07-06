const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON bodies

// Import routes
const authRoutes = require("./routes/auth");
const cartRoutes = require("./routes/cartRoutes");
const menuRoutes = require("./routes/menuItems");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/category");
const heroRoutes = require("./routes/hero"); // ✅ NEW: Hero section
const orderRoutes = require("./routes/orderRoutes.js");
const mailRoutes = require("./routes/mailRoutes.js");

// Mount API routes
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/hero", heroRoutes); // ✅ Add hero route
app.use("/api/orders", orderRoutes);
app.use("/api/mails", mailRoutes);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
