// const Product=require('../models/product');
// const productCRUD={
//     createProduct: async (req, res) => {
//     try {
//         const { name, price} = req.body;
//         const newProduct = new Product({ name, price});
//         const savedProduct = await newProduct.save();
//         res.status(201).json(savedProduct);
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//       }
//     },
//     findProduct: async (req,res)=>{
//         try{
//         const Products= await Product.find();
//         res.json(Products);
//     }
//         catch (error) {
//             console.error(error);
//             res.status(500).json({ error: 'Internal Server Error' });
//           }
//     },
//     getById: async (req, res) => {
//         try {
//           const productId = req.params.id;
//           const product = await Product.findById(productId);
//           if (!product) {
//             return res.status(404).json({ error: 'Product not found' });
//           }
//           res.json(product);
//         } catch (error) {
//           console.error(error);
//           res.status(500).json({ error: 'Internal Server Error' });
//         }
//       },
//     updateById: async (req, res) => {
//         try {
//           const productId = req.params.id;
//           const { name, price } = req.body;
//           const updatedProduct = await Product.findByIdAndUpdate(
//             productId,
//             { name, price },
//             { new: true }
//           );
//           if (!updatedProduct) {
//             return res.status(404).json({ error: 'Product not found' });
//           }
//           res.json(updatedProduct);
//         } catch (error) {
//           console.error(error);
//           res.status(500).json({ error: 'Internal Server Error' });
//         }
//       },
//       deleteById: async (req, res) => {
//         try {
//           const productId = req.params.id;
//           const deletedProduct = await Product.findByIdAndDelete(productId);
//           if (!deletedProduct) {
//             return res.status(404).json({ error: 'Product not found' });
//           }
//           res.json(deletedProduct);
//         } catch (error) {
//           console.error(error);
//           res.status(500).json({ error: 'Internal Server Error' });
//         }
//       },
//     };
    
// module.exports=productCRUD;
const Product = require('../models/product');
const successResponse = require('../responses/successResponse');
const errorResponse = require('../responses/errorResponse');
const productController = {
  createProduct: async (req, res) => {
    try {
      const { name, price, inventory } = req.body;
      const newProduct = new Product({ name, price, inventory });
      const savedProduct = await newProduct.save();
      successResponse(res, savedProduct, 'Product created successfully');
    } catch (error) {
      console.error(error);
      errorResponse(res, 500, 'Internal Server Error', error);
    }
  },
  getProducts: async (req, res) => {
    try {
      const products = await Product.find();
      successResponse(res, products, 'Products retrieved successfully');
    } catch (error) {
      console.error(error);
      errorResponse(res, 500, 'Internal Server Error', error);
    }
  },
};
module.exports = productController;