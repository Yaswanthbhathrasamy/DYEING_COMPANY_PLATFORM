const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quote: { type: mongoose.Schema.Types.ObjectId, ref: 'Quote', required: true },
    status: {
        type: String,
        enum: ['pending', 'dyeing', 'washing', 'drying', 'quality_check', 'dispatched', 'completed'],
        default: 'pending'
    },
    timeline: [
        {
            status: String,
            timestamp: { type: Date, default: Date.now },
            note: String
        }
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
