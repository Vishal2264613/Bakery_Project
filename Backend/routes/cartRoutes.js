const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Cart = require('../models/Cart');
require('dotenv').config();

// Add to cart route with inline JWT verification
router.post('/', async (req, res) => {
  // Extract token from Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Missing token' });

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }

  const userId = decoded.id; // make sure your token payload contains `id`
  console.log(userId);
  

  const product = req.body.product;
  if (!product || !product.productId) {
    return res.status(400).json({ message: 'Invalid product data' });
  }

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [product],
      });
    } else {
      const existingItem = cart.items.find(item => item.productId === product.productId);
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
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET route to fetch cart items for user with inline JWT verification
router.get('/', async (req, res) => {
  console.log("GET /api/cart called");
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Missing token' });

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }

  const userId = decoded.id;
  console.log("GET userId:", userId); 

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart is empty' });

    res.status(200).json(cart.items);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
