// controllers/paymentController.js
const Payment = require('../models/Payment.model');

// Process a new payment for an order
const createPayment = async (req, res) => {
    try {
        const newPayment = new Payment(req.body);
        await newPayment.save();
        res.status(201).json(newPayment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Fetch payment details for a specific order
const getPaymentByOrderId = async (req, res) => {
    try {
        const payment = await Payment.findOne({ orderId: req.params.orderId });
        if (!payment) return res.status(404).json({ message: 'Payment not found' });
        res.json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update the payment status (Admin or Payment Gateway integration)
const updatePaymentStatus = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!payment) return res.status(404).json({ message: 'Payment not found' });
        res.json(payment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Issue a refund for a specific order/payment (Admin only)
const refundPayment = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) return res.status(404).json({ message: 'Payment not found' });

        payment.status = 'refunded';
        await payment.save();
        res.json({ message: 'Payment refunded successfully', payment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createPayment,
    getPaymentByOrderId,
    updatePaymentStatus,
    refundPayment,
};
