const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true }, // e.g., 'Cotton Dyeing', 'Polyester', 'Printing'
    indicativePrice: { type: Number, required: true }, // Per kg or unit
    imageUrl: { type: String, default: 'https://placehold.co/600x400?text=Service' }, // Static placeholder for now
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Service', ServiceSchema);
