const express = require('express');
const router = express.Router();
const notificationController = require('../controller/notificationController');

router.get('', notificationController.getRecentInventory);

module.exports = router;
