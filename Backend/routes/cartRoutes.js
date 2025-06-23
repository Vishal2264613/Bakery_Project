const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const authenticateJWT = require("../middleware/authenticate");

// ✅ Add to Cart
router.post("/", authenticateJWT, async (req, res) => {
  const userId = req.user.id;
  const product = req.body.product;

  if (!product || !product.productId) {
    return res.status(400).json({ message: "Invalid product data" });
  }

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [product] });
    } else {
      const existingItem = cart.items.find(
        (item) => item.productId === product.productId
      );
      if (existingItem) {
        existingItem.quantity += product.quantity;
      } else {
        cart.items.push(product);
      }
      cart.updatedAt = new Date();
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Get Cart Items
router.get("/", authenticateJWT, async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    res.status(200).json(cart.items);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Delete Cart Item
router.delete("/:productId", authenticateJWT, async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.productId;

  if (!productId) {
    return res.status(400).json({ message: "Product ID required" });
  }

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const initialLength = cart.items.length;
    cart.items = cart.items.filter((item) => item.productId !== productId);

    if (cart.items.length === initialLength) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    cart.updatedAt = new Date();
    await cart.save();

    res.status(200).json({ message: "Item removed from cart successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
