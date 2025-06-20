const Cart = require('../models/Cart');

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const product = req.body.product;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [product]
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
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart is empty' });
    }

    res.status(200).json(cart.items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
