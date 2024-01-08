const mongoose = require('mongoose');
const salesSchema = new mongoose.Schema({
  product: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Sales = mongoose.model('Sales', salesSchema);

module.exports = Sales;
