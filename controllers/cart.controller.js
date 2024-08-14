// controllers/cartController.js
const Cart = require('../models/Cart.model');

// Fetch the current cart for the authenticated user
const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add an item to the cart
const addToCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        const { productId, quantity } = req.body;

        if (cart) {
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ productId, quantity });
            }

            await cart.save();
            res.json(cart);
        } else {
            const newCart = new Cart({
                userId: req.user.id,
                items: [{ productId, quantity }],
            });

            await newCart.save();
            res.status(201).json(newCart);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update the quantity of a specific item in the cart
const updateCartItem = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        const { productId, quantity } = req.body;

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity;

            if (quantity === 0) {
                cart.items.splice(itemIndex, 1);
            }

            await cart.save();
            res.json(cart);
        } else {
            res.status(404).json({ message: 'Item not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove an item from the cart
const removeFromCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        const { productId } = req.body;

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (itemIndex > -1) {
            cart.items.splice(itemIndex, 1);
            await cart.save();
            res.json(cart);
        } else {
            res.status(404).json({ message: 'Item not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Clear all items from the cart
const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOneAndDelete({ userId: req.user.id });
        res.json({ message: 'Cart cleared successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
};
