const successResponse = require('../responses/successResponse');
const errorResponse = require('../responses/errorResponse');
const Sales = require('../models/sales');
const Product = require('../models/product');
const notificationController = {
    getRecentInventory: async (req, res) => {
        try {
          // Find all sales sorted by date in ascending order
          const sales = await Sales.find().sort({ date: 1 }).populate('product');
    
          if (!sales || sales.length === 0) {
            return errorResponse(res, 404, 'No sales found');
          }
    
          // Object to store the latest inventory state of each product
          const latestInventory = {};
    
          // Iterate through the sales to extract the latest inventory of each product
          for (const sale of sales) {
            const { product } = sale;
            const { name, inventory } = product;
    
            // Only include the latest inventory state of each product
            if (!latestInventory[name]) {
              latestInventory[name] = inventory;
            }
          }
    
          // Convert latest inventory object into array format
          const inventoryInfo = Object.keys(latestInventory).map(productName => ({
            productName,
            remainingInventory: latestInventory[productName]
          }));
    
          successResponse(res, inventoryInfo, 'Recent inventory fetched successfully');
        } catch (error) {
          console.error(error);
          errorResponse(res, 500, 'Internal Server Error', error);
        }
      },
    };
  module.exports = notificationController;
  