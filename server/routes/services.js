const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
// Can add admin middleware later for CUD operations

// Get All Services (Public)
router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Create Service (Admin Only - simplified checks for now)
router.post('/', async (req, res) => {
    try {
        const { name, description, category, indicativePrice, imageUrl } = req.body;
        const newService = new Service({
            name,
            description,
            category,
            indicativePrice,
            imageUrl
        });
        const service = await newService.save();
        res.json(service);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Update Service
router.put('/:id', async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(service);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Delete Service
router.delete('/:id', async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.json({ message: 'Service removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
