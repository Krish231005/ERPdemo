const Sales = require('../models/sales');
const successResponse = require('../responses/successResponse');
const errorResponse = require('../responses/errorResponse');
const { createCanvas } = require('canvas');
const Chart = require('chart.js/auto');

const monthlySalesController = {
    getMonthlySales: async (req, res) => {
        try {
            const { month, year } = req.params;

            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 0, 23, 59, 59, 999);

            const sales = await Sales.find({
                date: {
                    $gte: startDate,
                    $lte: endDate
                }
            }).populate('product');

            const salesByProduct = {};
            let totalSales = 0;
            let totalAmount = 0;

            sales.forEach(sale => {
                const productName = sale.product.productName; // Access productName from nested object
                if (!salesByProduct[productName]) {
                    salesByProduct[productName] = 0;
                }
                salesByProduct[productName] += sale.amount;
                totalSales++;
                totalAmount += sale.amount;
            });

            const labels = Object.keys(salesByProduct);
            const data = Object.values(salesByProduct);

            const width = 600;
            const height = 400;

            // Create canvas
            const canvas = createCanvas(width, height);
            const ctx = canvas.getContext('2d');

            // Set background color
            ctx.fillStyle = 'white'; // Set background color to white
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const chartConfig = {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        data: data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(153, 102, 255, 0.5)',
                            'rgba(255, 159, 64, 0.5)',
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(153, 102, 255, 0.5)',
                            'rgba(255, 159, 64, 0.5)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1,
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: `Monthly Sales (${month}-${year}) by Product`,
                        fontSize: 16,
                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: 'white' // Set label font color to white
                            }
                        }
                    }
                },
            };

            new Chart(ctx, chartConfig);

            // Convert canvas to buffer and save as image
            const chartImage = canvas.toBuffer('image/png');
            const chartImageUrl = `data:image/png;base64,${chartImage.toString('base64')}`;
            const profit= (totalAmount*5)/100; //our margin is 5% for each product
            const responseData = {
                totalSales: totalSales,
                totalAmount: `₹ ${totalAmount}`, // Add rupee symbol in front of total amount
                profit: `₹ ${profit}`, // Add rupee symbol in front of profit
                chartImageUrl: chartImageUrl
            };
            

            successResponse(res, responseData, 'Monthly sales chart retrieved successfully');
        } catch (error) {
            console.error(error);
            errorResponse(res, 500, 'Internal Server Error', error);
        }
    }
};

module.exports = monthlySalesController;
