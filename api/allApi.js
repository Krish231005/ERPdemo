const express = require('express');
const productRoutes = require('../routes/productRoutes'); 
const userRoutes = require('../routes/userRoutes');
const salesRoutes = require('../routes/salesRoutes');
const upload=require('../routes/uploadRoutes')
const app = express();
app.use(express.json());
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/sales', salesRoutes);
app.use('/upload',upload);
module.exports = app;