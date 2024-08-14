const express = require('express');
const {
    createPayment,
    getPaymentByOrderId,
    updatePaymentStatus,
    refundPayment
} = require('../controllers/payment.controller');

const router = express.Router();

router.post('/', createPayment);
router.get('/:orderId', getPaymentByOrderId);
router.put('/:id', updatePaymentStatus);
router.post('/refund/:id', refundPayment);

module.exports = router;
