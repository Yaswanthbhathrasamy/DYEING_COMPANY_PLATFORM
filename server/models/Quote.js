const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
            quantity: { type: Number, required: true }, // e.g. weight in Kg
            notes: String,
        }
    ],
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'accepted', 'rejected'],
        default: 'pending'
    },
    adminResponse: {
        price: Number, // Final quoted price
        notes: String,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quote', QuoteSchema);
