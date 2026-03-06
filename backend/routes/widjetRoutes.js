const express = require('express');
const router = express.Router();
const widgetController = require('../controllers/WidgetController.js');

// Route for the Dashboard to save data
router.post('/save', widgetController.saveConfig);

// Public route for the Script/Embed to fetch data
router.get('/config/:id', widgetController.getConfig);

module.exports = router;