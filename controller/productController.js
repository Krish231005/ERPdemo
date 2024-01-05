// const bcrypt = require('bcrypt');

// const registerUser = async (dbConnection, req, res) => {
//   try {
//     const { username, password } = req.body;
//     const db = dbConnection.collection('loginapi');

//     const existingUser = await db.findOne({ username });

//     if (existingUser) {
//       return res.status(400).json({ message: 'Username already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const result = await db.insertOne({
//       username,
//       password: hashedPassword
//     });

//     if (result.insertedCount === 1) {
//       res.json({ message: 'User registered successfully' });
//     } else {
//       res.status(500).json({ message: 'Error registering user' });
//     }
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// module.exports = { registerUser };
const Product=require('../models/product');
const productCRUD={
    createProduct: async (req, res) => {
    try {
        const { name, price} = req.body;
        const newProduct = new Product({ name, price});
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },
    findProduct: async (req,res)=>{
        try{
        const Products= await Product.find();
        res.json(Products);
    }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
    },
    getById: async (req, res) => {
        try {
          const productId = req.params.id;
          const product = await Product.findById(productId);
          if (!product) {
            return res.status(404).json({ error: 'Product not found' });
          }
          res.json(product);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },
    updateById: async (req, res) => {
        try {
          const productId = req.params.id;
          const { name, price } = req.body;
          const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { name, price },
            { new: true }
          );
          if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
          }
          res.json(updatedProduct);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },
      deleteById: async (req, res) => {
        try {
          const productId = req.params.id;
          const deletedProduct = await Product.findByIdAndDelete(productId);
          if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
          }
          res.json(deletedProduct);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },
    };
    
module.exports=productCRUD;