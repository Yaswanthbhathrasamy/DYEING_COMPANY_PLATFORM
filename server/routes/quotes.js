const express = require('express');
const router = express.Router();
const Quote = require('../models/Quote');
const auth = require('../middlewares/auth');

// Create Quote (Buyer)
router.post('/', auth, async (req, res) => {
    try {
        // req.body should include: items
        const { items } = req.body;
        const newQuote = new Quote({
            buyer: req.user.id,
            items
        });
        const savedQuote = await newQuote.save();

        // Notify Admin
        req.io.to('admin_room').emit('quote_update', { type: 'NEW_QUOTE', quote: savedQuote });

        res.json(savedQuote);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Get Quotes
router.get('/', auth, async (req, res) => {
    try {
        let quotes;
        if (req.user.role === 'admin') {
            quotes = await Quote.find().populate('buyer', 'name companyName').populate('items.service');
        } else {
            quotes = await Quote.find({ buyer: req.user.id }).populate('items.service');
        }
        res.json(quotes);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Respond to Quote (Admin)
router.put('/:id/respond', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }
        const { price, notes } = req.body; // Admin response
        const quote = await Quote.findById(req.params.id);

        if (!quote) return res.status(404).json({ message: 'Quote not found' });

        quote.adminResponse = { price, notes };
        quote.status = 'reviewed';
        await quote.save();

        // Notify Buyer
        req.io.to(`user_${quote.buyer}`).emit('quote_update', { type: 'QUOTE_REVIEWED', quote });

        res.json(quote);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Accept/Reject Quote (Buyer)
router.put('/:id/status', auth, async (req, res) => {
    try {
        const { status, billingDetails } = req.body; // 'accepted' or 'rejected', plus optional billing update
        const quote = await Quote.findById(req.params.id);

        if (!quote) return res.status(404).json({ message: 'Quote not found' });

        // Ensure user owns this quote
        if (quote.buyer.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        quote.status = status;
        await quote.save();

        let order = null;
        let invoice = null;

        if (status === 'accepted') {
            // 1. Update User Billing Details if provided
            const user = await User.findById(req.user.id);
            if (billingDetails) {
                if (billingDetails.companyName) user.companyName = billingDetails.companyName;
                if (billingDetails.gstNumber) user.gstNumber = billingDetails.gstNumber;
                if (billingDetails.billingAddress) user.billingAddress = billingDetails.billingAddress;
                await user.save();
            }

            // 2. Create Order
            order = new Order({
                buyer: req.user.id,
                quote: quote._id,
                status: 'pending',
                totalAmount: quote.adminResponse ? quote.adminResponse.price : 0,
                billingDetails: {
                    companyName: user.companyName,
                    gstNumber: user.gstNumber,
                    billingAddress: user.billingAddress,
                    buyerName: user.name,
                    buyerEmail: user.email,
                    buyerPhone: user.phone
                },
                timeline: [{ status: 'Order Created', note: 'Quote accepted by buyer' }]
            });
            await order.save();

            // 3. Create Invoice
            invoice = new Invoice({
                order: order._id,
                invoiceNumber: `INV-${Date.now()}`, // Simple ID generation
                amount: order.totalAmount,
                status: 'generated',
                dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Due in 7 days
            });
            await invoice.save();

            // Notify Admin
            req.io.to('admin_room').emit('order_update', { type: 'NEW_ORDER', order });
        }

        // Notify Admin of Quote Status Change
        req.io.to('admin_room').emit('quote_update', { type: 'QUOTE_STATUS_CHANGED', quote });

        res.json(quote);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
