const Sales = require('../models/sales');
const Product = require('../models/product');
const successResponse = require('../responses/successResponse');
const errorResponse = require('../responses/errorResponse');

const notificationController = {
  getLatestBoughtProduct: async (req, res) => {
    try {
        const latestInventory = {};

        // Find all sales sorted by date in descending order
        const sales = await Sales.find().sort({ date: -1 });

        // Iterate through each sale to get the latest inventory for each product
        for (const sale of sales) {
            const { productId } = sale.product;
            
            // If the product is not already in the latest inventory object, add it
            if (!latestInventory[productId]) {
                const product = await Product.findById(productId);

                // If the product is found, add it to the latest inventory object
                if (product) {
                    latestInventory[productId] = {
                        productName: product.name,
                        inventory: product.inventory
                    };
                }
            }
        }

        // Convert latest inventory object to an array of values
        const latestInventoryArray = Object.values(latestInventory);

        // Check if today's date matches the specified day for monthly report
        const currentDate = new Date();
        const monthlyReportDay = 29; // Example: Set the 15th day of each month for the report
        if (currentDate.getDate() === monthlyReportDay) {
            return successResponse(res,latestInventoryArray,  'Your report of last month is ready.' );
        }

        successResponse(res, latestInventoryArray);
    } catch (error) {
        console.error(error);
        errorResponse(res, 500, 'Internal Server Error', error);
    }
}
};

module.exports = notificationController;
