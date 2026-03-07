// Widget.js (at your root or in a models folder)
const mongoose = require('mongoose');

const WidgetSchema = new mongoose.Schema({
  // Link to the user who owns this bot
  userId: { type: String, required: true }, 
  botName: { type: String, default: "Support Bot" },
  welcomeMessage: { type: String, default: "Hi! How can I help you today?" },
  mainColor: { type: String, default: "#3b82f6" },
  position: { type: String, enum: ['left', 'right'], default: 'right' },
  // Requirement: Basic Analytics
  stats: {
    totalConversations: { type: Number, default: 0 },
    messagesSent: { type: Number, default: 0 }
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Widget', WidgetSchema);