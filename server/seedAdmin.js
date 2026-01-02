const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const seedAdmin = async () => {
    try {
        console.log('Seeding Admin...');

        const email = 'admin@dyeingcompany.com';
        const password = 'admin123';

        const adminExists = await User.findOne({ email });

        if (adminExists) {
            console.log('Admin user already exists');
            return;
        }

        console.log('Hashing password...');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const adminUser = new User({
            name: 'Admin User',
            email: email,
            password: hashedPassword,
            phone: '9999999999',
            companyName: 'Goodwill Process Dyeworks',
            gstNumber: 'ADMINGST123',
            role: 'admin'
        });

        console.log('Saving admin user...');
        await adminUser.save();
        console.log('Admin user created successfully');
        console.log('Email:', email);
        console.log('Password:', password);
    } catch (err) {
        console.error('Error in seedAdmin:', err);
    }
};

module.exports = seedAdmin;
