const express = require('express');
const {
    createOrder,
    getOrderById,
    getAllOrders,
    updateOrderStatus,
    cancelOrder,
} = require('../controllers/order.controller');

const router = express.Router();

router.post('/', createOrder);
router.get('/:id', getOrderById);
router.get('/', getAllOrders);
router.put('/:id', updateOrderStatus);
router.delete('/:id', cancelOrder);

module.exports = router;
