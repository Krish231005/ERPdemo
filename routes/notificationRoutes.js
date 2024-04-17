const express = require('express');
const router = express.Router();
const notificationController = require('../controller/notificationController');

router.get('/notification',notificationController.getLatestBoughtProduct);

module.exports = router;
