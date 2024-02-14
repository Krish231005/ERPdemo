const mongoose = require("mongoose");

const productImageSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }
});

const ProductImage = mongoose.model("ProductImage", productImageSchema);

module.exports = ProductImage;
