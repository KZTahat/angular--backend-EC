// controllers/orderController.js
const Order = require('../models/Order.model');

// Create a new order
const createOrder = async (req, res) => {
    try {
        const newOrder = new Order({ userId: req.user.id, ...req.body });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Fetch all orders for the authenticated user
const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fetch a specific order by ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cancel an order
const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        if (order.orderStatus === 'processing') {
            order.orderStatus = 'canceled';
            await order.save();
            res.json({ message: 'Order canceled successfully', order });
        } else {
            res.status(400).json({ message: 'Order cannot be canceled at this stage' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update the status of an order (Admin only)
const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Fetch all orders (Admin only)
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createOrder,
    getUserOrders,
    getOrderById,
    cancelOrder,
    updateOrderStatus,
    getAllOrders,
};
