const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { unlink } = require('./productRoutes');
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/showuser',userController.showuser);
router.get('/customers',userController.showCustomers)
module.exports = router;