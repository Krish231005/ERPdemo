const express = require('express');
const mongooseConnection = require('./db/connection');
const productRoutes = require('./routes/productRoutes'); 
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const salesRoutes = require('./routes/salesRoutes');
const app = express();
app.use(bodyParser.json());
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/sales', salesRoutes);
mongooseConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongooseConnection.once('open', () => {
  console.log('Connected to MongoDB');
  
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});