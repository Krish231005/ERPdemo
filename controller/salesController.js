const Sales = require("../models/sales");
const Product = require("../models/product");
const successResponse = require("../responses/successResponse");
const errorResponse = require("../responses/errorResponse");
const nodemailer = require("nodemailer");
const generateBillPDF = require("../src/billGenerator");
const sendEmail = require("../src/emailSender");
const path = require("path");

let billNumber = 1; 


const salesController = {
  createSale: async (req, res) => {
    try {
      const { customer, customermail, products } = req.body;

      const createdSales = [];

      for (const productData of products) {
        const { productId, quantity } = productData;

        // Find the product by its ID
        const product = await Product.findById(productId);

        if (!product) {
          return errorResponse(res, 404, "Product not found");
        }

        if (product.inventory < quantity) {
          return errorResponse(res, 400, "Insufficient inventory");
        }

        // Deduct the quantity from inventory
        product.inventory -= quantity;
        await product.save();

        // Calculate the amount
        const price = product.price;
        const amount = price * quantity;

        // Create a new sale object
        const newSale = new Sales({
          customer,
          customermail,
          product: {
            productId: product._id, // Use product._id as ObjectId
            productName: product.name, // Storing product name along with ID
          },
          quantity,
          price,
          amount,
          date: new Date()
        });

        // Save the sale to the database
        const savedSale = await newSale.save();

        // Add the saved sale to the createdSales array
        createdSales.push(savedSale);
      }

      // Generate bill PDF
      const billData = {
        customerName: customer,
        customermail: customermail,
        sales: createdSales,
      };
      const pdfFilePath = `pdfs/bill_${Date.now()}.pdf`; // Unique filename
      generateBillPDF(billData, pdfFilePath);

      // Send email with bill PDF attached
      const emailSubject = "Your Purchase Receipt";
      const emailBody = "Thank you for your purchase.";
      await sendEmail(customermail, emailSubject, emailBody, pdfFilePath);

      // Send success response with array of created sales
      successResponse(res, createdSales, "Sales created successfully");

      // Send success message for email sent
      console.log(`Email sent successfully to ${customermail}`);
    } catch (error) {
      console.error(error);
      errorResponse(res, 500, "Internal Server Error", error);
    }
  },

  getSales: async (req, res) => {
    try {
      let sales = await Sales.find(
        {},
        {
          customer: 1,
          customermail: 1,
          product: 1,
          quantity: 1,
          amount: 1,
          date: 1,
        }
      ).populate("product");

      // Convert date to desired format
      sales = sales.map((sale) => ({
        customer: sale.customer,
        customermail: sale.customermail,
        product: sale.product,
        quantity: sale.quantity,
        amount: sale.amount,
        date: sale.date.toISOString().split("T")[0], // Extracting only the date part
      }));

      // const timestamp = Date.now(); // Get the current timestamp
      // const fileName = `bill_${billNumber}_${timestamp}.pdf`; // Construct the file name with a timestamp
      // const filePath = path.join(__dirname, "../pdfs", fileName); // Define the path where PDF will be saved

      // billNumber++;
      // generateBillPDF({ customerName: sales[0].customer, customermail: sales[0].customermail, sales }, filePath);
      // const responseData = {
      //   sales,
      //   pdfFilePath: filePath,
      // };
  
  

      successResponse(res,sales, "Sales retrieved successfully");
    } catch (error) {
      console.error(error);
      errorResponse(res, 500, "Internal Server Error", error);
    }
  },
};

module.exports = salesController;