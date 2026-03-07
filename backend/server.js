const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. Updated CORS to include OPTIONS for JWT headers
// 1. Updated CORS configuration
const corsOptions = {
    origin: [
        'https://chatbot-platform-jade.vercel.app',
        'http://localhost:3000',
        'null'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
};

// Use the cors middleware for ALL routes, including OPTIONS
app.use(cors(corsOptions));

// REMOVE the app.options('(.*)', cors()) line entirely.
// The app.use(cors()) above handles preflight (OPTIONS) automatically.

app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// 2. NEW: Auth Routes for Login/Register
app.use('/api/auth', require('./routes/authRoutes'));

// 3. Widget Routes (Existing)
// NOTE: Internal routes in widjetRoutes should now use auth middleware
app.use('/api/widget', require('./routes/widjetRoutes'));

// Mock Chat Endpoint
app.post('/api/chat', (req, res) => {
    const { message } = req.body;
    let reply = "I'm a mock bot. You asked: " + message;
    if (message.toLowerCase().includes("delta4")) reply = "Delta4 Infotech is a great place to work!";
    setTimeout(() => res.json({ reply }), 1000);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));