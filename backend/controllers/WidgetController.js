const Widget = require('../models/Widjet');

// Save or Update Widget Configuration
exports.saveConfig = async (req, res) => {
    try {
        const { botName, welcomeMessage, mainColor, position, userId } = req.body;
        
        // Use findOneAndUpdate so the user doesn't create 100 bots by accident
        const config = await Widget.findOneAndUpdate(
            { userId }, 
            { botName, welcomeMessage, mainColor, position },
            { new: true, upsert: true }
        );

        res.status(200).json({ success: true, data: config });
    } catch (err) {
        res.status(500).json({ success: false, error: "Failed to save configuration" });
    }
};

// Fetch Config for the Embeddable Widget
// This is the public route called by test.html
exports.getConfig = async (req, res) => {
    try {
        const { id } = req.params;
        // FIX: Ensure you are searching by _id, not userId
        const config = await Widjet.findById(id); 

        if (!config) {
            return res.status(404).json({ message: "Bot configuration not found" });
        }
        res.json(config);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};