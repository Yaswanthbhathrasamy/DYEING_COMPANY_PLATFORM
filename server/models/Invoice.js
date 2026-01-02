const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    invoiceNumber: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    status: { type: String, enum: ['generated', 'paid', 'overdue'], default: 'generated' },
    date: { type: Date, default: Date.now },
    dueDate: { type: Date }
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
