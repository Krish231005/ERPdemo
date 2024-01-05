const express = require('express');
const mongooseConnection = require('./db/connection');
const productRoutes = require('./routes/productRoutes'); 
const userRoutes=require('./routes/userRoutes')
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use('/products', productRoutes);
app.use('/users', userRoutes);
mongooseConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongooseConnection.once('open', () => {
  console.log('Connected to MongoDB');
  
  const port = 3003;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});