const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middlewares/auth');

// Create Order (Admin Only - from Accepted Quote OR Direct Order)
router.post('/', auth, async (req, res) => {
    try {
        const { quoteId, buyerId, items } = req.body;

        let newOrderData = {
            buyer: buyerId || req.user.id, // Allow admin to specify buyer, or default to current user if simplified flow
            timeline: [{ status: 'pending', note: 'Order Created' }]
        };

        if (quoteId) {
            newOrderData.quote = quoteId;
            newOrderData.status = 'pending';
        } else if (items && items.length > 0) {
            // Direct Order Flow
            newOrderData.items = items;
            newOrderData.status = 'pending_approval';
            newOrderData.timeline[0].status = 'pending_approval';
        } else {
            return res.status(400).json({ message: 'Order must have a quote or items' });
        }

        const newOrder = new Order(newOrderData);
        const savedOrder = await newOrder.save();

        // Notify Buyer matches buyerId logic. If req.user.id created it (direct order), this notify might be redundant for self but good for consistency or admin notification system.
        // If Admin created it via quote flow, old logic holds.
        const targetUserId = buyerId || req.user.id;
        if (req.io) {
            req.io.to(`user_${targetUserId}`).emit('order_update', { type: 'NEW_ORDER', order: savedOrder });
            // If direct order, maybe notify admin? (omitted for simplicity as per requirement "make it simple")
        }

        res.json(savedOrder);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Get Orders
router.get('/', auth, async (req, res) => {
    try {
        let orders;
        if (req.user.role === 'admin') {
            orders = await Order.find()
                .populate('buyer', 'name companyName')
                .populate({
                    path: 'quote',
                    populate: { path: 'items.service' }
                })
                .populate('items.service'); // Populate direct items
        } else {
            orders = await Order.find({ buyer: req.user.id })
                .populate({
                    path: 'quote',
                    populate: { path: 'items.service' }
                })
                .populate('items.service'); // Populate direct items
        }
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Update Order Status (Admin)
router.put('/:id/status', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }
        const { status, note, totalAmount } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) return res.status(404).json({ message: 'Order not found' });

        order.status = status;
        if (totalAmount !== undefined) {
            order.totalAmount = totalAmount;
        }
        order.timeline.push({ status, note });
        await order.save();

        // Notify Buyer
        if (req.io) req.io.to(`user_${order.buyer}`).emit('order_update', { type: 'ORDER_STATUS_UPDATE', order });

        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Pay for Order (User)
router.put('/:id/pay', auth, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        if (order.buyer.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        if (order.status !== 'approved') {
            return res.status(400).json({ message: 'Order is not eligible for payment' });
        }

        order.status = 'paid';
        order.timeline.push({ status: 'paid', note: 'Payment Successful' });
        // Generate mock bill/invoice number?
        // order.billingDetails = ... (assuming this comes from profile or input, keeping it simple for now)

        await order.save();

        // Notify Admin (Optional) or emit update
        if (req.io) req.io.to(`user_${order.buyer}`).emit('order_update', { type: 'PAYMENT_SUCCESS', order });

        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
