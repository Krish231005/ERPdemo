const mongoose = require('mongoose');
mongoose.set('debug',true)
mongoose.connect('mongodb://localhost:27017/newDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
module.exports = mongoose.connection;