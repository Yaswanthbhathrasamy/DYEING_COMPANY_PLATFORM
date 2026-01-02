const mongoose = require('mongoose');
require('dotenv').config();

const uri = 'mongodb://localhost:27017/dyeing-platform';
console.log('Connecting to:', uri);

mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
    .then(() => {
        console.log('Connected!');
        process.exit(0);
    })
    .catch(err => {
        console.error('Error:', err);
        process.exit(1);
    });
