const ProductImage = require("../models/productImage");
const Product = require("../models/product");
const successResponse = require("../responses/successResponse");
const errorResponse = require("../responses/errorResponse");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const productController = {
  createProduct: async (req, res) => {
    try {
      const { name, price, inventory } = req.body;

      if (!req.file) {
        return errorResponse(res, 400, "Image file is required");
      }
      const image = req.file;
      const imageUrl = `C:\\Users\\krish\\OneDrive\\Pictures\\products\\${image.filename}`;
      const newProductImage = new ProductImage({
        imageUrl: imageUrl,
        productId: null
      });
      const savedProductImage = await newProductImage.save();
      const newProduct = new Product({
        name,
        price,
        inventory
      });
      const savedProduct = await newProduct.save();
      savedProductImage.productId = savedProduct._id;
      await savedProductImage.save();
      successResponse(res, { product: savedProduct, image: savedProductImage }, "Product created successfully");
    } catch (error) {
      console.error(error);
      errorResponse(res, 500, "Internal Server Error", error);
    }
  },

  getProducts: async (req, res) => {
    try {
      const products = await Product.aggregate([
        {
          $lookup: {
            from: "productimages",
            localField: "_id",
            foreignField: "productId",
            as: "images"
          }
        }
      ]);
      successResponse(res, products, "Products retrieved successfully");
    } catch (error) {
      console.error(error);
      errorResponse(res, 500, "Internal Server Error", error);
    }
  },

  getProductDetails: async (req, res) => {
    try {
      const productId = req.params.id;
      console.log('test', productId);
      const productDetails = await Product.aggregate([
        {
          $match: { _id: new ObjectId(productId) }
        },
        {
          $lookup: {
            from: "productimages",
            localField: "_id",
            foreignField: "productId",
            as: "images"
          }
        }
      ]);

      if (productDetails.length === 0) {
        return errorResponse(res, 404, "Product not found");
      }

      successResponse(res, productDetails[0], "Product details retrieved successfully");
    } catch (error) {
      console.error(error);
      errorResponse(res, 500, "Internal Server Error", error); // Pass the error object to the error response
    }
  }

};

module.exports = productController;
