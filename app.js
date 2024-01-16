const express = require('express');
const mongooseConnection = require('./db/connection');
const api = require('./api/allApi');
const app = express();

mongooseConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongooseConnection.once('open', () => {
  console.log('Connected to MongoDB');
  app.use('/api',api);
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});