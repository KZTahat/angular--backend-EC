// controllers/reviewController.js
const Review = require('../models/Review.model');

// Fetch all reviews for a specific product
const getReviewsByProductId = async (req, res) => {
    try {
        const reviews = await Review.find({ productId: req.params.productId });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new review for a product
const addReview = async (req, res) => {
    try {
        const { productId, rating, review } = req.body;

        const newReview = new Review({
            userId: req.user.id,
            productId,
            rating,
            review,
        });

        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an existing review
const updateReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const updatedReview = await Review.findByIdAndUpdate(reviewId, req.body, { new: true });

        if (!updatedReview) return res.status(404).json({ message: 'Review not found' });
        res.json(updatedReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a review
const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const deletedReview = await Review.findByIdAndDelete(reviewId);

        if (!deletedReview) return res.status(404).json({ message: 'Review not found' });
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getReviewsByProductId,
    addReview,
    updateReview,
    deleteReview,
};
