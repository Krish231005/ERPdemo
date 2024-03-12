const ProductImage = require("../models/productImage");
const Product = require("../models/product");
const successResponse = require("../responses/successResponse");
const errorResponse = require("../responses/errorResponse");
const mongoose = require('mongoose');
const fs = require('fs');
const ObjectId = mongoose.Types.ObjectId;

const productController = {

  
  createProduct: async (req, res) => {
    try {
      const { name, price, inventory, category } = req.body;

      if (!req.file) {
        return errorResponse(res, 400, "Image file is required");
      }

      const image = req.file;
      const imageBuffer = fs.readFileSync(image.path); // Read the image file as a buffer

      // Create a new ProductImage document to store the image data
      const newProductImage = new ProductImage({
        requestfile: {
          data: imageBuffer,
          contentType: image.mimetype
        },
        productId: null // Initialize productId to be set later
      });

      // Save the ProductImage document to get its _id
      const savedProductImage = await newProductImage.save();

      // Create a new Product document and associate it with the ProductImage _id
      const newProduct = new Product({
        name,
        price,
        inventory,
        category
      });

      // Save the Product document to get its ObjectId
      const savedProduct = await newProduct.save();

      // Update the productId field in the ProductImage document with the ObjectId of the saved Product
      savedProductImage.productId = savedProduct._id;
      await savedProductImage.save();

      successResponse(res, { product: savedProduct }, "Product created successfully");
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

      // Modify products array to include only image data
      const productsWithImages = products.map(product => {
        return {
          _id: product._id,
          name: product.name,
          price: product.price,
          inventory: product.inventory,
          category: product.category,
          image: product.images.length > 0 ? {
            data: product.images[0].requestfile.data.toString('base64'), // Convert buffer to base64
            contentType: product.images[0].requestfile.contentType
          } : null
        };
      });

      successResponse(res, productsWithImages, "Products retrieved successfully");
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
  },
  getProductsByCategory: async (req, res) => {
    try {
      const { category } = req.params;

      const products = await Product.aggregate([
        {
          $match: { category } // Filter products by category
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

      if (products.length === 0) {
        return errorResponse(res, 404, "No products found for the given category");
      }

      successResponse(res, products, "Products retrieved successfully");
    } catch (error) {
      console.error(error);
      errorResponse(res, 500, "Internal Server Error", error);
    }
  }
};


module.exports = productController;
