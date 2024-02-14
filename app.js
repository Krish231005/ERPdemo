const express = require('express');
const mongooseConnection = require('./db/connection');
var cors = require('cors');
const api = require('./api/allApi');
const app = express();
 app.use(cors());
// app.use(express.json());
// app.options('*', cors());
mongooseConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongooseConnection.once('open', () => {
  console.log('Connected to MongoDB');
  app.use('/api',api);
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});