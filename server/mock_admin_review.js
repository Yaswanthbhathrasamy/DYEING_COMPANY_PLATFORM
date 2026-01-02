const mongoose = require('mongoose');
const Quote = require('./models/Quote');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Find latest quote
        const quote = await Quote.findOne().sort({ createdAt: -1 });
        if (!quote) {
            console.log('No quotes found.');
            process.exit(1);
        }

        quote.status = 'reviewed';
        quote.adminResponse = {
            price: 50000,
            notes: 'Verified via Script. Price includes GST.'
        };
        await quote.save();

        console.log(`Quote ${quote._id} updated to REVIEWED.`);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

connectDB();
