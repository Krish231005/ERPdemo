const express = require('express');
const router = express.Router();
const reportController = require('../controller/reportController');
router.get('/monthlysales/:month/:year',reportController.getMonthlySales);
module.exports = router;
