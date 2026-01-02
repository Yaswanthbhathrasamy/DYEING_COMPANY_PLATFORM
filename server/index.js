const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}));
app.use(express.json());

// Database Connection
const seedAdmin = require('./seedAdmin');

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected');
        seedAdmin();
    })
    .catch(err => console.log('MongoDB Error:', err));

// Socket.io Setup
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('User Connected:', socket.id);

    // Join Rooms
    socket.on('join_room', (data) => {
        // data can be { userId: '...'} or { role: 'admin' }
        if (data.role === 'admin') {
            socket.join('admin_room');
            console.log(`Socket ${socket.id} joined admin_room`);
        } else if (data.userId) {
            socket.join(`user_${data.userId}`);
            console.log(`Socket ${socket.id} joined user_${data.userId}`);
        }
    });

    socket.on('disconnect', () => {
        console.log('User Disconnected', socket.id);
    });
});

// Make io accessible in routes
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Routes
app.get('/', (req, res) => {
    res.send('Dyeing Platform API is Running');
});
app.use('/api/auth', require('./routes/auth'));
app.use('/api/services', require('./routes/services'));
app.use('/api/quotes', require('./routes/quotes'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/stats', require('./routes/stats'));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
