const mongoose = require('mongoose');
mongoose.set('debug',true)
mongoose.connect('mongodb+srv://vedantb658:191020@cluster0.hzehkah.mongodb.net/newDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
module.exports = mongoose.connection;