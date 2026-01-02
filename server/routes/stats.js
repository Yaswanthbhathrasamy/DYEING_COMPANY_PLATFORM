const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Quote = require('../models/Quote');
const Order = require('../models/Order');
const Service = require('../models/Service'); // Use mongoose.model('Service') if file not found, but pattern suggests it exists or we mock

// Get Stats
router.get('/', auth, async (req, res) => {
    try {
        const role = req.user.role;
        const userId = req.user.id;

        let activeQuotes = 0;
        let ordersInProgress = 0;
        let completedOrders = 0;

        // Count active services (global)
        // Check if Service model exists or use generic count
        let serviceCount = 0;
        try {
            const ServiceModel = require('../models/Service');
            serviceCount = await ServiceModel.countDocuments();
        } catch (e) {
            // If model file not standard
            const mongoose = require('mongoose');
            if (mongoose.models.Service) {
                serviceCount = await mongoose.model('Service').countDocuments();
            }
        }

        if (role === 'admin') {
            activeQuotes = await Quote.countDocuments({ status: 'pending' });
            ordersInProgress = await Order.countDocuments({ status: { $nin: ['completed', 'cancelled'] } });
            completedOrders = await Order.countDocuments({ status: 'completed' });
        } else {
            activeQuotes = await Quote.countDocuments({ buyer: userId, status: 'pending' });
            ordersInProgress = await Order.countDocuments({ buyer: userId, status: { $nin: ['completed', 'cancelled'] } });
            completedOrders = await Order.countDocuments({ buyer: userId, status: 'completed' });
        }

        res.json({
            activeQuotes,
            ordersInProgress,
            completedOrders,
            serviceCount
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
