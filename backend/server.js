const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors()); // Critical for the embeddable script to call your API
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Use Routes - Use the spelling from your folder structure
app.use('/api/widget', require('./routes/widjetRoutes'));

// Mock Chat Endpoint (as previously discussed)
app.post('/api/chat', (req, res) => {
    const { message } = req.body;
    // Improvement: Simple keyword logic for a "smarter" feel
    let reply = "I'm a mock bot. You asked: " + message;
    if(message.toLowerCase().includes("delta4")) reply = "Delta4 Infotech is a great place to work!";
    
    setTimeout(() => res.json({ reply }), 1000);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));