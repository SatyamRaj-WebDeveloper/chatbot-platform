const express = require('express');
const router = express.Router();
const widgetController = require('../controllers/WidgetController.js');
const auth = require('../middleware/auth');

// 1. Correct Model Import
// Ensure the path and name match your 'Widjet' model file
const Widjet = require('../models/Widjet'); 

// 2. Get the bot owned by the logged-in user
// Inside widgetRoutes.js
router.get('/user-bot', auth, async (req, res) => {
    try {
      let bot = await Widjet.findOne({ userId: req.user.id }); 
      
      if (!bot) {
        // You MUST provide both userId AND owner to satisfy your schema
        bot = new Widjet({ 
            userId: req.user.id, 
            owner: req.user.id, // Add this line to fix the ValidationError!
            botName: "Support Bot",
            welcomeMessage: "Hi! How can I help you today?",
            mainColor: "#3b82f6"
        });
        await bot.save();
      }
      res.json(bot);
    } catch (err) {
      console.error("Fetch User Bot Error:", err);
      res.status(500).json({ message: "Error fetching bot" });
    }
});

router.put('/config/:id', auth, async (req, res) => {
    try {
        const bot = await Widjet.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id }, // Match userId here too
            req.body,
            { new: true }
        );
        if (!bot) return res.status(404).json({ message: "Bot not found" });
        res.json(bot);
    } catch (err) {
        res.status(500).json({ message: "Update failed" });
    }
});
router.get('/config/:id', widgetController.getConfig);

module.exports = router;