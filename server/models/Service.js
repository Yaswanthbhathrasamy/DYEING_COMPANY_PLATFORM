const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true }, // e.g., 'Cotton Dyeing', 'Polyester', 'Printing'
    indicativePrice: { type: Number, required: true }, // Per kg or unit
    imageUrl: { type: String, default: 'https://placehold.co/600x400?text=Service' },
    isActive: { type: Boolean, default: true },
    materialType: { type: String, enum: ['Fabric', 'Yarn', 'Both'], default: 'Fabric' },
    unit: { type: String, enum: ['kg', 'meter'], default: 'kg' },
    createdAt: { type: Date, default: Date.now },
});

ServiceSchema.index({ isActive: 1, createdAt: -1 });

module.exports = mongoose.model('Service', ServiceSchema);
