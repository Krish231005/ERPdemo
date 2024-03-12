const express = require('express');
const router = express.Router();
const salesController = require('../controller/salesController');
router.post('/create', salesController.createSale);
router.get('/show', salesController.getSales);
module.exports = router;
