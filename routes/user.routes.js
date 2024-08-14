const express = require('express');
const {
    getUserProfile,
    updateUserProfile,
    getAllUsers,
    getUserById,
    deleteUser,
    addToWishlist,
    removeFromWishlist,
    getWishlist
} = require('../controllers/user.controller');

const router = express.Router();

router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.delete('/:id', deleteUser);
router.post('/wishlist/add', addToWishlist);
router.delete('/wishlist/remove', removeFromWishlist);
router.get('/wishlist', getWishlist);

module.exports = router;
