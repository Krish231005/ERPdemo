const PDFDocument = require("pdfkit");
const fs = require("fs");

function generateBillPDF(billData, filePath) {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath)); // Pipe the PDF content to the file stream

  // Set font and font size
  doc.font("Helvetica").fontSize(12);

  // Add title with styling
  doc.font("Helvetica-Bold").fontSize(18);
  doc.text("Invoice", { align: "center" }).moveDown(0.5);

  // Add customer details with styling
  doc.font("Helvetica-Bold").fontSize(14);
  doc.text("Customer Details:", { underline: true }).moveDown(0.2);
  doc.font("Helvetica").fontSize(12);
  doc
    .text(`Customer Name:`, { continued: true })
    .font("Helvetica")
    .text(`${billData.customerName}`, { align: "right" });
  doc
    .text(`Customer Email:`, { continued: true })
    .font("Helvetica")
    .text(`${billData.customermail}`, { align: "right" });
  doc.moveDown(0.5);

  // Add bill items with styling
  doc.font("Helvetica-Bold").fontSize(14);
  doc.text("Bill Details:", { underline: true }).moveDown(0.2);
  billData.sales.forEach((sale, index) => {
    doc.font("Helvetica-Bold").fontSize(12);
    doc
      .text(`Item ${index + 1}:`, { continued: true })
      .font("Helvetica")
      .text(`${sale.product.productName}`, { align: "right" })
      .moveDown(0.2);
    doc.font("Helvetica").fontSize(12);
    doc
      .text(`Product ID:`, { continued: true })
      .font("Helvetica")
      .text(`${sale.product.productId}`, { align: "right" });
    doc
      .text(`Quantity:`, { continued: true })
      .font("Helvetica")
      .text(`${sale.quantity}`, { align: "right" });
    doc
      .text(`Amount:`, { continued: true })
      .font("Helvetica")
      .text(`INR ${sale.amount}`, { align: "right" });
    doc
      .text(`Date:`, { continued: true })
      .font("Helvetica")
      .text(`${sale.date}`, { align: "right" })
      .moveDown(0.9);
    doc.moveDown(0.9); // Add spacing between items
  });

  // Add total amount with styling
  const totalAmount = billData.sales.reduce(
    (total, sale) => total + sale.amount,
    0
  );
  doc.font("Helvetica-Bold").fontSize(14);
  doc.text(`Total Amount: INR ${totalAmount}`, { align: "right" });

  // Add date on top right
  doc.text(`Date: ${new Date().toLocaleDateString()}`, {
    align: "right",
    underline: true,
  });

  doc.end(); // End the PDF document

  console.log(`PDF bill generated successfully at ${filePath}`);
}

module.exports = generateBillPDF;
