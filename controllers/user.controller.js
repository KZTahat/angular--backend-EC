// controllers/userController.js
const User = require('../models/User.model');

// Fetch the profile of the authenticated user
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update the profile of the authenticated user
const updateUserProfile = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a product to the user's wishlist
const addToWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.wishlist.push(req.body.productId);
        await user.save();
        res.json({ message: 'Product added to wishlist' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove a product from the user's wishlist
const removeFromWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.wishlist = user.wishlist.filter(item => item.toString() !== req.body.productId);
        await user.save();
        res.json({ message: 'Product removed from wishlist' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fetch all items in the user's wishlist
const getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('wishlist');
        res.json(user.wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fetch all users (Admin only)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fetch a specific user by their ID (Admin only)
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a user (Admin only)
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUserProfile,
    updateUserProfile,
    getAllUsers,
    getUserById,
    deleteUser,
    addToWishlist,
    removeFromWishlist,
    getWishlist,
};
