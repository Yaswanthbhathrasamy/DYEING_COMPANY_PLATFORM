const express = require('express');
const router = express.Router();
const Quote = require('../models/Quote');

// Create Quote (Buyer)
router.post('/', async (req, res) => {
    try {
        // req.body should include: buyerId, items
        const { buyerId, items } = req.body;
        const newQuote = new Quote({
            buyer: buyerId,
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
router.get('/', async (req, res) => {
    try {
        const { userId, role } = req.query; // Passed from frontend or middleware
        let quotes;
        if (role === 'admin') {
            quotes = await Quote.find().populate('buyer', 'name companyName').populate('items.service');
        } else {
            quotes = await Quote.find({ buyer: userId }).populate('items.service');
        }
        res.json(quotes);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Respond to Quote (Admin)
router.put('/:id/respond', async (req, res) => {
    try {
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
router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body; // 'accepted' or 'rejected'
        const quote = await Quote.findById(req.params.id);

        if (!quote) return res.status(404).json({ message: 'Quote not found' });

        quote.status = status;
        await quote.save();

        // Notify Admin
        req.io.to('admin_room').emit('quote_update', { type: 'QUOTE_STATUS_CHANGED', quote });

        res.json(quote);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
