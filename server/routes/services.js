const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const auth = require('../middlewares/auth');

// Get All Services (Public) - Support ?active=true
router.get('/', async (req, res) => {
    try {
        const { active } = req.query;
        let query = {};
        if (active === 'true') {
            query.isActive = true;
        }
        const services = await Service.find(query).sort({ createdAt: -1 });
        res.json(services);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Create Service (Admin Only)
router.post('/', auth, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    try {
        const { name, description, category, indicativePrice, imageUrl, isActive, materialType, unit } = req.body;
        const newService = new Service({
            name,
            description,
            category,
            indicativePrice,
            imageUrl,
            isActive: isActive !== undefined ? isActive : true,
            materialType: materialType || 'Fabric',
            unit: unit || 'kg'
        });
        const service = await newService.save();
        res.json(service);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Update Service (Admin Only)
router.put('/:id', auth, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(service);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Delete Service (Admin Only)
router.delete('/:id', auth, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.json({ message: 'Service removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
