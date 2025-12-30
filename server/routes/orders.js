const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create Order (Admin Only - from Accepted Quote)
router.post('/', async (req, res) => {
    try {
        const { quoteId, buyerId } = req.body;

        const newOrder = new Order({
            quote: quoteId,
            buyer: buyerId,
            status: 'pending',
            timeline: [{ status: 'pending', note: 'Order Created' }]
        });

        const savedOrder = await newOrder.save();

        // Notify Buyer
        req.io.to(`user_${buyerId}`).emit('order_update', { type: 'NEW_ORDER', order: savedOrder });

        res.json(savedOrder);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Get Orders
router.get('/', async (req, res) => {
    try {
        const { userId, role } = req.query;
        let orders;
        if (role === 'admin') {
            orders = await Order.find()
                .populate('buyer', 'name companyName')
                .populate({
                    path: 'quote',
                    populate: { path: 'items.service' }
                });
        } else {
            orders = await Order.find({ buyer: userId })
                .populate({
                    path: 'quote',
                    populate: { path: 'items.service' }
                });
        }
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Update Order Status (Admin)
router.put('/:id/status', async (req, res) => {
    try {
        const { status, note } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) return res.status(404).json({ message: 'Order not found' });

        order.status = status;
        order.timeline.push({ status, note });
        await order.save();

        // Notify Buyer
        req.io.to(`user_${order.buyer}`).emit('order_update', { type: 'ORDER_STATUS_UPDATE', order });

        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
