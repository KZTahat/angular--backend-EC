const express = require('express');
const {
    getReviewsByProductId,
    addReview,
    updateReview,
    deleteReview
} = require('../controllers/review.controller');

const router = express.Router();

router.get('/:productId', getReviewsByProductId);
router.post('/', addReview);
router.put('/:reviewId', updateReview);
router.delete('/:reviewId', deleteReview);

module.exports = router;
