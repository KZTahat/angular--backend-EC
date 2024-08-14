// controllers/productController.js
const Product = require('../models/Product.model');

// Fetch all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fetch a single product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a review to a product
const addReview = async (req, res) => {
    try {
        const { productId } = req.params;
        const { rating, review } = req.body;

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const newReview = {
            userId: req.user.id, // Assuming req.user contains the authenticated user
            rating,
            review,
        };

        product.ratings.push(newReview);

        // Calculate the average rating
        product.averageRating =
            product.ratings.reduce((sum, rating) => sum + rating.rating, 0) /
            product.ratings.length;

        await product.save();
        res.status(201).json({ message: 'Review added successfully', product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fetch reviews for a product
const getReviews = async (req, res) => {
    try {
        const { productId } = req.params;

        const product = await Product.findById(productId).select('ratings');
        if (!product) return res.status(404).json({ message: 'Product not found' });

        res.json(product.ratings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new product (Admin only)
const createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an existing product (Admin only)
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a product by ID (Admin only)
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    addReview,
    getReviews,
};