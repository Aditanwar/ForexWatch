require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const alertRoutes = require('./routes/alerts');
const authRoutes = require('./routes/auth');
const cronRoutes = require('./routes/cron'); // New Cron Route

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: '*', // Allow all origins for now (or configure for Vercel app)
    credentials: true
}));
app.use(express.json());

// Database Connection (Cached connection for serverless)
let isConnected = false;
const connectDB = async () => {
    if (isConnected) return;
    try {
        await mongoose.connect(process.env.MONGO_URI);
        isConnected = true;
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB Connection Error:', err);
    }
};

// Connect immediately if running locally
if (process.env.NODE_ENV !== 'production') {
    connectDB();
}

// Ensure DB is connected for every request (Middleware)
app.use(async (req, res, next) => {
    await connectDB();
    next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/cron', cronRoutes); // Mount cron route

app.get('/', (req, res) => {
    res.send('ForexWatch API is running');
});

// Only listen if not in Vercel (Vercel exports the app)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
